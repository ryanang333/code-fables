<template>
  <div class="container">
    <div class="row">
      <div class="profile">
        <img :src="profileUrl" alt="" />
        <div class="overlay"></div>
        <div
          type="button"
          class="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <a>Change</a>
        </div>
      </div>
    </div>
    <div class="row">
      <h2>{{ username }}</h2>
      <h3>{{ email }}</h3>
      <h3>Level {{ level }}</h3>
    </div>
    <div class="row">
      <div class="levelback">
        <div class="level" :style="{ width: progress + '%' }">
          <span class="left">{{ exp }}xp</span>{{ progress }}%
        </div>
      </div>
    </div>
    <div class="row">
      <p>{{ expDiff }}xp to next level</p>
    </div>
    <!-- <div class="row">
            <div class="col-4"><p>Friends</p></div>
            <div class="col-4"><p>Levels Completed</p></div>
            <div class="col-4"><p>Duels Won</p></div>
        </div> -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Select Profile Picture
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="clearUrl"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table>
              <tr>
                <td colspan="4"><img class="mainProfile" :src="mainUrl" /></td>
              </tr>
              <tr v-for="(row, rowIndex) in picturesInRows" :key="rowIndex">
                <td v-for="(picture, colIndex) in row" :key="colIndex">
                  <img
                    class="miniProfile miniProfile-hover"
                    :src="picture"
                    @click="getUrl(picture)"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="clearUrl"
            >
              Cancel
            </button>
            <button
              type="button"
              id="save"
              class="btn btn-primary"
              @click="updateUrl"
              data-bs-dismiss="modal"
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
export default {
  name: "ProfileInfo",
  components: {},
  data() {
    return {
      pictures: [],
      username: "",
      email: "",
      profileUrl: "",
      mainUrl: "",
      exp: "",
      level: "",
      nextlevel: "",
      nextlevelexp: "",
      expDiff: "",
      progress: "",
      UID: "",
      SelectedPic: "",
      isDispSelect: false,
    };
  },
  computed: {
    picturesInRows() {
      const rows = [];
      const itemsPerRow = 4; // Adjust this as needed
      for (let i = 0; i < this.pictures.length; i += itemsPerRow) {
        rows.push(this.pictures.slice(i, i + itemsPerRow));
      }
      return rows;
    },
  },
  methods: {
    getUrl(url) {
      this.SelectedPic = url;
      this.mainUrl = url;
      console.log(url);
      document.getElementById("save").disabled = false;
    },
    clearUrl() {
      this.SelectedPic = "";
      this.mainUrl = this.profileUrl;
      document.getElementById("save").disabled = true;
    },
    async updateUrl() {
      //take the current url and update on the cloud
      if (this.SelectedPic != "") {
        await updateDoc(doc(db, "accounts", this.UID), {
          profile_pic_ID: this.SelectedPic,
        });
        this.getInfo();
        this.getPictures();
        alert("Profile picture updated!");
      } else {
        console.log("failed");
      }
    },
    async getInfo() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      if (docSnap.exists()) {
        this.username = docSnap.data().profile_name;
        this.email = getAuth().currentUser.email;
        this.profileUrl = docSnap.data().profile_pic_ID;
        this.mainUrl = docSnap.data().profile_pic_ID;
        this.exp = docSnap.data().exp;
        this.level = docSnap.data().level;
        this.nextlevel = this.level + 1;
        this.nextlevelexp = this.nextlevel * 100;
        this.expDiff = this.nextlevelexp - this.exp;
        this.progress = Math.round((this.exp / this.nextlevelexp) * 100);
      }
    },
    async getPictures() {
      this.pictures = [];
      const querySnapshot = await getDocs(collection(db, "profile_pictures"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (this.profileUrl != doc.data().url) {
          this.pictures.push(doc.data().url);
        }
      });
    },
  },
  mounted() {
    this.UID = getAuth().currentUser.uid;
    this.getInfo();
    this.getPictures();
  },
};
</script>

<style scoped>
.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;

  background-color: rgb(202, 202, 202);
  padding: 20px;
  border-radius: 20px;
}

.profile {
  position: relative;
  width: 200px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

.row {
  margin-top: 10px;
  margin-bottom: 10px;
}

.profile:hover img {
  opacity: 0.7;
}

.button {
  width: 500px;
  left: 0;
  top: 0;
  text-align: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.button a {
  position: absolute;
  left: 35%;
  top: 40%;
  padding: 5px 5px;
  text-align: center;
  color: black;
  background-color: #88fcd7;
  border: solid 1px rgb(128, 128, 128);
  z-index: 1;
  border-radius: 5px;
}

.profile:hover .button {
  opacity: 1;
}

p,
h2,
h3 {
  text-align: center;
}

h2 {
  font-size: 50px;
}

h3 {
  font-size: 25px;
  color: rgb(70, 70, 70);
}

img {
  width: 100%;
  height: auto;
}

span.left {
  display: inline;
  float: left;
  margin-left: 10px;
}

.mainProfile {
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.miniProfile {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.miniProfile-hover {
  transition: transform 0.3s;
}

.miniProfile-hover:hover {
  transform: translateY(-10px);
  opacity: 50%;
}
.levelback {
  position: relative;
  width: 70%; /* Full width */
  height: 25px;
  background-color: #ddd; /* Grey background */
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}

table {
  border: none;
  width: 100%;
}

th,
td {
  border: none;
  text-align: center;
  vertical-align: middle;
  width: 25%;
  padding: 10px 10px 10px 10px;
}

.level {
  left: 0;
  position: absolute;
  padding-right: 10px;
  text-align: right; /* Right-align text */
  color: white; /* White text color */
  height: 25px;
  background-color: #008170;
  border-radius: 10px;
}
</style>
