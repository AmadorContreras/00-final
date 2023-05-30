
import UserService from './cuenta/CuentaServices.js';

const userName = document.querySelector('#user-title');
const id = document.querySelector('#_id');
// const nombre = document.querySelector('#nombre');
// const apellido = document.querySelector('#apellido');
// const userEmail = document.querySelector('#user-email');


const scanUser = document.querySelector('#scan-user');
const prueba = document.querySelector('#test');


// let usuario = "Eamein"
// Se requiere guardar sesion:true y username:nombreDeUsuario
// En localStorage para iniciar sesion



const localStorageInfo = () => {
    let usuario = localStorage.getItem("username")
    let sesion = localStorage.getItem("sesion")

    if (sesion == "true") {
        scanUser.classList.replace("d-block", "d-none");
        renderUsers(usuario)

    } else {
        scanUser.classList.replace("d-none", "d-block");
        renderUsers(null)

    }
}



const populateContainer = (json) => {
    // console.log(json);
    userName.textContent = json.username
    id.textContent = json.email


}

const renderUsers = (user) => {

    UserService.searchUserByUsername(user).then(data => {
        // console.log(data);
        // listUsers = data;
        populateContainer(data)
    });

}

function init() {
    localStorageInfo()


}

init()