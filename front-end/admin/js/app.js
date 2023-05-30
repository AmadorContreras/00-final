// import  * as UserService  from './services/UserServices.js';
import UserService from './services/UserServices.js';

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
                    <td >${e.username}</th>
                    <td >${e.name}</td>
                    <td >${e.surname}</td>
                    <td >${e.address}</td>
                    <td >${e.email}</td>
                    <td >${e.birth}</td>
                    <td  class="row" style="width: 150px;"><p class="text-truncate">${e.password}</p></td>
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
        UserService.searchItemByName(searchValue)
            .then(items => {
                console.log(items, "search");
                populateContainer(items)
            })
    } else {
        UserService.allUsers()
            .then(data => {
                console.log(data, "render");
                populateContainer(data)
            });
    }


}

const newUser = () => {
    const username = document.querySelector('#man-nick').value;
    const name = document.querySelector('#man-name').value;
    const surname = document.querySelector('#man-surname').value;
    const address = document.querySelector('#man-address').value;
    const email = document.querySelector('#man-email').value;
    const birth = document.querySelector('#man-birth').value;
    const password = document.querySelector('#man-pass').value;

    const user = { username, name, surname, address, email, birth, password };

    UserService.insert(user)
        .then(data => {
            console.log(data);
            renderUsers();
            formulario.reset();

        });
}
const updateUser = () => {
    const username = document.querySelector('#man-nick').value;
    const name = document.querySelector('#man-name').value;
    const surname = document.querySelector('#man-surname').value;
    const address = document.querySelector('#man-address').value;
    // const email = document.querySelector('#man-email').value;
    const birth = document.querySelector('#man-birth').value;
    // const password = document.querySelector('#man-pass').value;

    const user = { name, surname, address, birth };

    UserService.update(user, username)
        .then(data => {
            currenUser = null;
            // btnCancel.classList.replace("d-inline", "d-none");
            btnUpdate.classList.replace("d-inline", "d-none");
            btnInsert.classList.replace("d-none", "d-inline");
            document.getElementById("man-nick").removeAttribute("disabled");
            document.getElementById("man-email").removeAttribute("disabled");
            document.getElementById("man-pass").removeAttribute("disabled");
            formulario.reset();
            renderUsers();
        });
}

let currenUser = null;
const editUSer = (id) => {
    UserService.getItemById(id).then(data => {
        currenUser = data;
        document.querySelector('#man-nick').value = data.username;
        document.querySelector('#man-name').value = data.name;
        document.querySelector('#man-surname').value = data.surname;
        document.querySelector('#man-address').value = data.address;
        document.querySelector('#man-email').value = data.email;
        document.querySelector('#man-birth').value = data.birth;
        document.querySelector('#man-pass').value = data.password;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    document.getElementById("man-nick").setAttribute("disabled", "disabled");
    document.getElementById("man-email").setAttribute("disabled", "disabled");
    document.getElementById("man-pass").setAttribute("disabled", "disabled");
    


}
const deleteUser = (id) => {
    UserService.delete(id)
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