const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";

let param = new URLSearchParams(window.location.search);
let id = param.get("id");
const getProdotto = async () => {
  if (id) {
    const res = await fetch(BASE_URL + id, {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4YTBkMThmYzBmMzAwMTU1ZTViOTkiLCJpYXQiOjE3MTgyMjkyNjgsImV4cCI6MTcxOTQzODg2OH0.ECXWZML6dkcKkK4V4Vr3px9Vd-Y7AMlD7dKYORiWGDY",
      },
    });
    const product = await res.json();
    document.querySelector("#name").value = product.name;
    document.querySelector("#description").value = product.description;
    document.querySelector("#imageUrl").value = product.imageUrl;
    document.querySelector("#brand").value = product.brand;
    document.querySelector("#price").value = product.price;
    document.querySelector(".btn-success").remove();
  } else {
    document.querySelector(".btn-danger").remove();
    document.querySelector(".btn-secondary").remove();
  }
};

const createNew = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };
  let res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4YTBkMThmYzBmMzAwMTU1ZTViOTkiLCJpYXQiOjE3MTgyMjkyNjgsImV4cCI6MTcxOTQzODg2OH0.ECXWZML6dkcKkK4V4Vr3px9Vd-Y7AMlD7dKYORiWGDY",
    },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    alert("Product created");
  }
};

const editProduct = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };
  let res = await fetch(BASE_URL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4YTBkMThmYzBmMzAwMTU1ZTViOTkiLCJpYXQiOjE3MTgyMjkyNjgsImV4cCI6MTcxOTQzODg2OH0.ECXWZML6dkcKkK4V4Vr3px9Vd-Y7AMlD7dKYORiWGDY",
    },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    alert("Product created");
  }
};

const deleteProduct = async () => {
  let res = await fetch(BASE_URL + id, {
    method: "DELETE",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4YTBkMThmYzBmMzAwMTU1ZTViOTkiLCJpYXQiOjE3MTgyMjkyNjgsImV4cCI6MTcxOTQzODg2OH0.ECXWZML6dkcKkK4V4Vr3px9Vd-Y7AMlD7dKYORiWGDY",
    },
  });
  if (res.ok) {
    alert("Product deleted");
  }
};

const home = () => {
  window.location.href = "http://127.0.0.1:5500/";
};

const dettagli = (id) => {
  window.location.href = `./backoffice.html?id=${id}`;
  const bottoni = document.querySelector(".bottoni");
  const admin = document.querySelector(".admin");
  admin.classList.remove("d-none");
  bottoni.classList.add("d-none");
};

window.onload = () => {
  getProdotto();
  const username = localStorage.getItem("username");
  const utente = document.querySelector(".utente");
  const admin = document.querySelector(".admin");
  const user = document.querySelector(".user");
  if (username !== null) {
    utente.classList.remove("d-none");
    utente.innerHTML = username;
  } else if (window.location.href.startsWith("http://127.0.0.1:5500/backoffice.html?id=")) {
    const bottoni = document.querySelector(".bottoni");
    const admin = document.querySelector(".admin");
    admin.classList.remove("d-none");
    bottoni.classList.add("d-none");
  } else {
    admin.classList.add("d-none");
    user.innerHTML = `
    <h1>NON SEI AUTORIZZATO!</h1> 
    <button type="button" class="btn btn-primary mt-3" onclick="home()">Torna alla home!</button>`;
  }
};
