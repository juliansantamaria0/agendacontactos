console.log('🔄 regcountry.js cargando...');

import CountriesModel from '../../../Models/countriesModel.js';
import {postCountry, patchCountry, deleteCountry} from '../../../Apis/countries/countriesApi.js';
import './countryStyle.css';

export class RegCountry extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 RegCountry constructor');
        this.idEdit = null;
        this.render();
        this.bindEvents();
    }

    render() {
        this.innerHTML = `
            <div class="card">
                <div class="card-header"><h5>Registrar/Editar País</h5></div>
                <div class="card-body">
                    <form id="formCountry">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <button type="button" id="btnCancelar" class="btn btn-secondary">Cancelar</button>
                        <button type="button" id="btnEliminar" class="btn btn-danger" style="display:none;">Eliminar</button>
                    </form>
                </div>
            </div>
        `;
        this.resetForm();
    }

    bindEvents() {
        this.querySelector('#formCountry').addEventListener('submit', (e) => this.handleSubmit(e));
        this.querySelector('#btnCancelar').addEventListener('click', () => this.resetForm());
        this.querySelector('#btnEliminar').addEventListener('click', () => this.handleDelete());
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = { nombre: this.querySelector('#nombre').value };

        let response;
        if (this.idEdit) {
            response = await patchCountry(data, this.idEdit);
            if (response && response.ok) {
                alert('País actualizado');
                this.resetForm();
                this.loadList();
            }
        } else {
            response = await postCountry(data);
            if (response && response.ok) {
                alert('País registrado');
                this.resetForm();
                this.loadList();
            }
        }
    }

    async handleDelete() {
        if (confirm('¿Eliminar?')) {
            const response = await deleteCountry(this.idEdit);
            if (response && response.ok) {
                alert('Eliminado');
                this.resetForm();
                this.loadList();
            }
        }
    }

    editCountry(id, data) {
        this.idEdit = id;
        this.querySelector('#nombre').value = data.nombre || '';
        this.querySelector('#btnEliminar').style.display = 'inline-block';
    }

    resetForm() {
        this.idEdit = null;
        this.querySelector('#nombre').value = CountriesModel.nombre;
        this.querySelector('#btnEliminar').style.display = 'none';
    }

    loadList() {
        const lstContainer = document.querySelector('#lstCountry');
        if (lstContainer && lstContainer.style.display !== 'none') {
            const lstComponent = lstContainer.querySelector('lst-country');
            if (lstComponent) lstComponent.loadCountries();
        }
    }
}

customElements.define("reg-country", RegCountry);
console.log('✅ RegCountry definido');

window.editCountry = (id, data) => {
    const regComponent = document.querySelector('reg-country');
    if (regComponent) regComponent.editCountry(id, data);
};
