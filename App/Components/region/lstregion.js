// Agregado: Importación de la función getregionss
import { getregionss } from '../../../Apis/regions/regionsApi';

export class Lstregionso extends HTMLElement {
  constructor() {
    super();
    this.render();
    // Agregado: Llamar a loadregionss para cargar los datos automáticamente
    this.loadregionss();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/regionso/regionsoStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de regionsos  <!-- Modificado: Cambiado de "productos" a "regionsos" -->
            </div>
            <div class="card-body">
                <!-- Modificado: Reemplazado el contenido estático con una tabla dinámica -->
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">PaisId</th>
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

  // Agregado: Nuevo método para cargar y mostrar los regionsos desde la API
  async loadregionss() {
    const regionsListBody = this.querySelector('#regionsListBody');
    regionsListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getregionss(); // Llama a la API para obtener los regionsos
      if (response && response.status === 200) {
        const regionss = await response.json(); // Obtiene los datos JSON
        if (regionss.length > 0) {
          regionss.forEach(regions => {
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
          regionsListBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay regionsos registrados.</td></tr>`;
        }
      } else {
        console.error('Error al cargar los regionsos:', response ? response.statusText : 'Respuesta indefinida');
        regionsListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar los regionsos.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de regionsos:', error);
      regionsListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error de red al cargar los regionsos.</td></tr>`;
    }
  }
}

customElements.define("lst-regionso", Lstregionso)