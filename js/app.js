import "./components/login.css.js";

const app = document.querySelector("#app");

// Mostrar login al inicio
const login = document.createElement("login-style");
app.appendChild(login);

// Escuchar evento de éxito
login.addEventListener("login-success", (e) => {

    console.log("Usuario logueado:", e.detail.nombre);
    app.innerHTM = alert("biembenido administrador");

});
