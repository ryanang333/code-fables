<template>
  <div v-if="showDiv">
    <div
      v-if="isFriendFound && username!== myUser"
      class="modal-overlay d-flex align-items-center justify-content-center"
    >
      <div class="modal-container w-50 bg-secondary-subtle p-5 rounded-4">
        <div class="text-center d-flex justify-content-center">
          <h1 class="fs-1 text-center mb-5">{{ profile_name }}</h1>
        </div>
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <img :src="profile_pic_ID" class="w-50" />
          <p class="mb-2 mt-5 mb-2 fw-bold">{{ username }}</p>
          <p class="mb-2 mb-2">Level: {{ level }}</p>
          <p class="mb-2 mb-2">Experience: {{ experience }}</p>
          <p class="mb-2 mb-2">Friends: {{ numberOfFriends }}</p>
          <button
            v-if="isSearching && !isAlreadyFriend && !isRequestSent"
            class="btn btn-dark btn-block mt-3 w-auto fs-3 p-3"
            @click="addFriend"
          >
            Add Friend
          </button>
          <button
            v-if="!isSearching"
            class="btn btn-dark btn-block mt-3 w-75 fs-4 p-3"
            @click="removeFriend"
          >
            Unfriend
          </button>
          <p class="fw-bold" v-if="isAlreadyFriend">
            Already friends!
          </p>
          <p class="fw-bold" v-if="isRequestSent">
            Request Sent!
          </p>
          <button
            class="btn btn-dark btn-block mt-3 w-75 fs-4 p-3"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="username == myUser"
      class="modal-overlay d-flex align-items-center justify-content-center"
    >
      <div class="modal-container w-50 bg-secondary-subtle p-5 rounded-4">
        <div class="text-center d-flex justify-content-center">
          <h1 class="fs-1 text-center mb-5">Can't add yourself, silly goose! </h1>
        </div>
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <button
            class="btn btn-dark btn-block mt-3 w-auto fs-3 p-3"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="!isFriendFound"
      class="modal-overlay d-flex align-items-center justify-content-center"
    >
      <div class="modal-container w-50 bg-secondary-subtle p-5 rounded-4">
        <div class="text-center d-flex justify-content-center">
          <h1 class="fs-1 text-center mb-5">No user found.</h1>
        </div>
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <button
            class="btn btn-dark btn-block mt-3 w-auto fs-3 p-3"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../../firebase/init';
export default {
  name: "FriendModal",
  data() {
    return {
      showDiv: false,
      isFriendFound: true,
      profile_name: "",
      level: "",
      experience: "",
      profile_pic_ID: "",
      numberOfFriends: 0,
      skin_ID: "",
      isRequestSent: false,
      isAlreadyFriend: false,
      UID : '',
      friendsFriends : [],
    };
  },
  props: {
    username: String,
    isSearching: Boolean,
    friendDetails: Array,
    myUser: String,
    userFriends: Array,
    myUID: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async loadFriendData() {
      if (!this.isSearching) {
        console.log(this.friendDetails);
        var data = this.friendDetails.filter(
          (value) => value.username === this.username
        );
        this.UID = data[0].uid;
        this.profile_name = data[0].profile_name;
        this.level = data[0].level;
        this.experience = data[0].exp;
        this.profile_pic_ID = data[0].profile_pic_ID;
        this.numberOfFriends = data[0].friends.length;
        this.friendsFriends = data[0].friends;
        this.showDivAfterDelay();
      } else {
        try {
          console.log(this.username);
          const docSnap = await getDoc(doc(db, 'user_profiles', this.username));
          console.log(docSnap.data());
          if (docSnap.data() === undefined) {
            this.isFriendFound = false;
          } else {
            this.UID = docSnap.data().uid;
            console.log(this.UID);
            const friendData = await getDoc(doc(db, 'accounts', docSnap.data().uid))
            const data = friendData.data();
            this.profile_name = data.profile_name;
            this.level = data.level;
            this.experience = data.exp;
            this.profile_pic_ID = data.profile_pic_ID;
            this.skin_ID = data.skin_ID;
            this.numberOfFriends = data.friends.length;
            data.friend_requests.includes(
              this.myUser
            ) && (this.isRequestSent = true);
            data.friends.includes(
              this.myUser
            ) && (this.isAlreadyFriend = true);
          }
        } finally {
          this.showDivAfterDelay();
        }
      }
    },
    async addFriend() {
      this.isRequestSent = true;

      const friendData = await getDoc(doc(db, 'accounts', this.UID));
      console.log(friendData.data());
      const friendReq = friendData.data().friend_requests;
      console.log(friendReq);
      friendReq.push(this.myUser);
      await updateDoc(doc(db, 'accounts', this.UID), {
        friend_requests: friendReq
      });
      
    },
    async removeFriend() {
      console.log(this.username);
      console.log(this.userFriends);
      console.log(this.UID);
      const userFriends = this.userFriends.filter(
        (friend) => friend !== this.username
      );
      console.log(userFriends);

      await updateDoc(doc(db ,'accounts', this.myUID), {
        friends: userFriends
      });
      

      const friendsFriends = this.friendsFriends.filter(
        (friend) => friend !== this.myUser
      );
      console.log(this.UID);
      await updateDoc(doc(db, 'accounts', this.UID), {
        friends: friendsFriends
      });
  
    },
    showDivAfterDelay() {
      this.showDiv = true;
    },
  },
  mounted() {
    this.loadFriendData();
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  box-shadow: 10px 10px 10px rgba(158, 148, 148, 0.6);
}

@media (max-width: 576px) {
  p {
    font-size: 18px;
  }
}

@media (min-width: 576px) {
  p {
    font-size: 22px;
  }
}

@media (min-width: 768px) {
  p {
    font-size: 26px;
  }
}

@media (min-width: 992px) {
  p {
    font-size: 34px;
  }
}
</style>
