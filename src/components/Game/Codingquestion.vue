<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col"></div>
      <div class="col">
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
        <div v-else>
          Loading IDE...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import Ide from "./ide.vue";
import db from "../../firebase/init";
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
  },
  computed: {
    prev() {
      if (this.userProg === 1) return "disabled";
      return "";
    },
  },
  data() {
    return {
      UID: "",
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
      if (this.userProg == 6){
        document.getElementById('nextBtn').textContent = 'Done';
      }
      var btn = document.getElementById("nextBtn");
      btn.classList.remove("disabled");
    },
    async getQuestion(currentTopic, userProg) {
      let q = "qn" + userProg;
      this.currentQn = q;
      localStorage.setItem("currentQn", this.currentQn);
      const docSnap = await getDoc(doc(db, "topics", currentTopic));
      const data = docSnap.data();
      console.log(data);
      let question = data.resources[q];
      this.questionDetails = question;
      this.questionLoaded = true;
      const docSnapUser = await getDoc(doc(db, "accounts", this.UID));
      if (docSnapUser.data().topics[currentTopic].questions[q]) {
        if (this.userProg == "6"){
          document.getElementById('nextBtn').textContent= 'Done';
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
      if (this.userProg <6){
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
    },
    async getUserProgress(topic) {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      // this.userProg = docSnap.data().
      this.userProg = docSnap.data().topics[topic].position;
      this.getQuestion(this.currentTopic, this.userProg);
    },
  },

  mounted() {
    this.UID = getAuth().currentUser.uid;
    this.currentTopic = localStorage.getItem("currentTopic");
    console.log(this.currentTopic);
    console.log(this.currentTopic);
    console.log(this.userProg);
    this.getUserProgress(this.currentTopic);
  },
};
</script>

<style scoped></style>
