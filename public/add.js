// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// YOUR FIREBASE CONFIG
const firebaseConfig = {
apiKey: "AIzaSyAf5ojPd3-60LVb2vmp5wW7C56HpUTVwIk",
authDomain: "campus-lost-found-10931.firebaseapp.com",
projectId: "campus-lost-found-10931",
storageBucket: "campus-lost-found-10931.firebasestorage.app",
messagingSenderId: "993678137361",
appId: "1:993678137361:web:e5f82df404b95d516bf9b0"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if(editId){

const docRef = doc(db,"items",editId);

const snap = await getDoc(docRef);

const item = snap.data();

document.getElementById("title").value = item.title;
document.getElementById("description").value = item.description;
document.getElementById("location").value = item.location;
document.getElementById("category").value = item.category;
document.getElementById("date").value = item.date || "";
document.getElementById("contact").value = item.contact || "";

}

// FORM SUBMIT
document.getElementById("reportForm").addEventListener("submit", async function(e){

e.preventDefault();

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const location = document.getElementById("location").value;
const category = document.getElementById("category").value;
const date = document.getElementById("date").value;
const contact = document.getElementById("contact").value;
const imageFile = document.getElementById("image").files[0];

let imageUrl = "";

if(imageFile){

const storageRef = ref(storage,"items/"+Date.now()+"_"+imageFile.name);

await uploadBytes(storageRef,imageFile);

imageUrl = await getDownloadURL(storageRef);

}

if(editId){

await updateDoc(doc(db,"items",editId),{

title,
description,
location,
category,
date,
contact,
...(imageUrl && {image:imageUrl})

});

alert("Item updated successfully");

}else{

await addDoc(collection(db,"items"),{

title,
description,
location,
category,
date,
contact,
image:imageUrl,
status:"available",
created:new Date()

});

alert("Item added successfully");

}

window.location.href="admin.html";

});
