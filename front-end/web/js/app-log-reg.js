// import anime from 'animejs/lib/anime.es.js';
// import Users from '../../../back-end/models/Users.js';
import anime from "../../../back-end/node_modules/animejs/lib/anime.es.js";

import UserService from "./cuenta/CuentaServices.js";
// import * as UserService from './cuenta/CuentaServices.js'

const btnLog = document.querySelector("#btn-log");
const btnReg = document.querySelector("#btn-reg");

const logCard = document.querySelector("#log");
const regCard = document.querySelector("#reg");
const mainCard = document.querySelector("#main-card");

/* registro */

const btnRegistrar = document.querySelector("#btnRegistrar");
const btnLogin = document.querySelector("#btnSesion");

/* registro */

const cardAnime = () => {
    anime({
        targets: mainCard,
        scale: [{ value: 1 }, { value: 1.1 }, { value: 1, delay: 100 }],
        rotateY: { value: "+=180", delay: 250 },
        easing: "easeInOutSine",
        duration: 500,
    });

    // if (param == logCard) {
    //     logCard.classList.replace("d-block", "d-none");
    //     regCard.classList.replace("d-none", "d-block");
    // }else if(param == regCard){
    //     regCard.classList.replace("d-block", "d-none");
    //     logCard.classList.replace("d-none", "d-block");
    // }
};

function init() {

    // Botón login
    btnLogin.addEventListener("click", function () {
        const username = "";
        const email = document.querySelector("#log-email").value;
        const password = document.querySelector("#log-pass").value;
        const name = "";
        const surname = "";
        const address = "";
        const birth = "";

        // const params = { username, name, surname, address, email, birth, password };
        const params = { email, password };
        UserService.login(params).then(data => {
            if (!data.error) {
                alert(data.message)
                // alert("error "+data.error)
                // alert("user "+data.user.username)
                localStorage.setItem("sesion", true)
                localStorage.setItem("username", data.user.username)
                setTimeout(function () {
                    window.location.href = "cuenta.html"
                }, 500)
            } else {
                alert(data.message);
            }
        });
    });


    // Botón register
    btnRegistrar.addEventListener("click", function () {
        // const username = "";
        const username = document.querySelector("#reg-name").value;
        const email = document.querySelector("#reg-email").value;
        const password = document.querySelector("#reg-pass").value;
        const name = "";
        const surname = "";
        const address = "";
        const birth = "";

        const params = { username, name, surname, address, email, birth, password };
        // alert(" parametros "+JSON.stringify(params));
        UserService.register(params).then(data => {
            // alert("linea 54 " + data.error)
            // alert("linea 55 " + data.message)
            if (!data.error) {
                // alert(data.user)
                localStorage.setItem("sesion", true)
                localStorage.setItem("username", username)
                // console.log(data.message);
                // console.log(localStorage.getItem("sesion"));
                // console.log(localStorage.getItem("username"));
                alert(data.message)
                setTimeout(function () {
                    window.location.href = "cuenta.html"
                }, 500)

            } else {
                console.log(data.message);
                console.log(data);
                alert(data.message);
            }
            // alert("fin")
        });


    });

    btnReg.addEventListener("click", function () {
        cardAnime();
    });
    btnLog.addEventListener("click", function () {
        cardAnime();
    });

    // btnRegistrar.addEventListener("click", function () {
    //     alert()
    // })
    // window.addEventListener('load', function() {
    //     console.log('La página ha terminado de cargarse!!');
    // });
}

init();
