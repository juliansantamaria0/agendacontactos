import { getCountries } from '../../../Apis/countries/countriesApi.js'; 

export class LstCountry extends HTMLElement { 
  constructor() {
    super();
    this.render();
    this.loadCountries(); 
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/country/countryStyle.css"; /* Usar el estilo de country */
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Países
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre del País</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="countryListBody">
                            <!-- Los países se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

  async loadCountries() { 
    const countryListBody = this.querySelector('#countryListBody'); 
    countryListBody.innerHTML = '';

    try {
      const response = await getCountries();
      if (response && response.status === 200) {
        const countries = await response.json(); 
        console.log("📌 Países desde API:", countries); // 👈 para debug

        if (countries.length > 0) {
          countries.forEach(country => {
            // Detecta el campo correcto automáticamente


            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${country.id}</th>
              <td>${country.nombre}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${country.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${country.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            countryListBody.appendChild(row);
          });
        } else {
          countryListBody.innerHTML = `<tr><td colspan="3" class="text-center">No hay países registrados.</td></tr>`;
        }
      } else {
        console.error('Error al cargar los países:', response ? response.statusText : 'Respuesta indefinida');
        countryListBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Error al cargar los países.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de países:', error); 
      countryListBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Error de red al cargar los países.</td></tr>`;
    }
  }
}

customElements.define("lst-country", LstCountry);
