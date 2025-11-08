// Notificación de conexión
//alert("Conexión exitosa 😎");

class login extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
       /* Estilos generales */
    :host {
        box-sizing: border-box;
        font-family: "Segoe UI", Arial, sans-serif;
      }

    body {
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #003366, #006699);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    /* Caja del login */

    .login-box {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 15px;
      width: 320px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    /* Título */
    .login-box h3 {  margin-bottom: 1.5rem; }
    /* Campos de texto */
    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: none;
      border-radius: 8px;
      outline: none;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 1rem;
    }
    input::placeholder {  color: rgba(255,255,255,0.7); }
    /* Botón */

    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 8px;
      background: white;
      color: #003366;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s, transform 0.1s;
    }
    button:hover {  background: #cce0ff; }
    button:active {  transform: scale(0.97); }
    /* Mensaje de error */
    .error {
      display: none;
      color: #ff5c5c;
      margin-top: 10px;
    }`
  }
}

// Mensaje informativo en consola
console.log("correo: admin@campus.com , contraseña: 12345");

// Creamos el usuario administrador si no existe
if (!localStorage.getItem("administradores")) {
    const administrators = [
    { email: "admin@campus.com", password: "12345", nombre: "Administrador Principal" }
    ];
    localStorage.setItem("administradores", JSON.stringify(administrators));
}

/**
 * Inicio de sesión del administrador
 * Lectura del formulario y validación
 */
document.getElementById("loginBtn").addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    const administrators = JSON.parse(localStorage.getItem("administradores")) || [];
    const administrator = administrators.find(u => u.email === email && u.password === password);

    if (administrator) {
    
    // Guardamos el usuario activo
    
    localStorage.setItem("usuarioActivo", JSON.stringify(administrator));

    // Redirigir al panel del administrador
    
    window.location.href = "admin.html";
    } else {
    // Mostrar mensaje de error
    errorMsg.style.display = "block";
    }
});

// sesion / local investigar 