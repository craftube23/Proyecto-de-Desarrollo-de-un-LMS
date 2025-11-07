// Notificación de conexión
// alert("Conexión exitosa 😎");

// Mensaje informativo en consola
console.log("correo: admin@campus.com , contraseña: 12345");

// Creamos el usuario administrador si no existe
if (!localStorage.getItem("administradores")) {
    const administradores = [
    { email: "admin@campus.com", password: "12345", nombre: "Administrador Principal" }
    ];
    localStorage.setItem("administradores", JSON.stringify(administradores));
}

/**
 * Inicio de sesión del administrador
 * Lectura del formulario y validación
 */
document.getElementById("loginBtn").addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    const administradores = JSON.parse(localStorage.getItem("administradores")) || [];
    const administrador = administradores.find(u => u.email === email && u.password === password);

    if (administrador) {
    
    // Guardamos el usuario activo
    
    localStorage.setItem("usuarioActivo", JSON.stringify(administrador));

    // Redirigir al panel del administrador
    
    window.location.href = "admin.html";
    } else {
    // Mostrar mensaje de error
    errorMsg.style.display = "block";
    }
});
