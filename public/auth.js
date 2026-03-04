import {
auth,
provider,
signInWithPopup,
signOut,
onAuthStateChanged
}
from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");

loginBtn.onclick = async () => {

await signInWithPopup(auth, provider);

};

logoutBtn.onclick = () => {

signOut(auth);

};

onAuthStateChanged(auth, user => {

if(user){

loginBtn.style.display="none";
logoutBtn.style.display="inline-block";

userName.innerText = user.displayName;

}else{

loginBtn.style.display="inline-block";
logoutBtn.style.display="none";

userName.innerText = "";

}

});