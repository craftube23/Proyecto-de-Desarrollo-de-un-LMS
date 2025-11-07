//  Notificación de conexión
// alert("Conexión exitosa 😎");

//  se un admi 
console.log("Usa estas credenciales si eres admi para ingresar:");
console.log("Correo: admin@campus.com | Contraseña: 12345");

// Creamos el administrador 
if (!localStorage.getItem("administradores")) {
    
    const administradores = [
    { email: "admin@campus.com", password: "12345", nombre: "Administrador Principal" }
    ];
    localStorage.setItem("administradores", JSON.stringify(administradores));
    console.log("✅ Administrador creado en localStorage");

}

// Contador de intentos fallidos 
let intentosFallidos = 0;

/**
 *  inicio de sesión del administrador
 * - Lee los datos del formulario
 * - Valida las credenciales
 * - Si hay 3 errores seguidos → evento especial
 */
document.getElementById("loginBtn").addEventListener("click", () => {
    console.log("🔎 Intentando iniciar sesión...");

  // Leer los valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const loginBox = document.querySelector(".login-box");

  // Obtener los administradores desde localStorage
    const administradores = JSON.parse(localStorage.getItem("administradores")) || [];

  //  Buscar si las credenciales son correctas
    const administrador = administradores.find(u => u.email === email && u.password === password);

  // Verificar resultado
    if (administrador) {
    
        console.log("✅ Inicio de sesión correcto");
        intentosFallidos = 0; // reiniciar contador
        localStorage.setItem("usuarioActivo", JSON.stringify(administrador));
        window.location.href = "admin.html"; // Redirige al panel

    } else {
    
        // inicio de seesion es  incorrecta
    intentosFallidos++;
    console.warn(`❌ Intento fallido #${intentosFallidos}`);

    // Mostrar mensaje en pantalla
    errorMsg.style.display = "block";
    errorMsg.textContent = `Credenciales incorrectas (${intentosFallidos}/3)`;

    // Si llega a 3 errores
    if (intentosFallidos >= 3) {
        mostrarEvento(loginBox);
    }
}
});

// 🎭 Función secreta (el meme del error)
function mostrarEvento(loginBox) {
    
    console.log("🤣 Mostrando meme por fallar 3 veces...");

  // Reemplazamos el contenido del login por la imagen
    loginBox.innerHTML = `
    <h2>💀 ¡Fallaste 3 veces!</h2>
    <p style="margin-bottom:10px;">Ahora enfréntate a las consecuencias 😈</p>
    <img src="https://i.pinimg.com/originals/f1/92/4a/f1924a4b4d38f7df87c2f6824ac73b9d.gif" 
        alt="meme" 
        style="width:100%; border-radius:10px; margin-top:10px; box-shadow:0 0 10px rgba(0,0,0,0.5); cursor:pointer;">
    <p style="margin-top:10px;">Haz clic en la imagen para volver al login 😏</p>
    `;

  // Evento: si hace clic en la imagen → recargar la página
    const img = loginBox.querySelector("img");
    img.addEventListener("click", () => {
    console.log("🔁 Regresando al login...");
    location.reload();
    });
}
