//  Importación de la función getCompanies (corregido)
import { getCompanies } from '../../../Apis/companies/companiesApi.js';

export class Lstcompanies extends HTMLElement {
  constructor() {
    super();
    this.render();
    //  Llamar a loadCompanies para cargar los datos automáticamente 
    this.loadCompanies();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/companies/companiesStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Compañías
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre Compañía</th>
                                <th scope="col">Apellido Contacto</th>
                                <th scope="col">Celular Contacto</th>
                                <th scope="col">Email Contacto</th>
                                <th scope="col">Nro Residencia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="companiesListBody">
                            <!-- Las compañías se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  //  Nuevo método para cargar y mostrar los companies desde la API (corregido)
  async loadCompanies() {
    const companiesListBody = this.querySelector('#companiesListBody');
    companiesListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getCompanies(); // Llama a la API para obtener los companies (corregido)
      if (response && response.status === 200) {
        const companiesData = await response.json(); // Obtiene los datos JSON (renombrado)
        if (companiesData.length > 0) {
          companiesData.forEach(companies => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${companies.id}</th>
              <td>${companies.nombrecompanies || ''}</td>
              <td>${companies.apellidocompanies || ''}</td>
              <td>${companies.nroCelular || ''}</td>
              <td>${companies.emailcompanies || ''}</td>
              <td>${companies.nroResidencia || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${companies.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${companies.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            companiesListBody.appendChild(row);
          });
        } else {
          companiesListBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay compañías registradas.</td></tr>`;
        }
      } else {
        console.error('Error al cargar las compañías:', response ? response.statusText : 'Respuesta indefinida');
        companiesListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar las compañías.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de compañías:', error); 
      companiesListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error de red al cargar las compañías.</td></tr>`;
    }
  }
}

customElements.define("lst-companies", Lstcompanies);
