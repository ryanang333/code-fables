<template>
  <div class="background">
  <div>
    <h2 class="text-center"><img src="src\assets\images\START-YOUR-CODEQUEST.png"></h2>
  </div>

  <div class="row">
    <div
      class="col-4"
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
          <a href="#" class="btn btn-game" v-if="getProgress(topic.key)['width']=='0%'">Begin</a>
          <a href="#" class="btn btn-game" v-else>Continue</a>
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
.background {
  background-color:#26472c;
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
}
.card-body {
  padding: 1px;
}
.card-title {
  font-weight: bold;
  font-family:  'Palatino', serif;
  font-size: 1.8rem;
  margin-top: 10px;
}
.card:hover {
  transform: translate3D(0,-1px,0) scale(1.03);
  box-shadow: 0 6px 1px rgba(0, 0, 0, 0.4);
  transition: 0.1s;
}
.card-text {
  font-family:  'Palatino', serif;
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
  font-family:  'Palatino', serif;
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
  background-color: #978b74;; /* Red button color */
  font-family:  'Palatino', serif;
  color: #ffffff;
  border: none;
  width:100%;
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
