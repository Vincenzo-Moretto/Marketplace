const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";

const getProdotti = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4YTBkMThmYzBmMzAwMTU1ZTViOTkiLCJpYXQiOjE3MTgyMjkyNjgsImV4cCI6MTcxOTQzODg2OH0.ECXWZML6dkcKkK4V4Vr3px9Vd-Y7AMlD7dKYORiWGDY",
    },
  });
  const products = await res.json();
  const row = document.querySelector("#products");
  const cerca = document.querySelector(".cerca").value;
  console.log(products);
  if (cerca !== "") {
    row.innerHTML = "";
    products
      .filter((e) => e.name.toLowerCase() === cerca.toLowerCase())
      .forEach((prod) => {
        row.innerHTML += `
    <div class='col col-3 col-lg-3 col-md-4 col-sm-6 col-sm-12 mb-4'>  
      <div class="card justify-content-between">
        <img src="${prod.imageUrl}" class="card-img-top" alt="${prod._id}_${prod.name}">
        <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>
         <div class= "d-flex justify-content-between">
            <a href="./backoffice.html?id=${prod._id}" class="btn btn-primary me-3 w-50">Details</a>
             <button class="btn btn-warning w-50" onclick="aggiungiCarrello('${prod.imageUrl}','${prod.name}','${prod.price}','${prod._id}')"><i class="bi bi-cart4"></i></button>
         </div>
        </div>
      </div> 
    </div>`;
      });
  } else {
    row.innerHTML = "";
    products.forEach((prod) => {
      row.innerHTML += `
    <div class='col col-3 col-lg-3 col-md-4 col-sm-6 col-sm-12 mb-4'>  
      <div class="card justify-content-between">
        <img src="${prod.imageUrl}" class="card-img-top" alt="${prod._id}_${prod.name}">
        <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>
<div class= "d-flex justify-content-between">
            <a href="./backoffice.html?id=${prod._id}" class="btn btn-primary me-3 w-50">Details</a>
            <button class="btn btn-warning w-50" onclick="aggiungiCarrello('${prod.imageUrl}','${prod.name}','${prod.price}','${prod._id}')"><i class="bi bi-cart4"></i></button>
         </div>

        </div>
      </div> 
    </div>`;
    });
  }
};

const backoffice = () => {
  window.location.href = "http://127.0.0.1:5500/backoffice.html";
};

const home = () => {
  window.location.href = "http://127.0.0.1:5500/";
};

const logout = () => {
  localStorage.clear();
  window.location.href = "http://127.0.0.1:5500/";
};

const handleChange = (field, value) => {
  localStorage.setItem(field, value);
};

/* Logica Carrello */

const aggiungiCarrello = (img, title, price, id) => {
  const card = document.querySelector("#prod_" + id);
  console.log(card);
  const lista = document.querySelector(".lista");
  lista.innerHTML += ` 
    <li class="list-group-item d-flex justify-content-between align-items-center mb-3">
       <div class="d-flex justify-content-around align-items-center">
         <img src=${img} alt=${title} width="80px" height="80px" class="rounded me-3">
         <p class="me-3">${title}</p>
         <p>${price} €</p>
       </div>
      <button class='btn btn-danger h-25' onclick="rimuoviCarrello(event, '${id}', '${price}')"><i class="bi bi-trash"></i></button>
    </li>`;
  const totale = document.querySelector(".totalePrezzo");
  /* console.log(totale.innerHTML); */
  totale.innerHTML = (Number(totale.innerHTML) + Number(price)).toFixed(2);
  const span = document.querySelector(".badge");
  span.innerHTML = `${lista.childElementCount}`;
};

const rimuoviCarrello = (event, id, price) => {
  event.target.closest("li").remove();
  const totale = document.querySelector(".totalePrezzo");
  totale.innerHTML = (Number(totale.innerHTML) - Number(price)).toFixed(2);
  const card = document.querySelector("#prod_" + id);
  console.log(card);
  const lista = document.querySelector(".lista");
  const span = document.querySelector(".badge");
  span.innerHTML = `${lista.childElementCount}`;
};

/* Logica Carrello Fine*/

window.onload = () => {
  getProdotti();
  const username = localStorage.getItem("username");
  const accedi = document.querySelector(".accedi");
  const modale = document.querySelector(".modal-body");
  if (username !== null) {
    accedi.classList.remove("btn-primary");
    accedi.classList.add("btn-success");
    accedi.innerHTML = username;
  }
  if (accedi.classList.contains("btn-success")) {
    modale.innerHTML = `<form class="w-0">
                  <div class="form-group">
                    <label for="exampleInputText1">Cambia username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInpuText"
                      aria-describedby="textHelp"
                      onchange=${handleChange("username", value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Cambia password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      onchange=${handleChange("password", value)}
                    />
                  </div>
                  <button type="button" class="btn btn-primary w-100 mt-4" onclick="home()">Conferma</button>
                  <button type="button" class="btn btn-danger w-100 mt-4" onclick="logout()">Esci</button>
                </form>;`;
  }
};
