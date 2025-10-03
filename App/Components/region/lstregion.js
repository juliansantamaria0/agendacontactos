//  Importación de la función getRegions (corregido)
import { getRegions } from '../../../Apis/regions/regionsApi.js';

export class Lstregions extends HTMLElement {
  constructor() {
    super();
    this.render();
    //  Llamar a loadRegions para cargar los datos automáticamente (corregido)
    this.loadRegions();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/region/regionStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Regiones
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">ID de País</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="regionsListBody">
                            <!-- Las regiones se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  //  Nuevo método para cargar y mostrar los regions desde la API (corregido)
  async loadRegions() {
    const regionsListBody = this.querySelector('#regionsListBody');
    regionsListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getRegions(); // Llama a la API para obtener los regions (corregido)
      if (response && response.status === 200) {
        const regionsData = await response.json(); // Obtiene los datos JSON (renombrado)
        if (regionsData.length > 0) {
          regionsData.forEach(regions => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${regions.id}</th>
              <td>${regions.nombre || ''}</td>
              <td>${regions.PaisId || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${regions.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${regions.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            regionsListBody.appendChild(row);
          });
        } else {
          regionsListBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay regiones registradas.</td></tr>`;
        }
      } else {
        console.error('Error al cargar las regiones:', response ? response.statusText : 'Respuesta indefinida');
        regionsListBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar las regiones.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de regiones:', error); 
      regionsListBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error de red al cargar las regiones.</td></tr>`;
    }
  }
}

customElements.define("lst-regions", Lstregions);
