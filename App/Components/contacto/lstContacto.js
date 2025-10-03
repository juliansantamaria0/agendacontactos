console.log('🔄 lstContacto.js cargando...');

import {getContacts} from '../../../Apis/contact/contactApi.js';
import './contactoStyle.css';

export class LstContacto extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 LstContacto constructor');
        this.render();
        this.loadContacts();
    }

    render() {
        console.log('🎨 LstContacto renderizando...');
        this.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5>Listado de Contactos</h5>
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Celular</th>
                                <th>Email</th>
                                <th>Residencia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyContactos">
                            <!-- Datos se cargan dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        console.log('✅ LstContacto HTML inyectado');
    }

    async loadContacts() {
        console.log('📥 Cargando contactos...');
        const response = await getContacts();
        if (response && response.ok) {
            const data = await response.json();
            const tbody = this.querySelector('#tbodyContactos');
            tbody.innerHTML = '';  // Limpia tabla
            data.forEach(contacto => {
                const row = `
                    <tr>
                        <td>${contacto.id}</td>
                        <td>${contacto.nombreContacto}</td>
                        <td>${contacto.apellidoContacto}</td>
                        <td>${contacto.nroCelular}</td>
                        <td>${contacto.emailContacto}</td>
                        <td>${contacto.nroResidencia}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editContact(${contacto.id}, ${JSON.stringify(contacto)})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteContact(${contacto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
            console.log('✅ Contactos cargados:', data.length);
        } else {
            console.error('❌ Error al cargar contactos');
            this.querySelector('#tbodyContactos').innerHTML = '<tr><td colspan="7" class="text-center">Error al cargar datos</td></tr>';
        }
    }
}

// Función global para eliminar desde listado
window.deleteContact = async (id) => {
    if (confirm('¿Eliminar este contacto?')) {
        const {deleteContact} = await import('../../../Apis/contact/contactApi.js');
        const response = await deleteContact(id);
        if (response && response.ok) {
            alert('Contacto eliminado');
            const lstComponent = document.querySelector('lst-contacto');
            if (lstComponent) lstComponent.loadContacts();
        } else {
            alert('Error al eliminar');
        }
    }
};

customElements.define("lst-contacto", LstContacto);
console.log('✅ LstContacto definido');
