
// -------------------------------------------------
// COMPONENTE 3: <app-dashboard>
// Panel principal con navegación a módulos
// -------------------------------------------------

class UserCard extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
      /* ---------- ESTILOS GENERALES ---------- */
    :host {
        display: block;
        font-family: "Poppins", sans-serif;
        color: #fff;
        background: #000;
        min-height: 100vh;
    }

      /* ---------- NAV ---------- */
    nav {
        background: #111;
        display: flex;
        justify-content: center;
        align-items: baseline;
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

    button {
        width: 15%;
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

    button:hover { background: #cce0ff; }
    button:active { transform: scale(0.97); }


    /* ---------- CONTENEDOR PRINCIPAL ---------- */
    .container {
        padding: 40px 30px;
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        color: #00ffd5;
        margin-bottom: 30px;
        text-shadow: 0 0 8px #00ffd5;
    }

      /* ---------- GRID DE CURSOS ---------- */
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

    @media (max-width: 900px) {
        .grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 600px) {
        .grid { grid-template-columns: 1fr; }
    }

      /* ---------- TARJETA DE CURSO ---------- */
    .card {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        overflow: hidden;
        text-align: center;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .card:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 18px rgba(0, 255, 213, 0.2);
    }

    .card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .info {
        padding: 18px;
    }

    .nombre {
        font-size: 1.1rem;
        color: #00ffd5;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .descripcion {
        font-size: 0.95rem;
        color: #ccc;
        line-height: 1.4;
    }

    .no-cursos {
        text-align: center;
        color: #888;
        font-size: 1rem;
        margin-top: 30px;
    }
    </style>

    <!-- ---------- ESTRUCTURA HTML ---------- -->
    <nav>
        <a href="#">🏠 Inicio</a>
        <a href="#">📚 Cursos</a>
        <button id="loginBtn">Ingresar</button>     
    </nav>
    
    <div class="container">
        <h2>📚 Cursos Disponibles</h2>
        <div class="grid" id="grid"></div>

    <!-- Mensaje cuando no hay cursos -->
    <div class="no-cursos" id="mensajeVacio" style="display:none;">
        No hay cursos disponibles.
    </div>
    </div>
    `;
}

  // ===============================================
  // Cuando el componente se monta en el DOM
  // ===============================================
connectedCallback() {
    this.mostrarCursos();
}

  // ===============================================
  // FUNCIÓN: mostrarCursos()
  // Muestra nombre, descripción e imagen de los cursos
  // ===============================================
mostrarCursos() {
    const s = this.shadowRoot;
    const grid = s.getElementById("grid");
    const mensajeVacio = s.getElementById("mensajeVacio");
    const loginBtn = s.getElementById("loginBtn")

loginBtn.addEventListener("click", () => {
    document.querySelector("#app").innerHTML = "<app-login></app-login>"
});
    // Obtenemos los cursos del localStorage
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    // Limpiamos antes de renderizar
    grid.innerHTML = "";

    // Si no hay cursos, mostramos mensaje
    if (cursos.length === 0) {
        mensajeVacio.style.display = "block";
        return;
    }

    mensajeVacio.style.display = "none";

    // Recorremos los cursos
    cursos.forEach(curso => {
        const card = document.createElement("div");
        card.className = "card";

      // Si no hay imagen guardada, ponemos una de relleno
        const imgSrc = curso.imagen || "https://via.placeholder.com/300x180/00ffd5/000000?text=Sin+Imagen";
        const descripcion = curso.descripcion || "Sin descripción disponible.";

      // Plantilla visual de cada tarjeta
    card.innerHTML = `
        <img src="${imgSrc}" alt="Imagen del curso ${curso.nombre}">
        <div class="info">
            <div class="nombre">${curso.nombre}</div>
            <div class="descripcion">${descripcion}</div>
        </div>
    `;

        grid.appendChild(card);
    });
}
}

// Registro del componente
customElements.define("user-card", UserCard);
