console.log('🔄 lstcountry.js cargando...');

import {getCountries} from '../../../Apis/countries/countriesApi.js';
import './countryStyle.css';

export class LstCountry extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 LstCountry constructor');
        this.render();
        this.loadCountries();
    }

    render() {
        this.innerHTML = `
            <div class="card">
                <div class="card-header"><h5>Listado de Países</h5></div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr></thead>
                        <tbody id="tbodyCountries"></tbody>
                    </table>
                </div>
            </div>
        `;
    }

    async loadCountries() {
        const response = await getCountries();
        if (response && response.ok) {
            const data = await response.json();
            const tbody = this.querySelector('#tbodyCountries');
            tbody.innerHTML = '';
            data.forEach(country => {
                tbody.innerHTML += `
                    <tr>
                        <td>${country.id}</td>
                        <td>${country.nombre}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editCountry(${country.id}, ${JSON.stringify(country)})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteCountry(${country.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            this.querySelector('#tbodyCountries').innerHTML = '<tr><td colspan="3">Error al cargar</td></tr>';
        }
    }
}

window.deleteCountry = async (id) => {
    if (confirm('¿Eliminar?')) {
        const {deleteCountry} = await import('../../../Apis/countries/countriesApi.js');
        const response = await deleteCountry(id);
        if (response && response.ok) {
            alert('Eliminado');
            const lstComponent = document.querySelector('lst-country');
            if (lstComponent) lstComponent.loadCountries();
        }
    }
};

customElements.define("lst-country", LstCountry);
console.log('✅ LstCountry definido');
