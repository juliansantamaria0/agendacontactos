//  Importación de la función getBranches (corregido)
import { getBranches } from '../../../Apis/branches/branchesApi.js';

export class Lstbranches extends HTMLElement {
  constructor() {
    super();
    this.render();
    //  Llamar a loadBranches para cargar los datos automáticamente (corregido)
    this.loadBranches();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/branches/branchesStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Listado de Sucursales
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre Sucursal</th>
                                <th scope="col">Apellido Sucursal</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Email</th>
                                <th scope="col">Residencia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="branchesListBody">
                            <!-- Las sucursales se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>     
      `;
  }

 
  async loadBranches() {
    const branchesListBody = this.querySelector('#branchesListBody');
    branchesListBody.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos

    try {
      const response = await getBranches(); // Llama a la API para obtener los branches (corregido)
      if (response && response.status === 200) {
        const branchesData = await response.json(); // Obtiene los datos JSON (renombrado para evitar conflicto)
        if (branchesData.length > 0) {
          branchesData.forEach(branches => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${branches.id}</th>
              <td>${branches.nombrebranches || ''}</td>
              <td>${branches.apellidobranches || ''}</td>
              <td>${branches.nroCelular || ''}</td>
              <td>${branches.emailbranches || ''}</td>
              <td>${branches.nroResidencia || ''}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" data-id="${branches.id}" data-action="edit">Editar</button>
                <button class="btn btn-danger btn-sm" data-id="${branches.id}" data-action="delete">Eliminar</button>
              </td>
            `;
            branchesListBody.appendChild(row);
          });
        } else {
          branchesListBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay sucursales registradas.</td></tr>`;
        }
      } else {
        console.error('Error al cargar las sucursales:', response ? response.statusText : 'Respuesta indefinida');
        branchesListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar las sucursales.</td></tr>`;
      }
    } catch (error) {
      console.error('Error en la solicitud de sucursales:', error); 
      branchesListBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error de red al cargar las sucursales.</td></tr>`;
    }
  }
}

customElements.define("lst-branches", Lstbranches);

