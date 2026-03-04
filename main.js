const API = "https://webtech-fa.onrender.com/items";

let allItems = [];

/* LOAD ITEMS */

async function loadItems() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    allItems = data;
    renderItems(data);

  } catch (error) {
    console.error("Failed to load items", error);
  }
}

/* RENDER CARDS */

function renderItems(items) {

  const container = document.getElementById("items-container");
  if (!container) return;

  container.innerHTML = "";

  items.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Date:</strong> ${item.date}</p>
      <p class="status">Status: ${item.status}</p>

      <div class="actions">
        <button class="btn-view" onclick="viewItem(${item.id})">View</button>
        <button class="btn-update" onclick="updateStatus(${item.id})">Resolve</button>
        <button class="btn-delete" onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

/* FILTER */

function filterItems(type) {

  if (type === "all") {
    renderItems(allItems);
    return;
  }

  const filtered = allItems.filter(item => item.category === type);
  renderItems(filtered);
}

/* VIEW ITEM */

function viewItem(id) {
  window.location.href = `detail.html?id=${id}`;
}

/* DELETE */

async function deleteItem(id) {

  if (!confirm("Delete this report?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadItems();
}

/* UPDATE STATUS */

async function updateStatus(id) {

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: "Resolved"
    })
  });

  loadItems();
}

/* ADD REPORT FORM */

async function submitForm(event) {

  event.preventDefault();

  const form = event.target;

  const data = {
    title: form.title.value,
    description: form.description.value,
    category: form.category.value,
    location: form.location.value,
    date: form.date.value,
    contact: form.contact.value
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  alert("Report submitted successfully");
  window.location.href = "index.html";
}

/* PAGE INIT */

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("items-container")) {
    loadItems();
  }

  const form = document.getElementById("report-form");

  if (form) {
    form.addEventListener("submit", submitForm);
  }

});