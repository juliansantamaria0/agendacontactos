console.log('🔄 countryComponent.js cargando...');

import './regcountry.js';
import './lstcountry.js';
console.log('✅ Sub-componentes de country importados');

export class CountryComponent extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 CountryComponent constructor');
        this.render();
    }

    render() {
        console.log('🎨 CountryComponent renderizando...');
        this.innerHTML = `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active mnucountry" href="#" data-verocultar='["#regCountry",["#lstCountry"]]'>Registrar País</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mnucountry" href="#" data-verocultar='["#lstCountry",["#regCountry"]]'>Listado de Países</a>
                </li>
            </ul>
            <div class="container mt-3" id="regCountry" style="display:block;">
                <reg-country></reg-country>
            </div>
            <div class="container mt-3" id="lstCountry" style="display:none;">
                <lst-country></lst-country>
            </div>
        `;
        console.log('✅ CountryComponent HTML inyectado');

        this.querySelectorAll(".mnucountry").forEach((val) => {
            val.addEventListener("click", (e) => {
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = this.querySelector(data[0]);
                if (cardVer) cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = this.querySelector(card);
                    if (cardActual) cardActual.style.display = 'none';
                });
                this.querySelectorAll(".mnucountry").forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                e.preventDefault();
            });
        });
    }
}

customElements.define("country-component", CountryComponent);
console.log('✅ CountryComponent definido');
