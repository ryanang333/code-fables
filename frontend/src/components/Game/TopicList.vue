<template>
  <div class="container-fluid bg-image" v-if="isLoaded">
    <div class="container-fluid bg-overlay">
      <div class="row">
        <div class="col-12 text-center mb-5 mt-5">
          <img
            src="/assets/images/START-YOUR-CODEQUEST.png"
            class="img-fluid mt-5"
          />
        </div>

        <div class="row">
          <div
            class="col-lg-6 col-md-12 col-xxl-4 card-deck"
            v-for="(topic, index) in topics"
            :key="topic.key"
          >
            <div class="card" @click="openQuestion(topic.key)">
              <div class="card-body">
                <div style="height: 90%">
                  <img
                    class="card-img-top fixed-sized"
                    :src="topic.topicObj.image"
                    alt="Card image cap"
                  />
                  <h5 class="card-title game-font">
                    {{ topic.topicObj.name }}
                  </h5>
                  <p class="card-text game-font">
                    {{ topic.topicObj.description }}
                  </p>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="getProgress(topic.key, index)"
                  ></div>
                </div>
                <p class="text-success" v-if="topic.isCompleted">
                  <i
                    class="fa-solid fa-circle-check fa-beat"
                    style="color: #1bb666"
                  ></i>
                  Completed
                </p>
                <p class="text-danger" v-else>
                  <i class="fas fa-times-circle fa-beat"></i> Not Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc, getDocs, query, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";

export default {
  name: "TopicList",
  components: {},
  data() {
    return {
      topics: [],
      userTopics: {},
      isLoaded: false,
      isCompleted: false,
    };
  },
  methods: {
    getProgress(topicName, index) {
      let count = 0;
      let x = this.userTopics[topicName]['questions'];
      for (let qn in x) {
        if (x[qn]) {
          count++;
        }
        if (count == 6) {
          this.topics[index]["isCompleted"] = true;
        } else {
          this.topics[index]["isCompleted"] = false;
        }
      }
      let widthProg = (count / 6) * 100 + "%";
      return {
        width: widthProg,
      };

    },
    openQuestion(topic) {
      localStorage.setItem("currentTopic", topic);
      this.$router.push("/codingquestion");
    },
    async getTopics() {
      const querySnap = await getDocs(query(collection(db, "topics")));
      querySnap.forEach((doc) => {
        let key = doc.id;
        let topic = doc.data();
        this.topics.push({
          key: key,
          topicObj: topic,
        });
      });
      this.isLoaded = true;
    },

    async getUserInfo() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      this.userTopics = docSnap.data().topics;
    },
  },

  mounted() {
    this.getTopics();
    this.UID = getAuth().currentUser.uid;
    this.getUserInfo();
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("/assets/images/background3.png");
  background-attachment: fixed;
  background-size: cover; 
  background-position: center;
  background-color: black;
  padding: 0px;
}

.bg-overlay {
  content: "";
  padding: 10px;
  background: rgba(0, 0, 0, 0.651);
  background-size: cover;
  z-index: 0;
}
h2 {
  animation: glow 1s infinite alternate;
  padding-top: 25px;
  padding-bottom: 20px;
  color: white;
}
@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(16, 69, 246, 0.5);
  }
  100% {
    text-shadow: 0 0 10px rgba(9, 22, 49, 0.7);
  }
}

.fixed-sized {
  width: 100%;
  height: 400px;
  border-radius: 10px 10px 0px 0px;
  outline: #7e6e5c solid 5px;
}

.card-deck {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
.card {
  width: 90%;
  background-color: #cdbea2;
  border-radius: 8px;
  outline: #000000 solid 1px;
  position: relative;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  padding: 20px;
  flex: none;
  cursor: pointer;
}
.card-body {
  padding: 1px;
}
.card-title {
  font-weight: bold;
  font-family: Georgia, serif;
  font-size: 1.8rem;
  margin-top: 15px;
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 1px rgba(0, 0, 0, 0.4);
  transition: 0.1s;
}
.card-text {
  font-family: Georgia, serif;
  font-size: 1rem;
  margin-bottom: 15px;
}
.progress {
  height: 15px; /* Progress bar height */
  margin-bottom: 15px;
}
.text-success {
  color: #28a745;
  font-weight: bold;
}
.text-danger {
  color: #dc3545;
  font-weight: bold;
  font-family: Georgia, serif;
}
.btn-game {
  background-color: #978b74; /* Red button color */
  font-family: Georgia, serif;
  color: #ffffff;
  border: none;
  width: 100%;
  border-radius: 5px;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: large;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-game:hover {
  background-color: #078627; /* Darker red on hover */
  color: white;
}
</style>
