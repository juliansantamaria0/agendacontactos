// Importación de la función getCities (corregido)
import { getCities } from '../../../Apis/cities/citiesApi.js';

export class LstCity extends HTMLElement {
  constructor() {
    super();
    this.render();
    // Llamar a loadCities para cargar los datos automáticamente (corregido)
    this.loadCities();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/City/cityStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Ciudades
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">ID de Región</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="cityListBody">
                            <!-- Las ciudades se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  // Nuevo método para cargar y mostrar los cities desde la API (corregido)
  async loadCities() {
    const cityListBody = this.querySelector('#cityListBody');
    cityListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getCities(); // Llama a la API para obtener los cities (corregido)
      if (response && response.status === 200) {
        const cities = await response.json(); // Obtiene los datos JSON
        if (cities.length > 0) {
          cities.forEach(city => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${city.id}</th>
              <td>${city.nombre || ''}</td>
              <td>${city.RegionId || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${city.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${city.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            cityListBody.appendChild(row);
          });
        } else {
          cityListBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay ciudades registradas.</td></tr>`;
        }
      } else {
        console.error('Error al cargar las ciudades:', response ? response.statusText : 'Respuesta indefinida');
        cityListBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar las ciudades.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de ciudades:', error); 
      cityListBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error de red al cargar las ciudades.</td></tr>`;
    }
  }
}

customElements.define("lst-city", LstCity);



