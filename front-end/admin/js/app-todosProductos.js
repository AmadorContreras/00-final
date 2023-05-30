// import  * as PostresService  from './services/PostresServices.js';
import PostresService from './services/postresServices.js';

const userContainer = document.querySelector('#allUsers');
const formulario = document.querySelector('#formulario');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const search = document.querySelector('#input-search');


const populateContainer = (item) => {
    // console.log(json);
    // userContainer.innerHTML = "";
    console.log(item);
    item.forEach((e, i) => {
        userContainer.innerHTML += `
        <tr class="">
        <th style="width: 25px;">${i + 1}</th>
        <td ><div  class="d-flex" style="width: 50px;"><p class="text-truncate">${e.name}</p></div> </td>
        <td >${e.price}</td>
        <td >${e.parts}</td>
        <td >${e.sizes}</td>
        <td ><div  class="d-flex" style="width: 50px;"><p class="text-truncate">${e.description}</p></div> </td>
        <td ><div  class="d-flex" style="width: 50px;"><p class="text-truncate">${e.ingredients}</p></div> </td>
        <td ><div  class="d-flex" style="width: 50px;"><p class="text-truncate">${e.url}</p></div> </td>
        <td >
            <button id="btn-delete-${e._id}" class="col-6 btn btn-danger btn-delete">Delete</button>
            <button id="btn-edit-${e._id}" class="col-6 btn btn-info btn-edit" >Edit</button>
        </td>
    </tr>
            
        `;
        // console.log(userContainer);

    });

    const buttonsDelete = document.querySelectorAll('.btn-delete');
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            deleteUser(id);
            // console.log(id);
        })
    });

    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editUSer(id);
        })
    });
}

const renderUsers = (searchValue) => {
    userContainer.innerHTML = "";
    if (searchValue) {
        PostresService.searchItemByName(searchValue)
            .then(items => {
                console.log(items, "search");
                populateContainer(items)
            })
    } else {
        PostresService.allUsers()
            .then(data => {
                console.log(data, "render");
                populateContainer(data)
            });
    }


}

const newUser = () => {
    const name = document.querySelector('#product-name').value;
    const description = document.querySelector('#product-description').value;
    const ingredients = document.querySelector('#product-ingre').value;
    const price = document.querySelector('#product-price').value;
    const sizes = document.querySelector('#product-size').value;
    const parts = document.querySelector('#product-part').value;
    const url = document.querySelector('#product-url').value;

    const user = { name, description, ingredients, price, sizes, parts, url };

    PostresService.insert(user)
        .then(data => {
            console.log(data);
            renderUsers();
            formulario.reset();

        });
}
const updateUser = () => {
    const name = document.querySelector('#product-name').value;
    const description = document.querySelector('#product-description').value;
    const ingredients = document.querySelector('#product-ingre').value;
    const price = document.querySelector('#product-price').value;
    const sizes = document.querySelector('#product-size').value;
    const parts = document.querySelector('#product-part').value;
    const url = document.querySelector('#product-url').value;

    const user = { name, description, ingredients, price, sizes, parts, url };

    PostresService.update(user, name)
        .then(data => {
            currenUser = null;
            // btnCancel.classList.replace("d-inline", "d-none");
            btnUpdate.classList.replace("d-inline", "d-none");
            btnInsert.classList.replace("d-none", "d-inline");
            document.getElementById("product-name").removeAttribute("disabled");

            formulario.reset();
            renderUsers();
        });
}

let currenUser = null;
const editUSer = (id) => {
    PostresService.getItemById(id).then(data => {
        currenUser = data;
        document.querySelector('#product-name').value = data.name
        document.querySelector('#product-description').value = data.description
        document.querySelector('#product-ingre').value = data.ingredients
        document.querySelector('#product-price').value = data.price
        document.querySelector('#product-size').value = data.sizes
        document.querySelector('#product-part').value = data.parts
        document.querySelector('#product-url').value = data.url

    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    document.getElementById("product-name").setAttribute("disabled", "disabled");




}
const deleteUser = (id) => {
    PostresService.delete(id)
        .then(data => {
            // messageAlert.textContent = data.message;
            //Change state
            renderUsers();
        })
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

    btnInsert.addEventListener("click", () => { newUser() });
    btnUpdate.addEventListener("click", () => { updateUser() });
    search.addEventListener("keyup", searchUsers);
}

init()