// Notificación de conexión
//alert("Conexión exitosa 😎");

export class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #003366, #006699);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .login-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 15px;
          width: 320px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1rem;
        }

        input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        button {
          width: 100%;
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

        .error {
          display: none;
          color: #ff5c5c;
          margin-top: 10px;
        }
      </style>

      <div class="login-box">
        <h3>Ingreso Administrativo</h3>
        <input type="email" id="email" placeholder="Correo electrónico" required>
        <input type="password" id="password" placeholder="Contraseña" required>
        <button id="loginBtn">Ingresar</button>
        <p id="errorMsg" class="error">Credenciales incorrectas</p>
      </div>
    `;
  }

  connectedCallback() {
    this.init();
  }

  init() {
    // admin por defecto si no existe
    if (!localStorage.getItem("administradores")) {
      const admins = [
        { email: "admin@campus.com", password: "12345", nombre: "Administrador Principal" }
      ];
      localStorage.setItem("administradores", JSON.stringify(admins));
    }

    const btn = this.shadowRoot.querySelector("#loginBtn");
    btn.addEventListener("click", () => this.login());
  }

  login() {
    const email = this.shadowRoot.querySelector("#email").value.trim();
    const password = this.shadowRoot.querySelector("#password").value.trim();
    const errorMsg = this.shadowRoot.querySelector("#errorMsg");

    const admins = JSON.parse(localStorage.getItem("administradores")) || [];
    const admin = admins.find(u => u.email === email && u.password === password);

    if (admin) {
      localStorage.setItem("usuarioActivo", JSON.stringify(admin));

      // Emitimos un evento para que app.js sepa que hubo login
      this.dispatchEvent(new CustomEvent("login-success", { detail: admin, bubbles: true }));
      window.location.href = "admin.html";
      
    } else {
      errorMsg.style.display = "block";
    }
  }
}

customElements.define("login-style", Login);
