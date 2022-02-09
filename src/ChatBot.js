// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";

import json_data from './keys.json' assert { type: "json" };

const firebaseConfig = {
apiKey: json_data.apiKey,
authDomain: json_data.authDomain,
databaseURL: json_data.databaseURL,
projectId: json_data.projectId,
storageBucket: json_data.storageBucket,
messagingSenderId: json_data.messagingSenderId,
appId: json_data.appId,
measurementId: json_data.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

// const db = getDatabase();
const db = getFirestore();

let name_ = 'user';
let inputs = [];
let text = "";
let response = "";
let timestamp = '';
  

async function addInputs(user_text) {
  const rawResponse = await fetch('http://127.0.0.1:5000/chatbot', 
  {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user_text
    })
  });
  response = await rawResponse.json();
  return response;
}

// function updateScroll(){
//   var element = document.getElementById("chat-area");
//   element.scrollTop = element.scrollHeight;
// }

module.exports.addInputs = addInputs