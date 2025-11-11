//-------------------------------------------------
// COMPONENTE 1 : <app-login>
// Panel de logeo de el administrador
//-------------------------------------------------
class AppLogin extends HTMLElement {
    constructor (){
        super();
        this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
    this.render();
    }

render() {
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
            width: 90%;
            max-width: 350px;
            text-align: center;
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }

        h3 {
            margin-bottom: 1.5rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        input {
            width: 100%;
            padding: 12px;
            margin-bottom: 12px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 1rem;
            transition: background 0.3s, transform 0.2s;
        }

        input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.02);
        }

        input::placeholder {    color: rgba(255,255,255,0.7);   }

        button {
            width: 100%;
            padding: 12px;
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
            font-size: 0.9rem;
        }

        /* 📱 Responsividad */
            @media (max-width: 768px) {
            :host {
                background: linear-gradient(160deg, #004080, #0099cc);
                padding: 1rem;
            }

            .login-box {
                width: 100%;
                max-width: 320px;
                padding: 1.5rem;
            }

            h3 {
                font-size: 1.1rem;
            }

            input, button {
                font-size: 0.95rem;
            }
        }

        @media (max-width: 480px) {
            .login-box {
                border-radius: 10px;
                padding: 1rem;
            }

            h3 {
                font-size: 1rem;
            }

            input, button {
                padding: 10px;
                font-size: 0.9rem;
            }
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

    //si no hay admin, esta este por defecto
    if (!localStorage.getItem("administrators")){
        const admin = [
            { email: "admin@campus.com", password: "12345", nombre: "Administrador principal"}
        ];
        localStorage.setItem("administrators", JSON.stringify(admin));
        }
    


    //Referencias de los campos del fomulario
    const email = this.shadowRoot.querySelector("#email");
    const pass = this.shadowRoot.querySelector("#password");
    const btn = this.shadowRoot.querySelector("#loginBtn");

    //funcionalidad del boton 
    btn.addEventListener("click", () => {
        const emailVal = email.value.trim();
        const passVal = pass.value.trim();
        const admins = JSON.parse(localStorage.getItem("administrators")) || [];

    //verificasion si existe el admin
    const found = admins.find(a => a.email === emailVal && a.password === passVal);

    if (found) {
         //si es correcto, se carga el apatado de el administrador 
        document.querySelector("#app").innerHTML = "<app-admin></app-admin>";
    } else {
        alert("Credenciales incorrectas. Intente nuevamente");
    }
    });
}
}

customElements.define("app-login", AppLogin);