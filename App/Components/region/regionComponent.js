console.log('🔄 regionComponent.js cargando...');

import './regregion.js';
import './lstregion.js';
console.log('✅ Sub-componentes de region importados');

export class RegionComponent extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 RegionComponent constructor');
        this.render();
    }

    render() {
        this.innerHTML = `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active mnuregion" href="#" data-verocultar='["#regRegion",["#lstRegion"]]'>Registrar Región</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mnuregion" href="#" data-verocultar='["#lstRegion",["#regRegion"]]'>Listado de Regiones</a>
                </li>
            </ul>
            <div class="container mt-3" id="regRegion" style="display:block;">
                <reg-region></reg-region>
            </div>
            <div class="container mt-3" id="lstRegion" style="display:none;">
                <lst-region></lst-region>
            </div>
        `;
        console.log('✅ RegionComponent HTML inyectado');

        this.querySelectorAll(".mnuregion").forEach((val) => {
            val.addEventListener("click", (e) => {
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = this.querySelector(data[0]);
                if (cardVer) cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = this.querySelector(card);
                    if (cardActual) cardActual.style.display = 'none';
                });
                this.querySelectorAll(".mnuregion").forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                e.preventDefault();
            });
        });
    }
}

customElements.define("region-component", RegionComponent);
console.log('✅ RegionComponent definido');
