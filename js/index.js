class UserCard extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: Arial, sans-serif;
        }

        .grid-1 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 20px;
            padding: 10px;
            color: white;
            margin: 20px;
        }

        .item {
            background: #444;
            padding: 20px;
            text-align: center;
            border-radius: 6px;
            border: 1px solid #888;
        }
    </style>

    

    <div class="grid-1">
        <div class="item">Elemento 1</div>
        <div class="item">Elemento 2</div>
        <div class="item">Elemento 3</div>
    </div>
    `;
    
}
}


customElements.define("user-card", UserCard);
