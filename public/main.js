import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAf5ojPd3-60LVb2vmp5wW7C56HpUTVwIk",
authDomain: "campus-lost-found-10931.firebaseapp.com",
projectId: "campus-lost-found-10931",
storageBucket: "campus-lost-found-10931.firebasestorage.app",
messagingSenderId: "993678137361",
appId: "1:993678137361:web:e5f82df404b95d516bf9b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("items");

onSnapshot(collection(db,"items"), (snapshot)=>{

container.innerHTML="";

snapshot.forEach((doc)=>{

const item = doc.data();

const card=document.createElement("div");
card.className="card";

card.innerHTML=`

<img src="${item.image || 'https://via.placeholder.com/300'}">

<div class="card-content">

<h3>${item.title}</h3>

<p>${item.description}</p>

<p><b>Location:</b> ${item.location}</p>

<p><b>Date:</b> ${item.date || "-"}</p>

<p><b>Contact:</b> ${item.contact || "-"}</p>

<span class="badge ${item.status}">
${item.status}
</span>

</div>
`;

container.appendChild(card);

});

});