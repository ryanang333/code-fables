<template>
  <div class="container-fluid">
    <div class="row">
      <div class="game col-md-6 col-sm-6">
        <Game :imageUrl="imageUrl" :enemies="enemyList" @collisionDetected="handleCollision" :isGamePaused="gamePaused"></Game>
      </div>
      <div class="ide col-md-6 col-sm-6">
        <div id="ide-component" v-if="questionLoaded">
          <Ide
            :questionInfo="questionDetails"
            @resultOK="enableButton"
            :key="questionDetails.key"
          />
          <div
            id="button-container"
            class="mt-4 d-flex flex-row justify-content-between"
          >
            <button
              id="prevBtn"
              :key="questionDetails.key"
              type="button"
              class="btn btn-warning"
              @click="prevQuestion"
              :class="prev"
            >
              Previous question!
            </button>
            <button
              id="nextBtn"
              :key="questionDetails.key"
              type="button"
              class="btn btn-success disabled"
              @click="nextQuestion"
            >
              Next Question!
            </button>
          </div>
        </div>
        <div v-else>Loading IDE...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import Ide from "./ide.vue";
import db from "../../firebase/init";
import Game from "./Game.vue";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  getFirestore,
  doc,
  limit,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "Codingquestion",
  components: {
    Ide,
    Game,
  },
  computed: {
    prev() {
      if (this.userProg === 1) return "disabled";
      return "";
    },
  },
  data() {
    return {
      enemyList: [
        {imageUrl:'src/assets/images/hyena.png', positionX:'200px', positionY:'0px'},
        {imageUrl:'src/assets/images/scorpio.png', positionX:'400px', positionY:'0px'},
        {imageUrl: 'src/assets/images/snake.png', positionX:'600px',positionY:'0px'},
        {imageUrl: 'src/assets/images/vulture.png', positionX:'800px',positionY:'0px'},
        {imageUrl: 'src/assets/images/mummy.png', positionX:'1000px',positionY:'0px'},
        {imageUrl: 'src/assets/images/deceased.png', positionX:'1200px',positionY:'0px'},
      ],
      imageUrl: "",
      gamePaused: false,
      UID: "",
      model_ID: "",
      currentTopic: "",
      userProg: 0,
      questionDetails: {
        key: 0,
      },
      questionLoaded: false,
      currentQn: "",
    };
  },
  methods: {
    async prevQuestion() {
      this.questionDetails.key--;
      const fieldPathBool = `topics.${this.currentTopic}.questions.${this.currentQn}`;
      const fieldPathPosition = `topics.${this.currentTopic}.position`;
      this.userProg--;
      const updateData = {};
      updateData[fieldPathPosition] = this.userProg;

      // Update the Firestore document
      const docRef = doc(db, "accounts", this.UID);
      try {
        await updateDoc(docRef, updateData);
        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
      this.getQuestion(this.currentTopic, this.userProg);
    },
    async enableButton() {
      if (this.userProg == 6) {
        document.getElementById("nextBtn").textContent = "Done";
      }
      var btn = document.getElementById("nextBtn");
      btn.classList.remove("disabled");
      this.gamePaused = true
    },
    async getQuestion(currentTopic, userProg) {
      let q = "qn" + userProg;
      this.currentQn = q;
      localStorage.setItem("currentQn", this.currentQn);
      const docSnap = await getDoc(doc(db, "topics", currentTopic));
      const data = docSnap.data();

      let question = data.resources[q];
      this.questionDetails = question;
      this.questionLoaded = true;
      const docSnapUser = await getDoc(doc(db, "accounts", this.UID));
      if (docSnapUser.data().topics[currentTopic].questions[q]) {
        if (this.userProg == "6") {
          document.getElementById("nextBtn").textContent = "Done";
        }
        document.getElementById("nextBtn").classList.remove("disabled");
      }
    },
    async nextQuestion() {
      if (this.userProg == 6) {
        this.$router.push("/");
      }
      this.questionDetails.key++;
      const fieldPathBool = `topics.${this.currentTopic}.questions.${this.currentQn}`;
      const fieldPathPosition = `topics.${this.currentTopic}.position`;
      if (this.userProg < 6) {
        this.userProg++;
      }
      //   console.log(newProg);
      //   await updateDoc(doc(db, "accounts", this.UID), {
      //     fieldPathBool: true,
      //     fieldPathPosition: newProg,
      //   });
      const updateData = {};
      updateData[fieldPathBool] = true;
      updateData[fieldPathPosition] = this.userProg;

      // Update the Firestore document
      const docRef = doc(db, "accounts", this.UID);
      try {
        await updateDoc(docRef, updateData);
        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
      this.getQuestion(this.currentTopic, this.userProg);
      this.updateExpandLevel();
      // increases the users progress if boolean set to true
      // if(updateData[fieldPathBool]){
      //   this.updateExpandLevel();
      // }
    },
    async getImage(model_ID) {
      if (model_ID.includes("wizard")) {
        this.imageUrl = "src/assets/images/wizard.png";
      }
      if (model_ID.includes("knight")) {
        this.imageUrl = "src/assets/images/knight.png";
      }
      if (model_ID.includes("sword")) {
        this.imageUrl = "src/assets/images/sword.png";
      }
    },
    async getUserProgress(topic) {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      // this.userProg = docSnap.data().
      this.userProg = docSnap.data().topics[topic].position;
      this.model_ID = docSnap.data().model_ID;
      console.log(this.model_ID);
      this.getQuestion(this.currentTopic, this.userProg);
      this.getImage(this.model_ID);
    },
    togglePause(){
      this.gamePaused = !this.gamePaused
    },
    handleCollision(){
      this.togglePause()
      console.log('pause')
    }
    async updateExpandLevel() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      console.log(docSnap.data());
      let isLevelAdded = docSnap.data().topics[this.currentTopic].questions[this.currentQn];
      if (isLevelAdded) return;
      if (docSnap.exists()) {
        console.log(docSnap.data());
        let exp = docSnap.data().exp;
        let level = docSnap.data().level;
        //console.log(exp);
        //console.log(level);
      } else {
        console.log("Document does not exist");
      }

      if (this.currentTopic === "topic6") {
        exp += 100;
      } else {
        exp += 50;
      }

      const newLevel = Math.floor(exp / 100);

      await updateDoc(doc(db, "accounts", this.UID), {
        level: newLevel,
        exp: exp,
      });
    },
  },

  mounted() {
    this.getImage(this.model_ID);
    this.UID = getAuth().currentUser.uid;
    this.currentTopic = localStorage.getItem("currentTopic");
    this.getUserProgress(this.currentTopic);
    console.log(this.userProg);
  },
};
</script>

<style>
.game{
  padding-top:50px;
}
</style>
