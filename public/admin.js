import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase config (same as other files)

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


const container = document.getElementById("adminItems");



async function loadItems(){

container.innerHTML = "";

const querySnapshot = await getDocs(collection(db,"items"));

querySnapshot.forEach((docSnap)=>{

const item = docSnap.data();
const id = docSnap.id;

const card = document.createElement("div");

card.className="card";

card.innerHTML = `

<img src="${item.image || 'https://via.placeholder.com/300'}">

<div class="card-content">

<h3>${item.title}</h3>

<p>${item.description}</p>

<p><b>Location:</b> ${item.location}</p>

<p><b>Status:</b> ${item.status}</p>

<button onclick="claimItem('${id}')">Mark Claimed</button>
<button onclick="editItem('${id}')">Edit</button>
<button onclick="deleteItem('${id}')">Delete</button>

</div>

`;

window.editItem = function(id){

window.location.href = `add.html?id=${id}`;}

container.appendChild(card);

});

}

window.editItem = async function(id){

const title = prompt("Enter new title");
const description = prompt("Enter new description");
const location = prompt("Enter new location");

if(!title) return;

const ref = doc(db,"items",id);

await updateDoc(ref,{
title,
description,
location
});

alert("Item updated");

}

window.claimItem = async function(id){

const confirmChange = confirm("Mark this item as claimed?");

if(!confirmChange) return;

const ref = doc(db,"items",id);

await updateDoc(ref,{
status:"claimed"
});

alert("Item marked as claimed");

}


window.deleteItem = async function(id){

const confirmDelete = confirm("Delete this post permanently?");

if(!confirmDelete) return;

const ref = doc(db,"items",id);

await deleteDoc(ref);

alert("Item deleted");

}


loadItems();