<template>
  <div id="game-show">
    <audio
      ref="battle"
      src="/src/assets/audio/pokemonBattle.mp3"
      preload="auto"
      loop
    ></audio>
    <audio
      ref="fireball"
      src="/src/assets/audio/fireballwoosh.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="roar"
      src="/src/assets/audio/dragonroar.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="slash"
      src="/src/assets/audio/samurai-slash-6845.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="hurt"
      src="/src/assets/audio/classic_hurt.mp3"
      preload="auto"
    ></audio>
    <div class="bg-image p-4">
      <div class="bg-overlay p-5">
        <div class="container-fluid d-flex align-items-center">
          <div class="row">
            <div
              class="game col-12 bg-dark rounded-5 px-1 py-5 mt-5"
              style="margin-left: auto; margin-right: auto"
            >
              <Game
                :imageUrl="imageUrl"
                :enemies="enemyList"
                @collisionDetected="handleCollision"
                :isGamePaused="gamePaused"
                id="gameScreen"
              ></Game>
            </div>
            <div class="row" v-if="questionLoaded && showIde">
              <div class="ide col-6 bg-dark p-5 mt-2 rounded-5">
                <div id="ide-component">
                  <Ide
                    :questionInfo="questionDetails"
                    @resultOK="enableButton"
                    @resultWrong="getHurt"
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
              </div>
              <div class="col-6 mt-3" id="bossFrame">
                <div
                  class="bg-monster d-flex justify-content-center align-items-center rounded-5"
                >
                  <img
                    id="scaryDragon"
                    src="/src/assets/images/scarydragon.gif"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      showIde: false,
      enemyList: [
        {
          imageUrl: "src/assets/images/hyena.png",
          positionX: "100px",
          positionY: "0px",
        },
        {
          imageUrl: "src/assets/images/scorpio.png",
          positionX: "400px",
          positionY: "0px",
        },
        {
          imageUrl: "src/assets/images/snake.png",
          positionX: "700px",
          positionY: "0px",
        },
        {
          imageUrl: "src/assets/images/vulture.png",
          positionX: "1000px",
          positionY: "0px",
        },
        {
          imageUrl: "src/assets/images/mummy.png",
          positionX: "1300px",
          positionY: "0px",
        },
        {
          imageUrl: "src/assets/images/deceased.png",
          positionX: "1600px",
          positionY: "0px",
        },
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
    getHurt() {
      const bossFrame = document.getElementById("scaryDragon");
      const bossPosition = bossFrame.getBoundingClientRect();
      const bossTop = bossPosition.top;
      const bossLeft = bossPosition.left;

      const fireballImage = document.createElement("img");
      fireballImage.src = "/src/assets/images/fireball.gif";
      fireballImage.style.zIndex = "999999";
      fireballImage.style.position = "absolute";
      fireballImage.style.top = `${bossTop}px`;
      fireballImage.style.left = `${bossLeft}px`;
      document.body.appendChild(fireballImage);

      const player = document.getElementsByClassName("player")[0];
      const playerPos = player.getBoundingClientRect();
      const gameTop = playerPos.top - 50;
      const gameLeft = playerPos.left - 10;

      // Calculate the difference in positions
      const topDifference = gameTop - bossTop;
      const leftDifference = gameLeft - bossLeft;

      // Trigger the animation
      requestAnimationFrame(() => {
        fireballImage.style.transition = "transform 1.5s ease";
        fireballImage.style.transform = `translate(${leftDifference}px, ${topDifference}px)`;
      });
      this.playSound("fireball");

      setTimeout(() => {
        document.body.removeChild(fireballImage);
        this.pauseSound("fireball");
        this.playSound("hurt");
      }, 1500);
    },
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
      this.dealDamage();
      var btn = document.getElementById("nextBtn");
      btn.classList.remove("disabled");
      this.gamePaused = true;
    },
    playSound(ref) {
      this.$refs[ref].play();
    },
    pauseSound(ref) {
      this.$refs[ref].pause();
    },
    dealDamage() {
      const player = document.getElementsByClassName("player")[0];
      const playerPos = player.getBoundingClientRect();
      const gameTop = playerPos.bottom;
      const gameLeft = playerPos.left;

      const slashImage = document.createElement("img");
      slashImage.src = "/src/assets/images/Slash.webp";
      slashImage.style.zIndex = "999999";
      slashImage.style.position = "absolute";
      slashImage.style.top = `${gameTop}px`;
      slashImage.style.left = `${gameLeft}px`;
      document.body.appendChild(slashImage);

      const bossFrame = document.getElementById("scaryDragon");
      const bossPosition = bossFrame.getBoundingClientRect();
      const bossTop = bossPosition.top + window.scrollY;
      const bossLeft = bossPosition.left + window.scrollX;

      // Calculate the difference in positions
      const topDifference = bossTop - gameTop;
      const leftDifference = bossLeft - gameLeft;

      // Trigger the animation
      requestAnimationFrame(() => {
        slashImage.style.transition = "transform 1.5s ease";
        slashImage.style.transform = `translate(${leftDifference}px, ${topDifference}px)`;
      });
      this.playSound("slash");

      setTimeout(() => {
        document.body.removeChild(slashImage);
        this.pauseSound("slash");
        this.playSound("roar");
      }, 1500); // Adjust the duration to match the animation duration
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
      this.showIde = false;
      this.questionDetails.key++;
      const fieldPathBool = `topics.${this.currentTopic}.questions.${this.currentQn}`;
      const fieldPathPosition = `topics.${this.currentTopic}.position`;
      if (this.userProg < 6) {
        this.userProg++;
      }
      const updateData = {};
      updateData[fieldPathBool] = true;
      updateData[fieldPathPosition] = this.userProg;
      this.gamePaused = false;

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
    togglePause() {
      this.gamePaused = !this.gamePaused;
    },
    handleCollision() {
      this.togglePause();
      console.log("pause");
      this.showIde = true;
    },
    async updateExpandLevel() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      console.log(docSnap.data());
      let isLevelAdded =
        docSnap.data().topics[this.currentTopic].questions[this.currentQn];
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
    this.playSound('battle');
    this.getImage(this.model_ID);
    this.UID = getAuth().currentUser.uid;
    this.currentTopic = localStorage.getItem("currentTopic");
    this.getUserProgress(this.currentTopic);
    console.log(this.userProg);
  },
};
</script>

<style>
@media screen and (max-width: 767px) {
  #game-show {
    display: none;
  }
}


.game {
  padding-top: 50px;
}

.bg-monster {
  background-image: url("/src/assets/images/dragonforest.png");
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.bg-image {
  background-image: url("/src/assets/images/scaryforest.png");
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  overflow-x: auto;
}

.bg-overlay {
  content: "";
  background: rgba(0, 0, 0, 0.65);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-x: auto;
}
</style>
