console.log('🔄 contactoComponent.js cargando...');

// Importa sub-componentes
import './regContacto.js';
import './lstContacto.js';
console.log('✅ Sub-componentes de contacto importados');

export class ContactoComponent extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 ContactoComponent constructor');
        this.render();
    }

    render() {
        console.log('🎨 ContactoComponent renderizando...');
        this.innerHTML = `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active mnucontacto" href="#" data-verocultar='["#regContacto",["#lstContacto"]]'>Registrar Contacto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mnucontacto" href="#" data-verocultar='["#lstContacto",["#regContacto"]]'>Listado de contactos</a>
                </li>
            </ul>
            <div class="container mt-3" id="regContacto" style="display:block;">
                <reg-contacto></reg-contacto>
            </div>
            <div class="container mt-3" id="lstContacto" style="display:none;">
                <lst-contacto></lst-contacto>
            </div>
        `;
        console.log('✅ ContactoComponent HTML inyectado');

        // Event listeners para pestañas
        this.querySelectorAll(".mnucontacto").forEach((val) => {
            val.addEventListener("click", (e) => {
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = this.querySelector(data[0]);
                if (cardVer) cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = this.querySelector(card);
                    if (cardActual) cardActual.style.display = 'none';
                });
                // Actualiza active
                this.querySelectorAll(".mnucontacto").forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                e.preventDefault();
            });
        });
    }
}

customElements.define("contacto-component", ContactoComponent);
console.log('✅ ContactoComponent definido');
