// import firebase from 'firebase/app';
// import firebaseConfig from '../config/messagingConfig';

// class Backend {
//     uid = '';
//     messagesRef = null;
//     // initialize Firebase Backend
//     constructor() {
//       if(!firebase.app.length){
//         firebase.initializeApp(firebaseConfig);
//       }else{
//         firebase.app();
//       }
      
//     //   firebase.auth().onAuthStateChanged((user) => {
//     //     if (user) {
//     //       this.setUid(user.uid);
//     //     } else {
//     //       firebase.auth().signInAnonymously().catch((error) => {
//     //         alert("Hello!" + error.message);
//     //       });
//     //     }
//     //   });
//     }

//     setUid(value) {
//       this.uid = value;
//     }

//     getUid() {
//       return this.uid;
//     }

//     // retrieve the messages from the Backend
//     loadMessages(callback) {
//       this.messagesRef = firebase.database().ref('messages');
//       this.messagesRef.off();
//       const onReceive = (data) => {
//         const message = data.val();
//         callback({
//           _id: data.key,
//           text: message.text,
//           createdAt: new Date(message.createdAt),
//           user: {
//             _id: message.user._id,
//             name: message.user.name,
//           },
//         });
//       };
//       this.messagesRef.limitToLast(20).on('child_added', onReceive);
//     }
//     // send the message to the Backend
//     sendMessage(message) {
//       for (let i = 0; i < message.length; i++) {
//         this.messagesRef.push({
//           text: message[i].text,
//           user: message[i].user,
//           createdAt: firebase.database.ServerValue.TIMESTAMP,
//         });
//       }
//     }
//     // close the connection to the Backend
//     closeChat() {
//       if (this.messagesRef) {
//         this.messagesRef.off();
//       }
//     }
//   }
  
// //   export default new Backend();