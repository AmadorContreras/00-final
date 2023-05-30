
import FogonesService from "./productos/FogonesService.js";

const productContainer = document.querySelector('#products-container');
const infoContainer = document.querySelector('#infoContainer');



const search = document.querySelector('#input-search');

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const populateContainer = (json) => {
    // console.log(json);
    productContainer.innerHTML = "";
    json.forEach(e => {
        productContainer.innerHTML += `
        <div class="card">
                <div class="card-body">
                    <div >
                        <img class="card-img" src="${e.url}" alt="" />
                    </div>
                    <h4 class="card-title" style="margin: 5%;">${e.name}</h4>
                    <p class="card-text text-truncate" style="margin: 3%;">${e.description}</p>

                </div>
                <div class="text-center" style="margin: 3%;">
                    <button id="btn-info-${e._id}" class="btn btn-danger btn-toInfo" style="margin: 3%;">Más info</button>
                </div>
                <div class="card-footer">
                    <h4 class="card-subtitle " style="margin: 3%;">Precio: ${e.price}€</h4>
                    <div class="text-center" style="margin: 3%;">
                        <button id="btn-toCart-${e._id}" class="btn btn-danger btn-toCart" style="margin: 3%;"><i class="fa-solid fa-cart-shopping"></i>add to cart</button>
                    </div>
                </div>
            </div>
        
        `;
    });
    const btnAddTocart = document.querySelectorAll('.btn-toCart');
    btnAddTocart.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            addTocart(id);
            // console.log(id);
        })
    });
    const buttonsInfo = document.querySelectorAll('.btn-toInfo');
    buttonsInfo.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            moreInfo(id);
            // console.log(id);
        })
    });
}

const addTocart = (id) =>{
    
    FogonesService.searchItemById(id)
        .then(items =>{
            
            let titulo = items.name
            let precio = items.price
            
            const toCart = {
                id,
                name:titulo,
                price:precio,
                quantity:1
            };
            
            if (carrito == "") {
                // alert("suma algo a local")
                carrito.push(toCart)
            }else{
                let duplicado = 0
                // compara si esta el titulo en el contenedor
                carrito.forEach(e => {
                    // si esta dentro le suma 1 a quantity
                    
                    if (e.id == id) {
                        e.quantity++
                        duplicado++
                        // si no esta, le suma 1 a duplpicado
                        // si no lo hago asi, cada vez que no coincide algo lo sube 
                    } 
                });
                // de esta forma solo lo sube 1 vez
                if (duplicado == 0) {
                    carrito.push(toCart)
                }
            }
        
            localStorage.setItem("carrito", JSON.stringify(carrito))
        });
        
    
    
}

const moreInfo = (searchValue) => {
    FogonesService.searchItemById(searchValue)
        .then(items => {
            console.log(items, "search");
            renderMoreInfo(items)
        })
}

const renderMoreInfo = (e) => {
    infoContainer.classList.replace("d-none", "d-block");
    search.classList.replace("d-block", "d-none");
    productContainer.classList.replace("none", "d-none");
    console.log(e.name);

    infoContainer.innerHTML = `
            <div class="card ">
                <div class="card ">
                    <div class="card bg-dark text-white" id="info-img" >
                        <img src="${e.url}" class="card-img" alt="...">
                        <div class="card-img-overlay" style="padding:2%;">
                            <h5 class="card-title" style="font-size:2rem">${e.name}</h5>
                            <p class="card-text" style="font-size:1.2rem">${e.description}</p>
                        </div>
                    </div>
                
                    <div class="card text-center" style="padding:2%;">
                        <h3 class="card-sub-title" style="margin: 1% auto;">Ingredientes</h3>
                        <p class="card-text" style="margin:1% 5%; margin-bottom:20px">${e.ingredients}</p>
                    </div>
                </div>
                <div class="card-footer text-center" >
                    <h4 class="card-subtitle " style="margin: 2% 0%;">Precio: ${e.price}€</h4>
                    
                    <div class="text-center" id="btn-footer-info">
                        <button id="btn-toCart-${e._id}" class="btn btn-danger btn-toCart" style="margin: 3%;"><i class="fa-solid fa-cart-shopping"></i> add to cart</button>
                        <button id="btn-closeCard-${e._id}"class="btn btn-danger btn-closeCard" style="margin: 3%;">Cerrar</button>
                    </div>
                </div>
            </div>
    `;


    const btnCloseCard = document.querySelectorAll('.btn-closeCard');
    btnCloseCard.forEach(button => {
        button.addEventListener("click", function () {

            infoContainer.classList.replace("d-block", "d-none");
            productContainer.classList.replace("d-none", "none");
            search.classList.replace("d-none","d-block");
            // console.log(id);
        })
    });
    const btnAddTocart = document.querySelectorAll('.btn-toCart');
    btnAddTocart.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            addTocart(id);
            // console.log(id);
        })
    });
}


const renderUsers = (searchValue) => {
    productContainer.innerHTML = "";
    if (searchValue) {
        FogonesService.searchItemByName(searchValue)
            .then(items => {
                console.log(items, "search");
                populateContainer(items)
            })
    } else {
        FogonesService.todoProductosFogones()
            .then(data => {
                // console.log(data, "render");
                populateContainer(data)
            });
    }


}

const searchUsers = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value;
        console.log(nameSearch, "<--name");
        renderUsers(nameSearch);
    } else if (input.value.length == 0) {
        renderUsers();
    }
}

function init() {
    renderUsers();
    // productContainer.innerHTML = "";
    search.addEventListener("keyup", searchUsers);
    // localStorage.clear()
}

init()