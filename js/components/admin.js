//-------------------------------------------------
// COMPONENTE 2 : <app-admin>
// Panel del administrador (versión con gestión de módulos)
//-------------------------------------------------

class AppAdmin extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
        <style>
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
            max-width: 900px;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.08);
            animation: fadeIn 0.8s ease-out;
            margin: 0 auto;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .panel-header { 
            display:flex; 
            justify-content:space-between; 
            align-items:center; 
            flex-wrap: wrap;
            margin-bottom:20px; 
            gap: 10px; 
        }
        .panel-header h3 {  
            margin:0; 
            font-size:1.4rem; 
            color:#00ffd5; 
            text-shadow:0 0 8px #00ffd5;
        }
        button {
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 8px;
            cursor:pointer;
            transition:0.22s;
        }
        button:hover:not(:disabled) { 
            transform:scale(1.03); 
            background:#ff6666; 
        }
        button:disabled { 
            background:#666; 
            cursor:not-allowed; 
            opacity:0.6; 
        }
        hr { 
            border:none; 
            height:1px; 
            background:rgba(255,255,255,0.08); 
            margin:20px 0; 
        }
        .grid-1 {
            display:grid;
            grid-template-columns: repeat(4, 1fr);
            gap:20px;
            margin-top:20px;
        }

        @media (max-width: 900px) {
            .grid-1 { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
            .grid-1 { grid-template-columns: 1fr; }
        }

        .item {
            background:#444;
            padding:18px;
            text-align:center;
            border-radius:8px;
            border:1px solid #666;
            cursor:pointer;
            transition: transform .25s ease, box-shadow .25s ease;
        }

        .item:hover {
            transform:translateY(-4px);
            box-shadow:0 6px 14px rgba(0,0,0,0.4);
        }
        
        .section-panel {
            display:none;
            margin-top:30px;
            background: rgba(255,255,255,0.03);
            border-radius:10px;
            padding:16px;
        }
        
        .course-grid, .teacher-grid, .module-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }

        .card {
            background: rgba(0,0,0,0.35);
            border: 1px solid rgba(0,255,213,0.12);
            border-radius: 10px;
            padding: 12px;
            transition: transform .22s ease, box-shadow .22s ease;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .card:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 10px 20px rgba(0,0,0,0.45);
        }

        .field { 
            display:flex; 
            align-items:center; 
            gap:8px; 
            justify-content:space-between;
        }
        .lbl { 
            width: 100%; 
            font-size: 0.9rem; 
            opacity: 0.9; 
            text-align:left; 
        }

        .card input, .card textarea, .card select {
            width: 100%;
            background: transparent;
            border: none;
            color: white;
            font-size: 0.98rem;
            padding: 6px 8px;
            border-bottom: 1px solid transparent;
            outline: none;
            resize: none;
        }

        .card.editing input, .card.editing textarea, .card.editing select { 
            border-bottom: 1px solid #00ffd5; 
        }

        .card img.preview {
            width:100%;
            height:100px;
            object-fit:cover;
            border-radius:6px;
            border:1px solid rgba(255,255,255,0.1);
        }

        .card-actions { 
            display:flex; 
            gap:8px; justify-content:center; 
        }
        .card-actions button { 
            display:none; 
            padding:6px 10px; 
            border-radius:8px; 
        }
        .card.editing .card-actions button { display:inline-block; }

        .delete { background:#ff4d4d; color:white; }
        .edit { background:#00ffd5; color:black; }

        .controls { 
            display:none; 
            margin-top:16px; 
            justify-content:space-between; 
            flex-wrap: wrap;
            gap: 10px;
        }
        .controls.visible { display:flex; }
        .controls button { 
            background:#00ffd5; 
            color:black; 
            padding:10px 14px; 
            border-radius:8px; 
        }

        .small-footer { 
            margin-top:28px; 
            font-size:0.85rem; 
            opacity:0.8; 
            text-align:center;  
        }

        @media (max-width: 480px) {
            :host {
                padding: 20px 10px;
            }
            .panel {
                padding: 20px;
            }
            button {
                padding: 8px 12px;
                font-size: 0.9rem;
            }
        }
        #searchContainer{margin-bottom:10px;}
        #searchInput{padding:6px;border-radius:6px;border:none;}
        .help-text {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        </style>

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
            <div class="item" id="verModulosBtn">Módulos ✏</div>
            <div class="item" id="verDocentesBtn">Docentes activos 👨‍🏫</div>
            <div class="item" id="editarCursosBtn">Editar 📝</div>
        </div>

        <!-- Panel de Cursos -->
        <div class="section-panel" id="coursesPanel">
            <h4>📚 Lista de Cursos</h4>
            <div class="course-grid" id="courseGrid"></div>
            <div class="controls" id="controlsCursos">
                <button id="addCourse">➕ Agregar Curso</button>
                <button id="saveCourses">💾 Guardar Cambios</button>
            </div>
        </div>

        <!-- Panel de Módulos -->
        <div class="section-panel" id="modulosPanel">
            <h4>✏ Gestión de Módulos por Curso</h4>
            <p class="help-text">👉 Busca un curso por su clave (ejemplo: MAT01) para ver o crear sus módulos.</p>
            <div id="searchContainer">
                <input type="text" id="searchInput" placeholder="Ejemplo: MAT01">
                <button id="searchCourseBtn">Buscar</button>
            </div>
            <div class="module-grid" id="moduloGrid"></div>
            <div class="controls" id="controlsModulos">
                <button id="addModulo">➕ Añadir Módulo</button>
                <button id="saveModulos">💾 Guardar Cambios</button>
            </div>
        </div>

        <!-- Panel de Docentes -->
        <div class="section-panel" id="teachersPanel">
            <h4>👨‍🏫 Lista de Docentes</h4>
            <div class="teacher-grid" id="teacherGrid"></div>
            <div class="controls" id="controlsDocentes">
                <button id="addTeacher">➕ Agregar Docente</button>
                <button id="saveTeachers">💾 Guardar Cambios</button>
            </div>
        </div>

        <div class="small-footer">© 2025 Campus LMS — Modo administrador</div>
        `;

        this._initElements();
        this._initEvents();
        this._initData();
    }

    //-------------------------------------------------
    // Inicialización
    //-------------------------------------------------
    _initElements() {
        const s = this.shadowRoot;
        this._fechaAcceso = s.getElementById("fechaAcceso");
        this._logoutBtn = s.getElementById("logoutBtn");
        this._verCursos = s.getElementById("verCursosBtn");
        this._editarCursos = s.getElementById("editarCursosBtn");
        this._verDocentes = s.getElementById("verDocentesBtn");
        this._verModulos = s.getElementById("verModulosBtn");
        this._panelCursos = s.getElementById("coursesPanel");
        this._panelDocentes = s.getElementById("teachersPanel");
        this._panelModulos = s.getElementById("modulosPanel");
        this._gridCursos = s.getElementById("courseGrid");
        this._gridDocentes = s.getElementById("teacherGrid");
        this._gridModulos = s.getElementById("moduloGrid");
        this._controlsCursos = s.getElementById("controlsCursos");
        this._controlsDocentes = s.getElementById("controlsDocentes");
        this._controlsModulos = s.getElementById("controlsModulos");
        this._addCourse = s.getElementById("addCourse");
        this._saveCourses = s.getElementById("saveCourses");
        this._addTeacher = s.getElementById("addTeacher");
        this._saveTeachers = s.getElementById("saveTeachers");
        this._addModulo = s.getElementById("addModulo");
        this._saveModulos = s.getElementById("saveModulos");
        this._searchInput = s.getElementById("searchInput");
        this._searchCourseBtn = s.getElementById("searchCourseBtn");
    }

    //-------------------------------------------------
    // Eventos principales
    //-------------------------------------------------
    _initEvents() {
        this._logoutBtn.addEventListener("click", () => {
            document.querySelector("#app").innerHTML = "<user-card></user-card>";    
        });

        this._verCursos.addEventListener("click", () => {
            this._panelCursos.style.display = "block";
            this._panelDocentes.style.display = "none";
            this._panelModulos.style.display = "none";
            this.mostrarCursos();
        });

        this._verDocentes.addEventListener("click", () => {
            this._panelDocentes.style.display = "block";
            this._panelCursos.style.display = "none";
            this._panelModulos.style.display = "none";
            this.mostrarDocentes();
        });

        this._verModulos.addEventListener("click", () => {
            this._panelModulos.style.display = "block";
            this._panelCursos.style.display = "none";
            this._panelDocentes.style.display = "none";
            this._gridModulos.innerHTML = "<p>ℹ️ Ingresa una clave y presiona Buscar.</p>";
            this._controlsModulos.classList.remove("visible");
        });

        this._editarCursos.addEventListener("click", () => {
            this._editing = !this._editing;
            this._applyEditMode();
        });

        // Cursos y Docentes
        this._addCourse.addEventListener("click", () => this.agregarCurso());
        this._saveCourses.addEventListener("click", () => this.guardarCambiosCursos());
        this._addTeacher.addEventListener("click", () => this.agregarDocente());
        this._saveTeachers.addEventListener("click", () => this.guardarCambiosDocentes());

        // Módulos
        this._searchCourseBtn.addEventListener("click", () => this.buscarCursoPorClave());
        this._addModulo.addEventListener("click", () => this.agregarModulo());
        this._saveModulos.addEventListener("click", () => this.guardarModulos());
    }

    //-------------------------------------------------
    // Datos iniciales
    //-------------------------------------------------
    _initData() {
        this._fechaAcceso.textContent = new Date().toLocaleString("es-CO");

        if (!localStorage.getItem("docentes")) {
            localStorage.setItem("docentes", JSON.stringify([
                { nombre: "Rosa", clave: "ROS23", materia: "Biología", imagen: "" },
                { nombre: "Melano", clave: "ANO23", materia: "Sociales", imagen: "" }
            ]));
        }

        if (!localStorage.getItem("cursos")) {
            localStorage.setItem("cursos", JSON.stringify([
                { nombre: "Álgebra", clave: "MAT01", descripcion: "Ecuaciones y funciones", imagen: "", docente: "", modulos: [] },
                { nombre: "Historia Universal", clave: "HIS01", descripcion: "Desde la Edad Antigua", imagen: "", docente: "", modulos: [] }
            ]));
        }
    }
    //-------------------------------------------------
    // Utilidades generales
    //-------------------------------------------------
    obtener(tipo) { return JSON.parse(localStorage.getItem(tipo)) || []; }
    guardar(tipo, data) { localStorage.setItem(tipo, JSON.stringify(data));}

    _applyEditMode() {
        const allCards = this.shadowRoot.querySelectorAll(".card");
        allCards.forEach(c => {
            c.classList.toggle("editing", this._editing);
            c.querySelectorAll("input, textarea, select").forEach(i => i.readOnly = !this._editing);
        });

        this._controlsCursos.classList.toggle("visible", this._editing);
        this._controlsDocentes.classList.toggle("visible", this._editing);

        alert(editing ? "✏️ Modo edición activado" : "🔒 Modo edición desactivado");
    }

    //-------------------------------------------------
    // Cursos
    //-------------------------------------------------
    mostrarCursos() {
        const cursos = this.obtener("cursos");
        const docentes = this.obtener("docentes");
        this._gridCursos.innerHTML = "";

        cursos.forEach((curso, i) => {
            const card = document.createElement("div");
            card.className = "card";

            const opciones = docentes.map(d => `<option value="${d.nombre}" ${d.nombre === curso.docente ? "selected" : ""}>${d.nombre}</option>`).join("");

            card.innerHTML = `
                <div class="field"><span class="lbl">Nombre</span><input class="nombre" value="${curso.nombre}" readonly></div>
                <div class="field"><span class="lbl">Clave</span><input class="clave" value="${curso.clave}" readonly></div>
                <div class="field"><span class="lbl">Descripción</span><textarea class="descripcion" rows="2" readonly>${curso.descripcion}</textarea></div>
                <div class="field"><span class="lbl">Docente</span><select class="docente">${opciones}</select></div>
                <div class="field"><span class="lbl">Imagen</span>
                    <img class="preview" src="${curso.imagen || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}">
                    <input type="file" accept="image/*" class="fileInput" style="display:none">
                </div>
                <div class="card-actions">
                    <button class="delete">Eliminar</button>
                </div>
            `;

            const fileInput = card.querySelector(".fileInput");
            const preview = card.querySelector(".preview");
            preview.addEventListener("click", () => { if (this._editing) fileInput.click();});
            fileInput.addEventListener("change", e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => preview.src = reader.result;
                    reader.readAsDataURL(file);
                } 
            });

            card.querySelector(".delete").addEventListener("click", () => {
                const lista = this.obtener("cursos");
                lista.splice(i, 1);
                this.guardar("cursos", lista);
                this.mostrarCursos();
            });

            this._gridCursos.appendChild(card);
        });

        this.shadowRoot.getElementById("numCursos").textContent = cursos.length;
    }

    agregarCurso() {
        const cursos = this.obtener("cursos");
        cursos.push({ nombre: "Nuevo Curso", clave: "CUR" + (cursos.length+1), descripcion: "", imagen: "", docente: "", modulos: [] });
        this.guardar("cursos", cursos);
        this.mostrarCursos();
        alert("✅ Curso agregado correctamente. ¡Recuerda guardar los cambios!");
    }

    guardarCambiosCursos() {
        const cards = this._gridCursos.querySelectorAll(".card");
        const nuevos = [];
        cards.forEach(card => {
            nuevos.push({
                nombre: card.querySelector(".nombre").value,
                clave: card.querySelector(".clave").value,
                descripcion: card.querySelector(".descripcion").value,
                docente: card.querySelector(".docente").value,
                imagen: card.querySelector(".preview").src,
                modulos: [] // se mantienen por clave
            });
        });
        this.guardar("cursos", nuevos);
        alert("💾 Cambios en cursos guardados correctamente");
    }

    //-------------------------------------------------
    // Docentes
    //-------------------------------------------------
    mostrarDocentes() {
        const docentes = this.obtener("docentes");
        this._gridDocentes.innerHTML = "";

        docentes.forEach((docente, i) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="field"><span class="lbl">Nombre</span><input class="nombre" value="${docente.nombre}" readonly></div>
                <div class="field"><span class="lbl">Clave</span><input class="clave" value="${docente.clave}" readonly></div>
                <div class="field"><span class="lbl">Materia</span><input class="materia" value="${docente.materia}" readonly></div>
                <div class="field"><span class="lbl">Imagen</span>
                    <img class="preview" src="${docente.imagen || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}">
                    <input type="file" accept="image/*" class="fileInput" style="display:none">
                </div>
                <div class="card-actions">
                    <button class="delete">Eliminar</button>
                </div>
            `;
            const fileInput = card.querySelector(".fileInput");
            const preview = card.querySelector(".preview");
            preview.addEventListener("click", () => { if (this._editing) fileInput.click();});
            fileInput.addEventListener("change", e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => preview.src = reader.result;
                    reader.readAsDataURL(file);
                }
            });

            card.querySelector(".delete").addEventListener("click", () => {
                const lista = this.obtener("docentes");
                lista.splice(i, 1);
                this.guardar("docentes", lista);
                this.mostrarDocentes();
            });

            this._gridDocentes.appendChild(card);
        });
    }

    agregarDocente() {
        const docentes = this.obtener("docentes");
        docentes.push({ nombre: "Nuevo Docente", clave: "DOC" + (docentes.length+1), materia: "", imagen: "" });
        this.guardar("docentes", docentes);
        this.mostrarDocentes();
        alert("✅ Docente agregado correctamente. ¡Recuerda guardar los cambios!");
    }

    guardarCambiosDocentes() {
        const cards = this._gridDocentes.querySelectorAll(".card");
        const nuevos = [];
        cards.forEach(card => {
            nuevos.push({
                nombre: card.querySelector(".nombre").value,
                clave: card.querySelector(".clave").value,
                materia: card.querySelector(".materia").value,
                imagen: card.querySelector(".preview").src
            });
        });
        this.guardar("docentes", nuevos);
        alert("💾 Cambios en docentes guardados correctamente");
    }

    //-------------------------------------------------
    // Módulos
    //-------------------------------------------------
    buscarCursoPorClave() {
        const clave = this._searchInput.value.trim().toUpperCase();
        if (!clave) {
            alert("⚠️ Por favor, ingresa una clave de curso.");
            return;
        }

        const cursos = this.obtener("cursos");
        const curso = cursos.find(c => c.clave === clave);

        if (!curso) {
            alert(`❌ No se encontró ningún curso con la clave "${clave}"`);
            this._gridModulos.innerHTML = "";
            this._controlsModulos.classList.remove("visible");
            return;
        }

        alert(`✅ Curso encontrado: ${curso.nombre}`);
        this.cursoActual = curso;
        this._controlsModulos.classList.add("visible");
        this.mostrarModulos();
    }

    mostrarModulos() {
        const curso = this.cursoActual;
        this._gridModulos.innerHTML = "";

        if (!curso.modulos || curso.modulos.length === 0) {
            this._gridModulos.innerHTML = `<p>ℹ️ Este curso no tiene módulos aún. Usa "Añadir Módulo" para crear uno nuevo.</p>`;
            return;
        }

        curso.modulos.forEach((mod, index) => {
            const card = document.createElement("div");
            card.className = "card editing";
            card.innerHTML = `
                <div class="field"><span class="lbl">Título</span><input class="titulo" value="${mod.titulo}"></div>
                <div class="field"><span class="lbl">Descripción</span><textarea class="descripcion" rows="2">${mod.descripcion}</textarea></div>
                <div class="card-actions">
                    <button class="delete" data-index="${index}">🗑 Eliminar</button>
                </div>
            `;
            card.querySelector(".delete").addEventListener("click", () => this.eliminarModulo(index));
            this._gridModulos.appendChild(card);
        });
    }

    agregarModulo() {
        if (!this.cursoActual) {
            alert("⚠️ Primero busca un curso para poder agregar módulos.");
            return;
        }

        this.cursoActual.modulos = this.cursoActual.modulos || [];
        this.cursoActual.modulos.push({
            titulo: "Nuevo módulo",
            descripcion: "Descripción del módulo..."
        });

        this.mostrarModulos();
        alert("✅ Módulo añadido correctamente (recuerda guardar los cambios).");
    }

    eliminarModulo(index) {
        if (!confirm("¿Seguro que deseas eliminar este módulo?")) return;
        this.cursoActual.modulos.splice(index, 1);
        this.mostrarModulos();
    }

    guardarModulos() {
        if (!this.cursoActual) {
            alert("⚠️ No hay curso seleccionado.");
            return;
        }

        const cards = this._gridModulos.querySelectorAll(".card");
        const modulosActualizados = [];

        cards.forEach(card => {
            modulosActualizados.push({
                titulo: card.querySelector(".titulo").value,
                descripcion: card.querySelector(".descripcion").value
            });
        });

        this.cursoActual.modulos = modulosActualizados;

        // Guardar cambios en localStorage
        const cursos = this.obtener("cursos");
        const index = cursos.findIndex(c => c.clave === this.cursoActual.clave);
        if (index >= 0) {
            cursos[index] = this.cursoActual;
            this.guardar("cursos", cursos);
        }

        alert("💾 Módulos guardados correctamente.");
    }
}

customElements.define("app-admin", AppAdmin);
