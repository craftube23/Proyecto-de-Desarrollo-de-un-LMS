// Componente Admin con panel de gestión de cursos
export class Admin extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Propiedad interna que indica si estamos en modo edición
    this._editing = false;

    this.shadowRoot.innerHTML = `
    <style>
      /* ---------- ESTILOS (ver comentarios en el JS) ---------- */
    :host {
        display: block;
        font-family: "Poppins", sans-serif;
        color: #fff;
        min-height: 100vh;
        padding: 40px 20px;
        background: linear-gradient(135deg, #0a0a0a, #1c1c1c);
    }

    .panel {
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 30px 40px;
        width: 90%;
        max-width: 900px; /* más ancho para que entren 3 tarjetas por fila */
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.08);
        animation: fadeIn 0.8s ease-out;
        margin: 0 auto;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .panel-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
    .panel-header h3 { margin:0; font-size:1.4rem; color:#00ffd5; text-shadow:0 0 8px #00ffd5; }

    button { background-color: #ff4d4d; color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor:pointer; transition:0.22s; }
    button:hover:not(:disabled) { transform:scale(1.03); background:#ff6666; }
    button:disabled { background:#666; cursor:not-allowed; opacity:0.6; }

    hr { border:none; height:1px; background:rgba(255,255,255,0.08); margin:20px 0; }

    .grid-1 { display:grid; grid-template-columns: repeat(2, 1fr); gap:20px; margin-top:20px; }
    .item { background:#444; padding:18px; text-align:center; border-radius:8px; border:1px solid #666; cursor:pointer; }
    .item:hover { transform:translateY(-4px); box-shadow:0 6px 14px rgba(0,0,0,0.4); }

      /* Panel de cursos (inicialmente oculto) */
    .courses-panel { display:none; margin-top:30px; background: rgba(255,255,255,0.03); border-radius:10px; padding:16px; }

      /* Grid de tarjetas: máximo 3 por fila en pantallas grandes */
    .course-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* máximo 3 columnas */
        gap: 16px;
        margin-top: 16px;
    }

      /* Responsividad: 2 columnas en tablet, 1 en móvil */
    @media (max-width: 900px) {
        .course-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 520px) {
        .course-grid { grid-template-columns: 1fr; }
    }

      /* Tarjeta de curso */
    .course-card {
        background: rgba(0,0,0,0.35);
        border: 1px solid rgba(0,255,213,0.12);
        border-radius: 10px;
        padding: 12px;
        transition: transform .22s ease, box-shadow .22s ease;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

      /* Hover elevación */
    .course-card:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.45); }

      /* Cada fila de label + input */
    .field {
        display:flex;
        align-items:center;
        gap:8px;
        justify-content:space-between;
    }

    .lbl {
        width: 30%;
        font-size: 0.9rem;
        opacity: 0.9;
        text-align:left;
    }

    .course-card input {
        width: 68%;
        background: transparent;
        border: none;
        color: white;
        font-size: 0.98rem;
        padding: 6px 8px;
        border-bottom: 1px solid transparent;
        outline: none;
    }

      /* Resaltar inputs cuando está en modo edición */
    .course-card.editing input {
        border-bottom: 1px solid #00ffd5;
    }

      /* Botones internos inicialmente ocultos; se muestran en modo edición */
    .card-actions {
        display:flex;
        gap:8px;
        justify-content:center;
    }

    .card-actions button { display:none; padding:6px 10px; border-radius:8px; }
    .course-card.editing .card-actions button { display:inline-block; }

    .delete { background:#ff4d4d; color:white; }
    .edit { background:#00ffd5; color:black; }

      /* Controles globales (Agregar / Guardar) ocultos hasta modo edición */
    .controls { display:none; margin-top:16px; justify-content:space-between; }
    .controls.visible { display:flex; }
    .controls button { background:#00ffd5; color:black; padding:10px 14px; border-radius:8px; }

    .small-footer { margin-top:28px; font-size:0.85rem; opacity:0.8; text-align:center; }
    </style>

    <!-- Estructura HTML -->
    <div class="panel">
        <div class="panel-header">
        <h3 id="welcomeMsg">Bienvenido</h3>
        <button id="logoutBtn">Cerrar sesión</button>
    </div>

    <hr>

    <div class="stats">
        <p>📚 <b>Cursos activos:</b> <span id="numCursos">0</span></p>
        <p>👤 <b>Rol:</b> Administrador</p>
        <p>🕒 <b>Último acceso:</b> <span id="fechaAcceso">--</span></p>
    </div>
    </div>

    <div class="grid-1">
        <div class="item" id="verCursosBtn">Cursos activos ✅</div>
        <div class="item" id="editarCursosBtn">Editar 📝</div>
    </div>

    <div class="courses-panel" id="coursesPanel">
        <h4>📚 Lista de Cursos</h4>
        <div class="course-grid" id="courseGrid"></div>

    <div class="controls" id="controls">
        <button id="addCourse">➕ Agregar Curso</button>
        <button id="saveChanges">💾 Guardar Cambios</button>
    </div>
    </div>

    <div class="small-footer">© 2025 Campus LMS — Modo administrador</div>
    `;
}

