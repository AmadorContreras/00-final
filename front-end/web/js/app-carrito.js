// import FogonesService from "./productos/FogonesService.js";

const productToCart = document.querySelector("#productToCart");
const totalCarro = document.querySelector("#totalCarro");
const confirmCart = document.querySelector("#confirmCart");


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let totalCarrito = 0

const populateContainer = (json) => {
    // console.log(json);
    productToCart.innerHTML = "";
    console.log(json);
    json.forEach((e, i) => { 
        totalCarrito = totalCarrito +(e.price*e.quantity);
        productToCart.innerHTML += `
        <tr>
            <th>${i + 1}</th>
            <td>${e.name}</td>
            <td>${e.price}€</td>
            <td class="d-flex">
                <p style="margin: 2px;">${e.quantity}</p>
                <button class="btn btn-dark" style="margin: 2px;">+</button>
                <button class="btn btn-dark" style="margin: 2px;">-</button>
            </td>
            <td>${e.price*e.quantity}€</td>
            <td>
                <button class="btn btn-dark" id="btn-deleteToCart">
                    <i class="fa-solid fa-close"></i> eliminar
                </button>
            </td>
        </tr>
        
        `;
    });
    totalCarro.innerHTML=totalCarrito;
    
};


function init() {

    populateContainer(carrito)
    confirmCart.addEventListener("click", ()=>{
        localStorage.removeItem("carrito")
        totalCarro.innerHTML = 0
        populateContainer()
    })
}

init();
