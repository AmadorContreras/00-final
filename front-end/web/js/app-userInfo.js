
import UserService from './cuenta/CuentaServices.js';

// const userName = document.querySelector('#user-name');
// const id = document.querySelector('#_id');
const username = document.querySelector('#user-name');
const name = document.querySelector('#nombre');
const surname = document.querySelector('#apellido');
const address = document.querySelector('#user-address');
const email = document.querySelector('#user-email');
const birth = document.querySelector('#user-birth');
const password = document.querySelector('#user-pass');


/* btn-update */
const btnUpdate = document.querySelector('#user-update');



// Se requiere guardar sesion:true y username:nombreDeUsuario
// En localStorage para iniciar sesion






const localStorageInfo = () => {

    let sesion = localStorage.getItem("sesion")
    let usuario = localStorage.getItem("username")
    // console.log(usuario);

    if (sesion == 'true') {
        // scanUser.classList.replace("d-block", "d-none");
        renderUsers(usuario)

    } else {
        // scanUser.classList.replace("d-none", "d-block");
        renderUsers(null)

    }
}



const populateContainer = (json) => {
    // console.log(json);
    username.value = json.username
    name.value = json.name
    surname.value = json.surname
    address.value = json.address
    email.value = json.email
    birth.value = json.birth
    password.value = json.password
    console.log(json);
    // id.textContent = json.email


}

const renderUsers = (user) => {

    UserService.searchUserByUsername(user).then(data => {
        console.log(data);
        // listUsers = data;
        populateContainer(data)
    });

}


const updateUser = () => {
    const username = document.querySelector('#user-name').value;
    const name = document.querySelector('#nombre').value;
    const surname = document.querySelector('#apellido').value;
    const address = document.querySelector('#user-address').value;
    // const email = document.querySelector('#user-email').value;
    const birth = document.querySelector('#user-birth').value;
    // const password = document.querySelector('#user-pass').value;

    const user = { name, surname, address, birth };

    UserService.update(user, username)
        .then(data => {
            populateContainer(data)
            formulario.reset();
        });
}

function init() {
    btnUpdate.addEventListener("click", function () {
        updateUser()
    })


    localStorageInfo()

}

init()