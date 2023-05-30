const btnLogOut = document.querySelector("#btn-logOut")
const btnLogIn = document.querySelector("#btn-login")

// document.getElementById("man-pass").setAttribute("disabled", "disabled");
//     document.getElementById("man-pass").removeAttribute("disabled");

const testLocalStorageSesion = () =>{
    const sesion = localStorage.getItem("sesion");
    if (sesion == "false") {
        btnLogIn.classList.replace("d-none", "d-block")
        btnLogOut.classList.replace("d-block", "d-none")
        
    }else{
        btnLogIn.classList.replace("d-block", "d-none")
        btnLogOut.classList.replace("d-none", "d-block")
    }
}

function init() {
    testLocalStorageSesion()
    btnLogOut.addEventListener("click", function() {
            localStorage.setItem("sesion", false)
            localStorage.removeItem("username")
            window.location.href = "./cuenta.html"
        
    })
}

init()