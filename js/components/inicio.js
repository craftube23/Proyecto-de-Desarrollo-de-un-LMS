// -------------------------------------------------
// COMPONENTE 3: <user-card>
// Panel principal con navegación y vista de cursos
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
        align-items: center;
        gap: 40px;
        padding: 18px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        flex-wrap: wrap;
    }

    nav a {
        color: #00ffd5;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
        font-size: 1rem;
    }

    nav a:hover {
        color: white;
    }

    button {
        max-width: 180px;
        padding: 10px 16px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        border: none;
        border-radius: 8px;
        background: white;
        color: #003366;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s, transform 0.1s;
        flex-shrink: 0; 
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
        cursor: pointer;
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

      /* ---------- MODAL ---------- */
    .modal {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 9999;
    }
    .modal.active {
        visibility: visible;
        opacity: 1;
    }
    .modal-content {
        background: #111;
        padding: 20px 30px;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        color: white;
        box-shadow: 0 0 20px rgba(0,255,213,0.3);
        animation: popIn 0.4s ease;
    }
    @keyframes popIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .modal-content h3 {
        color: #00ffd5;
        margin-bottom: 15px;
        text-align: center;
    }
    .modulo {
        background: rgba(255,255,255,0.06);
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 10px;
        border: 1px solid rgba(255,255,255,0.1);
    }
    .modulo h4 {
        margin: 0;
        color: #00ffd5;
    }
    .close-btn {
        display: block;
        margin: 20px auto 0;
        background: #00ffd5;
        color: black;
        font-weight: bold;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
    }
    .close-btn:hover { background: #0ff; }
    </style>

    <!-- ---------- ESTRUCTURA HTML ---------- -->
    <nav>
        <a href="#">🏠 Inicio</a>
        <a  href="#">📚 profesores</a>
        <button id="profes" > profes </button>
        <button id="loginBtn">Ingresar</button>     
    </nav>
    
    <div class="container">
        <h2>📚 Cursos Disponibles</h2>
        <div class="grid" id="grid"></div>

        <div class="no-cursos" id="mensajeVacio" style="display:none;">
            No hay cursos disponibles.
        </div>
    </div>

    <!-- ---------- MODAL ---------- -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <h3 id="modalTitulo">Módulos del curso</h3>
            <div id="modalBody"></div>
            <button class="close-btn" id="cerrarModal">Cerrar</button>
        </div>
    </div>
    `;
    }

    connectedCallback() {
        this.mostrarCursos();
    }

    // ===================================================
    // FUNCIÓN PRINCIPAL: Mostrar cursos en tarjetas
    // ===================================================
    mostrarCursos() {
        const s = this.shadowRoot;
        const grid = s.getElementById("grid");
        const mensajeVacio = s.getElementById("mensajeVacio");
        const profes = s.getElementById("docentes");
        const loginBtn = s.getElementById("loginBtn");
        const modal = s.getElementById("modal");
        const modalBody = s.getElementById("modalBody");
        const modalTitulo = s.getElementById("modalTitulo");
        const cerrarModal = s.getElementById("cerrarModal");

        // Botón de login
        loginBtn.addEventListener("click", () => {
            document.querySelector("#app").innerHTML = "<app-login></app-login>";
        });

        // Obtenemos los cursos del localStorage
        const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

        // Si no hay cursos, mostramos mensaje
        if (cursos.length === 0) {
            mensajeVacio.style.display = "block";
            return;
        }

        mensajeVacio.style.display = "none";

        // Mostrar cursos como tarjetas
        cursos.forEach(curso => {
            const card = document.createElement("div");
            card.className = "card";

            const imgSrc =
                curso.imagen ||
                "https://via.placeholder.com/300x180/00ffd5/000000?text=Sin+Imagen";
            const descripcion =
                curso.descripcion || "Sin descripción disponible.";

            card.innerHTML = `
            <img src="${imgSrc}" alt="Imagen del curso ${curso.nombre}">
            <div class="info">
                <div class="nombre">${curso.nombre}</div>
                <div class="descripcion">${descripcion}</div>
            </div>
            `;

            // Cuando se hace clic en un curso → mostrar módulos
            card.addEventListener("click", () => {
                this.mostrarModal(curso, modal, modalTitulo, modalBody);
            });

            grid.appendChild(card);
        });

        // Cerrar modal
        cerrarModal.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // También cerrar si se da clic fuera del contenido
        modal.addEventListener("click", e => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }
    const docentes = JSON.parse(localStorage.getItem("docentes")) || [];

    grid.innerHTML = "";


    profes.addEventListener("click", () =>{ 
        const card = document.createElement("div");
        card.className = "card";

        const imgSrc =
        docente.preview ||
            "https://via.placeholder.com/300x180/00ffd5/000000?text=Sin+Imagen";

        card.innerHTML = `
        <img src="${imgSrc}" alt="Imagen del curso ${docente.nombre}">
        <div class="info">
            <div class="nombre">${docente.nombre}</div>
            <div class="descripcion">${docente.materia}</div>
        </div>
        `;);
    

    // ===================================================
    // FUNCIÓN: mostrarModal(curso)
    // Muestra los módulos del curso dentro de un modal
    // ===================================================
    mostrarModal(curso, modal, modalTitulo, modalBody) {
        modalTitulo.textContent = `📘 Módulos de ${curso.nombre}`;
        modalBody.innerHTML = "";

        // Si no hay módulos
        if (!curso.modulos || curso.modulos.length === 0) {
            modalBody.innerHTML = `
            <p style="text-align:center; opacity:0.8;">
            ⚠️ Este curso aún no tiene módulos asignados.
            </p>`;
        } else {
            curso.modulos.forEach((mod, i) => {
                const div = document.createElement("div");
                div.className = "modulo";
                div.innerHTML = `
            <h4>🧩 ${i + 1}. ${mod.titulo}</h4>
            <p>${mod.descripcion}</p>
        `;
                modalBody.appendChild(div);
            });
        }

        // Mostrar modal
        modal.classList.add("active");
    }
}

// Registro del componente
customElements.define("user-card", UserCard);
