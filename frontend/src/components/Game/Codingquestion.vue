<template>
  <div id="game-show">
    <audio
      ref="victory"
      src="/assets/audio/victory.mp3"
      preload="auto"
      loop
    ></audio>
    <audio
      ref="battle"
      src="/assets/audio/pokemonBattle.mp3"
      preload="auto"
      loop
    ></audio>
    <audio
      ref="fireball"
      src="/assets/audio/fireballwoosh.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="roar"
      src="/assets/audio/dragonroar.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="slash"
      src="/assets/audio/samurai-slash-6845.mp3"
      preload="auto"
    ></audio>
    <audio
      ref="hurt"
      src="/assets/audio/classic_hurt.mp3"
      preload="auto"
    ></audio>
    <div
      class="bg-image p-4"
    >
      <div class="bg-overlay p-5">
        <div
          class="container p-5 d-flex justify-content-center align-items-center"
          v-if="isVictory"
        >
          <div class="row">
            <div class="col-12 mt-5">
              <h2 class="text-center">
                <img src="/assets/images/victory.png" style="width: 80%" />
              </h2>
            </div>
            <div class="col-12 d-flex justify-content-center mb-5">
              <img
                class="image-to-bounce"
                id="modelVictory"
                :src="imageUrl"
                style="width: 60%; height: auto"
              />
            </div>
            <div class="col-12">
              <h1 class="text-center text-white mt-5">
                You have gained 300 EXP!
              </h1>
            </div>
          </div>
        </div>
        <div
          class="container-fluid d-flex align-items-center"
          v-if="!isVictory"
        >
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
            <div class="row" v-if="questionLoaded && showIde && !isVictory">
              <div class="ide col-12 col-md-6 bg-dark p-5 mt-2 rounded-5">
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
              <div class="col-12 col-md-6 mt-3" id="bossFrame">
                <div
                  class="bg-monster d-flex justify-content-center align-items-center rounded-5"
                >
                  <img
                    id="scaryDragon"
                    src="/assets/images/scarydragon.gif"
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
import Ide from "./Ide.vue";
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
      isVictory: false,
      showIde: false,
      enemyList: [
        {
          imageUrl: "/assets/images/Hyena.png",
          positionX: "600px",
          positionY: "0px",
        },
        {
          imageUrl: "/assets/images/Scorpio.png",
          positionX: "1200px",
          positionY: "0px",
        },
        {
          imageUrl: "/assets/images/Snake.png",
          positionX: "1800px",
          positionY: "0px",
        },
        {
          imageUrl: "/assets/images/Vulture.png",
          positionX: "2400px",
          positionY: "0px",
        },
        {
          imageUrl: "/assets/images/Mummy.png",
          positionX: "3000px",
          positionY: "0px",
        },
        {
          imageUrl: "/assets/images/Deceased.png",
          positionX: "4000px",
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
      character: "",
    };
  },
  methods: {
    dealDamage() {
      const player = document.getElementsByClassName("player")[0];
      const playerPos = player.getBoundingClientRect();
      const gameTop = playerPos.bottom - 100;
      const gameLeft = playerPos.left - 15;

      const slashImage = document.createElement("img");
      this.character == "knight" &&
        (slashImage.src = "/assets/images/Slash.webp");
      this.character == "sword" &&
        (slashImage.src = "/assets/images/blueSwordSlash.png");
      this.character == "wizard" &&
        (slashImage.src = "/assets/images/wizardBall.gif");
      slashImage.style.zIndex = "999999";
      slashImage.style.position = "absolute";
      slashImage.style.top = `${gameTop}px`;
      slashImage.style.left = `${gameLeft}px`;
      document.body.appendChild(slashImage);

      const bossFrame = document.getElementById("scaryDragon");
      const bossPosition = bossFrame.getBoundingClientRect();
      const bossTop = bossPosition.top + window.scrollY + 40;
      const bossLeft = bossPosition.left + window.scrollX + 80;

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
        requestAnimationFrame(() => {
          bossFrame.style.transition = "transform 1.5 ease";
          bossFrame.style.transform = "rotate(45deg)";

          setTimeout(() => {
            bossFrame.style.transition = "transform 1.5 ease";
            bossFrame.style.transform = "rotate(0deg)";
          }, 1500);
        });
      }, 1000);
      // Adjust the duration to match the animation duration
    },
    getHurt() {
      const bossFrame = document.getElementById("scaryDragon");
      const bossPosition = bossFrame.getBoundingClientRect();
      const bossTop = bossPosition.top + 200;
      const bossLeft = bossPosition.left;

      const fireballImage = document.createElement("img");
      fireballImage.src = "/assets/images/dragonFireball.png";
      fireballImage.style.width = "200px";
      fireballImage.style.zIndex = "999999";
      fireballImage.style.position = "absolute";
      fireballImage.style.top = `${bossTop}px`;
      fireballImage.style.left = `${bossLeft}px`;
      document.body.appendChild(fireballImage);

      const player = document.getElementsByClassName("player")[0];
      const playerComputedStyle = getComputedStyle(player);
      const playerWidth = (playerComputedStyle.getPropertyValue("width"));
      const playerPos = player.getBoundingClientRect();
      const gameTop = playerPos.top;
      const gameLeft = playerPos.left;

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
        let onFireImage = document.createElement("img");
        onFireImage.src = "/assets/images/onFire.gif";
        onFireImage.style.zIndex = "999999999";
        onFireImage.style.position = "absolute";
        onFireImage.style.top = `${gameTop}px`;
        onFireImage.style.left = `${gameLeft}px`;
        onFireImage.style.width = '200px';
        document.body.appendChild(onFireImage);
        document.body.removeChild(fireballImage);
        this.pauseSound("fireball");
        this.playSound("hurt");

        setTimeout(() => {
          document.body.removeChild(onFireImage);
        }, 1500);
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
        console.log("Error updating document:", error);
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
        this.isVictory = true;
        this.pauseSound("battle");
        this.playSound("victory");

        setTimeout(() => {
          this.$router.push("/");
        }, 5000);
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
        console.log("Error updating document:", error);
      }
      this.getQuestion(this.currentTopic, this.userProg);
      this.updateExpandLevel();
    },
    async getImage(model_ID) {
      if (model_ID.includes("wizard")) {
        this.imageUrl = "/assets/images/wizard.png";
        this.character = "wizard";
      }
      if (model_ID.includes("knight")) {
        this.imageUrl = "/assets/images/knight.png";
        this.character = "knight";
      }
      if (model_ID.includes("sword")) {
        this.imageUrl = "/assets/images/sword.png";
        this.character = "sword";
      }
    },
    async getUserProgress(topic) {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      // this.userProg = docSnap.data().
      this.userProg = docSnap.data().topics[topic].position;
      this.model_ID = docSnap.data().model_ID;
      this.getQuestion(this.currentTopic, this.userProg);
      this.getImage(this.model_ID);
    },
    togglePause() {
      this.gamePaused = !this.gamePaused;
    },
    handleCollision() {
      this.togglePause();
      this.showIde = true;
    },
    async updateExpandLevel() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      let isLevelAdded =
        docSnap.data().topics[this.currentTopic].questions[this.currentQn];
      if (isLevelAdded) return;
      if (docSnap.exists()) {
        var exp = docSnap.data().exp;
        var level = docSnap.data().level;
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
    this.playSound("battle");
    this.getImage(this.model_ID);
    this.UID = getAuth().currentUser.uid;
    this.currentTopic = localStorage.getItem("currentTopic");
    this.getUserProgress(this.currentTopic);
  },
};
</script>

<style>
.game {
  padding-top: 50px;
}

.bg-monster {
  background-image: url("/assets/images/dragonforest.png");
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.bg-image {
  background-image: url("/assets/images/scaryforest.png");
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

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-20px); 
  }
}

.image-to-bounce {
  animation: bounce 1s infinite; 
}
</style>
