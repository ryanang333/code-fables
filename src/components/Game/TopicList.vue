<template>
  <div>
    <h2 class="text-center">Greetings Hero</h2>
  </div>

  <div class="row">
    <div
      class="col-6"
      v-for="topic in topics"
      :key="topic.key"
      @click="openQuestion(topic.key)"
    >
      <div class="card">
        <div class="card-body">
          <img
            class="card-img-top fixed-sized"
            :src="topic.topicObj.image"
            alt="Card image cap"
          />
          <h5 class="card-title game-font">{{ topic.topicObj.name }}</h5>
          <p class="card-text game-font">{{ topic.topicObj.description }}</p>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="getProgress(topic.key)"
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
          <a href="#" class="btn btn-game">Begin Game</a>
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
      // userObj:"",
      // isCompleted1: "",
      // isCompleted2: "",
      // isCompleted3: "",
      // isCompleted4: "",
      // isCompleted5: "",
      // isCompleted6: "",
      userTopics: {},
    };
  },
  methods: {
    getProgress(topicName) {
        let count = 0;
        let x = this.userTopics[topicName].questions;
        for (let qn in x){
            if (x[qn]){
                count++;
            }
        }
        let widthProg = (count/6) * 100 + '%';
        return {
            width: widthProg
        }
        // let progress = this.userTopics[topicName].progress;
        // let widthProg = (progress/6) * 100 + '%';
        // return {
        //     width: widthProg
        // }
    },
    openQuestion(topic) {
      // console.log(topic)
      localStorage.setItem("currentTopic", topic);
      this.$router.push("/codingquestion");
    },
    async getTopics() {
      const querySnap = await getDocs(query(collection(db, "topics")));
      querySnap.forEach((doc) => {
        let key = doc.id;
        // console.log(doc.id);
        let topic = doc.data();
        // console.log(doc.data());
        this.topics.push({
          key: key,
          topicObj: topic,
        });
      });
      console.log(this.topics);
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
    console.log(this.topics);
  },
};
</script>

<style scoped>
h2 {
  animation: glow 1s infinite alternate;
  padding: 20px;
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
  width: 800px;
  height: 400px;
}
.card {
  box-shadow: 0 6px 1px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 3px;
  padding: 10px;
}
.card-body {
  padding: 1px;
}
.card-title {
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 10px;
}
.card:hover {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.card-text {
  font-family: "Press Start 2P", cursive; /* Gaming font */
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
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-game {
  background-color: #746e6e; /* Red button color */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-game:hover {
  background-color: #078627; /* Darker red on hover */
}
</style>
