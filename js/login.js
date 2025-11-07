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
  const loginBtn = document.getElementById("loginBtn");

  // Obtener los administradores desde localStorage
  const administradores = JSON.parse(localStorage.getItem("administradores")) || [];

  // Buscar si las credenciales son correctas
  const administrador = administradores.find(u => u.email === email && u.password === password);

  // Verificar resultado
  if (administrador) {
    console.log("✅ Inicio de sesión correcto");
    intentosFallidos = 0; // reiniciar contador
    localStorage.setItem("usuarioActivo", JSON.stringify(administrador));

    // Desactivar botón para evitar múltiples clicks mientras se muestra la pantalla
    loginBtn.disabled = true;

    // Mostrar la pantalla de éxito durante 3 segundos y luego redirigir
    mostrarPantallaExito(() => {
      window.location.href = "admin.html";
    });

  } else {
    // inicio de sesión es incorrecta
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

/**
 * 🎭 Función secreta (el meme del error)
 * Reemplaza el contenido del loginBox por la imagen de fallo.
 */
function mostrarEvento(loginBox) {
  console.log("🤣 Mostrando meme por fallar 3 veces...");

  // Asegurar que el loginBox existe
  if (!loginBox) return;

  loginBox.innerHTML = `
    <h2>💀 ¡Fallaste 3 veces!</h2>
    <p style="margin-bottom:10px;">Ahora enfréntate a las consecuencias 😈</p>
    <img src="https://cdn.memegenerator.es/descargar/31837234" 
         alt="meme" 
         style="width:100%; border-radius:10px; margin-top:10px; box-shadow:0 0 10px rgba(0,0,0,0.5); cursor:pointer;">
    <p style="margin-top:10px;">Haz clic en la imagen para volver al login 😏</p>
  `;

  // Evento: si hace clic en la imagen → recargar la página
  const img = loginBox.querySelector("img");
  if (img) {
    img.addEventListener("click", () => {
      console.log("🔁 Regresando al login...");
      location.reload();
    });
  }
}

/**
 * 🥳 Mostrar imagen de éxito a pantalla completa durante 3 segundos
 * callback: función a ejecutar después de 3s (por ejemplo, redirigir)
 */
function mostrarPantallaExito(callback) {
  console.log("✨ Mostrando pantalla de éxito...");

  // Crear contenedor overlay
  const overlay = document.createElement("div");
  overlay.id = "overlay-exito";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    textAlign: "center",
    color: "white"
  });

  // Contenido: imagen + texto
  overlay.innerHTML = `
    <div style="max-width:900px; width:90%; display:flex; flex-direction:column; align-items:center;">
      <img src="https://i.redd.it/w4g4whno1ad51.jpg"
           alt="éxito"
           style="width:70%; max-width:500px; border-radius:15px; box-shadow:0 0 30px rgba(255,255,255,0.15);">
      <h2 style="margin:0.6rem 0 0 0; font-size:1.6rem;">🎉 ¡Acceso concedido!</h2>
      <p style="margin:0.2rem 0 0 0; opacity:0.9;">Te redirigimos al panel en breve...</p>
    </div>
  `;

  // Insertar al body
  document.body.appendChild(overlay);

  // 🔊 Reproducir audio descargado
  const audio = new Audio("../xd.mp3"); // <-- reemplaza con el nombre de tu archivo
  audio.volume = 0.8; // volumen entre 0 y 1
  audio.play().catch(err => console.warn("⚠️ No se pudo reproducir el audio:", err));

  // ⏱️ Temporizador: 3 segundos
  setTimeout(() => {
    // Remover overlay
    const el = document.getElementById("overlay-exito");
    if (el) el.remove();

    // Ejecutar callback si existe
    if (typeof callback === "function") callback();
  }, 3000);
}

