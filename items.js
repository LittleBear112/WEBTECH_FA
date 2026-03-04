const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadItem(){

const res = await fetch(`http://localhost:3000/items/${id}`);

const item = await res.json();

document.getElementById("title").textContent = item.title;
document.getElementById("description").textContent = item.description;
document.getElementById("location").textContent = item.location;
document.getElementById("image").src = item.image;

}

document.getElementById("claimBtn").onclick = async ()=>{

await fetch(`http://localhost:3000/claim/${id}`,{
method:"POST"
});

alert("Item claimed");

location.reload();

};

loadItem();