connectedCallback() {
    const s = this.shadowRoot;

    // Fecha de acceso
    s.getElementById("fechaAcceso").textContent = new Date().toLocaleString("es-CO");

    // Logout (simple)
    s.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        alert("Sesión cerrada");
        window.location.href = "login.html";
    });

    // Referencias
    this._verBtn = s.getElementById("verCursosBtn");
    this._editBtn = s.getElementById("editarCursosBtn");
    this._panel = s.getElementById("coursesPanel");
    this._grid = s.getElementById("courseGrid");
    this._controls = s.getElementById("controls");
    this._addBtn = s.getElementById("addCourse");
    this._saveBtn = s.getElementById("saveChanges");

    // Inicial: editar deshabilitado hasta mostrar cursos
    this._editBtn.disabled = true;
    this._editBtn.dataset.editing = "false";

    // Mostrar/ocultar panel al pulsar "Cursos activos"
    this._verBtn.addEventListener("click", () => {
        const visible = this._panel.style.display === "block";
        this._panel.style.display = visible ? "none" : "block";

      // habilita editar cuando panel visible
        this._editBtn.disabled = false;

      // Actualizar vista
        this.mostrarCursos();
    });

    // Toggle modo edición
    this._editBtn.addEventListener("click", () => {
        this._editing = !this._editing;               // estado centralizado
        this._editBtn.dataset.editing = String(this._editing);
        this._applyEditStateToCards();                // aplica clase .editing a tarjetas rebuild
        this._controls.classList.toggle("visible", this._editing); // muestra controles globales
    });

    // Agregar curso: crea uno nuevo al final y re-renderiza
    this._addBtn.addEventListener("click", () => {
        const cursos = this.obtenerCursos();
        cursos.push({ nombre: "Nuevo Curso", clave: "CLV" + (cursos.length + 1) });
        localStorage.setItem("cursos", JSON.stringify(cursos));
        this.mostrarCursos();
      // mantener modo edición activo si estaba activo
        this._applyEditStateToCards();
    });

    // Guardar cambios: lee inputs actuales y guarda
    this._saveBtn.addEventListener("click", () => {
      // recolecta datos actuales de las tarjetas
        const tarjetas = Array.from(this._grid.querySelectorAll(".course-card"));
        const nuevos = tarjetas.map(card => ({
        nombre: card.querySelector(".nombre").value.trim(),
        clave: card.querySelector(".clave").value.trim()
    }));
    localStorage.setItem("cursos", JSON.stringify(nuevos));
    alert("Cambios guardados ✅");
      // re-render para normalizar estado
    this.mostrarCursos();
      // si aún estamos en edición, reaplicar clases
    this._applyEditStateToCards();
    });

    // Aseguramos que exista un array inicial en localStorage
    if (!localStorage.getItem("cursos")) {
    const ejemplo = [
        { nombre: "Matemáticas", clave: "MAT101" },
        { nombre: "Programación", clave: "PROG1" },
        { nombre: "Historia", clave: "HIS01" }
    ];
    localStorage.setItem("cursos", JSON.stringify(ejemplo));
    }
}

  // Obtener cursos del storage
obtenerCursos() {
    return JSON.parse(localStorage.getItem("cursos")) || [];
}

  // Aplica la clase .editing a las tarjetas en la grid según this._editing
_applyEditStateToCards() {
    const tarjetas = Array.from(this._grid.querySelectorAll(".course-card"));
    tarjetas.forEach(t => {
        if (this._editing) t.classList.add("editing");
        else t.classList.remove("editing");
      // Si estamos en edición, también deshabilitamos/enable inputs readonly
        const nombre = t.querySelector(".nombre");
        const clave = t.querySelector(".clave");
        if (nombre && clave) {
        nombre.readOnly = !this._editing ? true : false;
        clave.readOnly = !this._editing ? true : false;
        }
    });
}

  // Renderiza las tarjetas (se llama cada vez que hay cambios)
mostrarCursos() {
    const s = this.shadowRoot;
    const grid = this._grid;
    const cursos = this.obtenerCursos();
    grid.innerHTML = ""; // limpio antes de renderizar

    // Por cada curso, creo una tarjeta
    cursos.forEach((curso, i) => {
        const card = document.createElement("div");
        card.className = "course-card";
      // dataset index para referencia si se necesita
        card.dataset.index = i;

      // Estructura con label a la izquierda y campo a la derecha
        card.innerHTML = `
        <div class="field">
            <span class="lbl">Nombre</span>
            <input class="nombre" value="${this._escape(curso.nombre)}" readonly>
        </div>

        <div class="field">
            <span class="lbl">Clave</span>
            <input class="clave" value="${this._escape(curso.clave)}" readonly>
        </div>

        <div class="card-actions">
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
        </div>
        `;

      // Handler eliminar: elimina por índice y re-renderiza
    card.querySelector(".delete").addEventListener("click", () => {
        const lista = this.obtenerCursos();
        lista.splice(i, 1);
        localStorage.setItem("cursos", JSON.stringify(lista));
        // re-render y mantener modo edición
        this.mostrarCursos();
        this._applyEditStateToCards();
    });

      // Handler editar: alterna readonly de inputs dentro de la misma tarjeta
    card.querySelector(".edit").addEventListener("click", () => {
        const nombre = card.querySelector(".nombre");
        const clave = card.querySelector(".clave");
        const isNowEditable = nombre.readOnly; // si estaba readonly -> true => ahora editable
        nombre.readOnly = !isNowEditable;
        clave.readOnly = !isNowEditable;
        // cuando activas edición local también aplica clase visual
        card.classList.toggle("editing", !isNowEditable);
    });

      // Si estamos en modo edición global, mostrar botones y inputs editables
    if (this._editing) {
        card.classList.add("editing");
        card.querySelector(".nombre").readOnly = false;
        card.querySelector(".clave").readOnly = false;
    }

        grid.appendChild(card);
    });

    // Actualizar contador
    s.getElementById("numCursos").textContent = cursos.length;
}

  // Helper mínimo para escapar comillas / inyección en value
_escape(str) {
    if (!str && str !== "") return "";
    return String(str).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
}

// Registrar el componente
customElements.define("admin-card", Admin);
