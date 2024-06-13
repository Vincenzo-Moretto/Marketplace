/*  const rimuoviCarrello = (price) => {
    document.querySelector("li").remove();
  
    const totale = document.querySelector(".totale");
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);
    const lista = document.querySelector(".lista");
    const span = document.querySelector(".badge");
    span.innerHTML = `${lista.childElementCount}`;
}; */
/* 
 const aggiungiCarrello = (img, title, price, id) => {
  const book = document.querySelector("#prod_" + id);
  book.style.border = "2px red solid";
  const lista = document.querySelector(".lista");
  lista.innerHTML += `
      <li class="list-group-item">
         <img src=${img} alt=${title} width="100px" height="100px">
         <p>${title} Nome Prodotto </p>
         <p>${price} € </p>
        <button class='btn btn-danger' onclick=${rimuoviCarrello(price)}> cestino </button>
      </li>`;
  const totale = document.querySelector(".totale");
  totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2);
  const span = document.querySelector(".badge");
  span.innerHTML = `${lista.childElementCount}`;
};
  */
