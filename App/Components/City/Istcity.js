// Agregado: Importación de la función getcitys
import { getcitys } from '../../../Apis/city/cityApi.js';

export class LstCity extends HTMLElement {
  constructor() {
    super();
    this.render();
    // Agregado: Llamar a loadcitys para cargar los datos automáticamente
    this.loadcitys();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/city/cityStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Citys  <!-- Modificado: Cambiado de "productos" a "Citys" -->
            </div>
            <div class="card-body">
                <!-- Modificado: Reemplazado el contenido estático con una tabla dinámica -->
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">RegionId</th>
                        </thead>
                        <tbody id="cityListBody">
                            <!-- Los citys se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  // Agregado: Nuevo método para cargar y mostrar los citys desde la API
  async loadcitys() {
    const cityListBody = this.querySelector('#cityListBody');
    cityListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getcitys(); // Llama a la API para obtener los citys
      if (response && response.status === 200) {
        const citys = await response.json(); // Obtiene los datos JSON
        if (citys.length > 0) {
          citys.forEach(city => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${city.id}</th>
              <td>${city.nombre || ''}</td>
              <td>${city.region || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${city.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${city.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            cityListBody.appendChild(row);
          });
        } else {
          cityListBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay citys registrados.</td></tr>`;
        }
      } else {
        console.error('Error al cargar los citys:', response ? response.statusText : 'Respuesta indefinida');
        cityListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar los citys.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de citys:', error);
      cityListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error de red al cargar los citys.</td></tr>`;
    }
  }
}

customElements.define("lst-city", LstCity);