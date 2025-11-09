// ===============================================
// COMPONENTE WEB: <user-card>
// ===============================================
// Muestra una cuadrícula con los cursos guardados en localStorage.
// Diseñado como Web Component independiente y reutilizable.
// ===============================================

class UserCard extends HTMLElement {
  constructor() {
    super();
    // === Creamos el Shadow DOM (encapsula HTML, CSS y JS) ===
    this.attachShadow({ mode: "open" });

    // === Plantilla del componente (HTML + CSS) ===
    this.shadowRoot.innerHTML = `
    <style>
      /* ---------- ESTILOS GLOBALES DEL COMPONENTE ---------- */
    :host {
        display: block;
        font-family: "Poppins", sans-serif;
        color: white;
        background: #000000ff;
        min-height: 100vh;
        margin: 0;
    }

      /* ---------- NAV SUPERIOR ---------- */
    nav {
        background: #111;
        display: flex;
        justify-content: center;
        gap: 40px;
        padding: 18px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

    nav a {
        color: #00ffd5;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }

    nav a:hover {
        color: white;
    }

      /* ---------- CONTENEDOR PRINCIPAL ---------- */
    .container {
        padding: 40px 30px;
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        color: #00ffd5;
        margin-bottom: 20px;
        text-shadow: 0 0 8px #00ffd5;
    }

      /* ---------- GRID DE CURSOS ---------- */
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

      /* Ajustes responsive (para pantallas más pequeñas) */
    @media (max-width: 900px) {
        .grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 600px) {
        .grid { grid-template-columns: 1fr; }
    }

      /* ---------- TARJETAS DE CURSOS ---------- */
    .card {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 14px;
        padding: 20px;
        text-align: center;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

      /* Efecto hover: se eleva ligeramente */
    .card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 18px rgba(0, 255, 213, 0.2);
    }

      /* Texto de la tarjeta */
    .nombre {
        font-size: 1.1rem;
        color: #00ffd5;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .clave {
        font-size: 0.95rem;
        color: #ccc;
    }

      /* Mensaje cuando no hay cursos */
    .no-cursos {
        text-align:center;
        color:#888;
        font-size:1rem;
        margin-top:30px;
    }
    </style>

    <!-- ---------- ESTRUCTURA HTML DEL COMPONENTE ---------- -->
    <nav>
        <a href="#">🏠 Inicio</a>
        <a href="#">📚 Cursos</a>
    </nav>

    <div class="container">
        <h2>📚 Cursos Disponibles</h2>
        <!-- Aquí se insertarán dinámicamente las tarjetas -->
        <div class="grid" id="grid"></div>
        <!-- Mensaje cuando no hay cursos -->
    
    <div class="no-cursos" id="mensajeVacio" style="display:none;">
    
        No hay cursos disponibles.
    
    </div>
    </div>
    `;
}

  // ===================================================
  // Se ejecuta cuando el componente se inserta en el DOM
  // ===================================================
connectedCallback() {
    this.mostrarCursos(); // Cargamos los cursos desde localStorage
}

  // ===================================================
  // FUNCIÓN: mostrarCursos()
  // Carga la lista de cursos guardados en localStorage
  // y los muestra como tarjetas dentro del grid
  // ===================================================
mostrarCursos() {
    const s = this.shadowRoot;
    const grid = s.getElementById("grid");
    const mensajeVacio = s.getElementById("mensajeVacio");

    // Recuperamos los cursos almacenados
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    // Limpiamos el grid antes de llenarlo
    grid.innerHTML = "";

    // Si no hay cursos, mostramos mensaje
    if (cursos.length === 0) {
        mensajeVacio.style.display = "block";
        return;
    }

    // Si hay cursos, ocultamos mensaje
    mensajeVacio.style.display = "none";

    // Recorremos y creamos las tarjetas
    cursos.forEach(curso => {
        const card = document.createElement("div");
        card.className = "card";

      // Estructura visual de cada tarjeta
    card.innerHTML = `
        <div class="nombre">📘 Nombre: ${curso.nombre}</div>
        <div class="clave">🔑 Clave: ${curso.clave}</div>
    `;

    grid.appendChild(card);
    });
}
}

// ===============================================
// Registro del componente para usarlo como <user-card>
// ===============================================
customElements.define("user-card", UserCard);
