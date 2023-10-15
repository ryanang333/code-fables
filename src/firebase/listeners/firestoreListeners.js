// import { onSnapshot, doc } from "firebase/firestore";
// import db from "../init"; // Import your Firestore instance
// import store from "../../store";

// // Example: Listen for changes in a specific document in the "accounts" collection
// const docRef = doc(db, "accounts", store.getters.getUserData.username);

// const unsubscribe = onSnapshot(docRef, (snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.data();
//     store.dispatch("setUserData", data);
//   } else {
//     // Handle the case when the document does not exist
//     // You can add your own logic here
//   }
// });

// export default unsubscribe; // Export the unsubscribe function to stop listening when needed
