class Admin extends HTMLElement {
constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Un único innerHTML con estilos y estructura.
    this.shadowRoot.innerHTML = `
    <style>
        :host {
            
            display: block;
            font-family: "Poppins", sans-serif;
            color: #fff;
            min-height: 100vh;
            box-sizing: border-box;
            padding: 40px 20px;
            background: linear-gradient(135deg, #0a0a0a, #1c1c1c);
        
        }

        .panel {
        
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px 40px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.08);
            animation: fadeIn 0.8s ease-out;
            margin: 0 auto;
        
        }

        @keyframes fadeIn {
        
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        
        }

        .panel-header {
        
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        
        }

        .panel-header h3 {
        
            margin: 0;
            font-size: 1.5rem;
            letter-spacing: 0.5px;
            color: #00ffd5;
            text-shadow: 0 0 10px #00ffd5;
        
        }

        button {
        
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.95rem;
            cursor: pointer;
            transition: 0.3s;
        
        }

        button:hover {
        
            background-color: #ff6666;
            transform: scale(1.05);
        
        }

        hr {
        
            border: none;
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 20px 0;
        
        }

        .stats { text-align: left; }
        .stats p { font-size: 1.1rem; margin-bottom: 10px; }
        .stats span { color: #00ffd5; font-weight: bold; }

        .small-footer {
        
            margin-top: 40px;
            font-size: 0.85rem;
            opacity: 0.8;
            text-align: center;
        
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

    <div class="small-footer">© 2025 Campus LMS — Modo administrador</div>
    `;
}

connectedCallback() {
    // Inicializaciones seguras aquí.
    const shadow = this.shadowRoot;

    // Poner fecha de último acceso 
    const fechaEl = shadow.getElementById("fechaAcceso");
    if (fechaEl) {
        const ahora = new Date();
      // ejemplo con locale ES
        fechaEl.textContent = ahora.toLocaleString("es-CO");
    }

    //Simular número de cursos 
    const numCursosEl = shadow.getElementById("numCursos");
    if (numCursosEl) numCursosEl.textContent = "6";

    // Añadir listener al botón de logout
    const logoutBtn = shadow.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
        //  mostrar alerta y actualizar texto
        alert("Sesión cerrada");
        // podrías despachar un evento para la app:
        this.dispatchEvent(new CustomEvent("admin-logout", { bubbles: true, composed: true }));
        window.location.href = "login.html";
    });
    }

    //  personalizar el saludo por atributo:
    const welcome = shadow.getElementById("welcomeMsg");
    const nombre = this.getAttribute("name") || "Administrador";
    if (welcome) welcome.textContent = `Bienvenido, ${nombre}`;
}

disconnectedCallback() {
    // limpia listeners si añadiste globales (aquí no hay)
    }
}

customElements.define("admin-card", Admin);
