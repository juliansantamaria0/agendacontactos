// Agregado: Importación de la función getContacts
import { getContacts } from '../../../Apis/contact/contactApi.js';

export class LstContacto extends HTMLElement {
  constructor() {
    super();
    this.render();
    // Agregado: Llamar a loadContacts para cargar los datos automáticamente
    this.loadContacts();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/contacto/contactoStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Contactos  <!-- Modificado: Cambiado de "productos" a "Contactos" -->
            </div>
            <div class="card-body">
                <!-- Modificado: Reemplazado el contenido estático con una tabla dinámica -->
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Email</th>
                                <th scope="col">Residencia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="contactListBody">
                            <!-- Los contactos se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  // Agregado: Nuevo método para cargar y mostrar los contactos desde la API
  async loadContacts() {
    const contactListBody = this.querySelector('#contactListBody');
    contactListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getContacts(); // Llama a la API para obtener los contactos
      if (response && response.status === 200) {
        const contacts = await response.json(); // Obtiene los datos JSON
        if (contacts.length > 0) {
          contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${contact.id}</th>
              <td>${contact.nombreContacto || ''}</td>
              <td>${contact.apellidoContacto || ''}</td>
              <td>${contact.nroCelular || ''}</td>
              <td>${contact.emailContacto || ''}</td>
              <td>${contact.nroResidencia || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${contact.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${contact.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            contactListBody.appendChild(row);
          });
        } else {
          contactListBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay contactos registrados.</td></tr>`;
        }
      } else {
        console.error('Error al cargar los contactos:', response ? response.statusText : 'Respuesta indefinida');
        contactListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar los contactos.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de contactos:', error);
      contactListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error de red al cargar los contactos.</td></tr>`;
    }
  }
}

customElements.define("lst-contacto", LstContacto);
