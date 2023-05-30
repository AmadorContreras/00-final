// import  * as CategoriaService  from './services/CategoriaServices.js';
import CategoriaService from './services/CategoriasServices.js';

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
                    <th scope="row">${i + 1}</th>
                    <td >${e.name}</th>
                    <td >${e.description}</td>
                    <td scope=" row">
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
        CategoriaService.searchItemByName(searchValue)
            .then(items => {
                console.log(items,"search");
                populateContainer(items)
            })
    } else {
        CategoriaService.allUsers()
            .then(data => {
                console.log(data, "render");
                populateContainer(data)
            });
    }


}

const newUser = () => {
    const name = document.querySelector('#man-nick').value;
    const description = document.querySelector('#man-name').value;


    const user = { name, description };

    CategoriaService.insert(user)
        .then(data => {
            console.log(data);
            renderUsers();
            formulario.reset();

        });
}
const updateUser = () => {
    const name = document.querySelector('#man-nick').value;
    const description = document.querySelector('#man-name').value;

    const user = { name, description};

    CategoriaService.update(user, name)
        .then(data => {
            currenUser = null;
            // btnCancel.classList.replace("d-inline", "d-none");
            btnUpdate.classList.replace("d-inline", "d-none");
            btnInsert.classList.replace("d-none", "d-inline");
            formulario.reset();
            renderUsers();
        });
}

let currenUser = null;
const editUSer = (id) => {
    CategoriaService.getItemById(id).then(data => {
        currenUser = data;
        document.querySelector('#man-nick').value = data.name;
        document.querySelector('#man-name').value = data.description;

    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
}
const deleteUser = (id) => {
    CategoriaService.delete(id)
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

    btnInsert.addEventListener("click", () => {newUser()});
    btnUpdate.addEventListener("click", () => {updateUser()});
    search.addEventListener("keyup", searchUsers);
}

init()