// Notificación de conexión
// alert("Conexión exitosa 😎");

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