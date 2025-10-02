import { postcompanies, patchcompanies, deletecompanies } from '../../../Apis/companies/companiesApi.js';
import CountryModel from '../../../Models/countryModel.js';

export class RegCountry extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/country/countryStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Países <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataCountry">
                    <div class="row">
                        <div class="col">
                            <label for="nombre" class="form-label">Nombre del País</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" required>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <div class="container mt-4 text-center">
                                <a href="#" class="btn btn-primary" id="btnNuevo" data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
                                <a href="#" class="btn btn-dark" id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
                                <a href="#" class="btn btn-success" id="btnGuardar" data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
                                <a href="#" class="btn btn-warning" id="btnEditar" data-ed='[[],[]]'>Editar</a>
                                <a href="#" class="btn btn-danger" id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
                            </div>
                        </div>
                    </div> 
                </form>
            </div>
        </div>
      `;
      
      this.querySelector("#btnNuevo").addEventListener("click", (e) => {
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(false);
      });
      this.querySelector("#btnCancelar").addEventListener("click", (e) => {
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(true);
      });
  }

  resetIdView() {
    const idView = document.querySelector('#idView');
    idView.innerHTML = '';
  }

  eventoEditar() {
    document.querySelector('#btnEditar').addEventListener("click", (e) => {
        this.editData();
        e.stopImmediatePropagation();
        e.preventDefault();
    });
  }

  eventoEliminar() {
    document.querySelector('#btnEliminar').addEventListener("click", (e) => {
        this.delData(e); // Pasar el evento 'e'
        e.stopImmediatePropagation();
        e.preventDefault();
    });
  }

  ctrlBtn(e) {
    let data = JSON.parse(e);
    data[0].forEach(boton => {
        let btnActual = document.querySelector(boton);
        if (btnActual) btnActual.classList.remove('disabled');
    });
    data[1].forEach(boton => {
        let btnActual = document.querySelector(boton);
        if (btnActual) btnActual.classList.add('disabled');
    });
  }

  enabledBtns() {
    document.querySelectorAll(".btn").forEach((val) => {
        this.ctrlBtn(val.dataset.ed);
    });
  }

  editData() {
    const frmRegistro = document.querySelector('#frmDataCountry');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    patchcompanies(datos, id)
    .then(response => {
        if (response.ok) {
            console.log('País actualizado');
            // Recargar la lista de países después de editar
            document.querySelector('lst-country').loadcompanies(); 
        } else {
            console.error('Error al actualizar');
        }
    }).catch(error => console.error(error));
  }

  delData(e) { // Recibir el evento 'e'
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    deletecompanies(id)
    .then(response => {
        if (response.ok) {
            this.resetIdView();
            this.disableFrm(true);
            this.ctrlBtn(e.target.dataset.ed); // Usar el evento 'e' recibido
            console.log('País eliminado');
            // Recargar la lista de países después de eliminar
            document.querySelector('lst-country').loadcompanies(); 
        } else {
            console.error('Error al eliminar');
        }
    }).catch(error => console.error(error));
  }

  saveData() {
    const frmRegistro = document.querySelector('#frmDataCountry');
    document.querySelector('#btnGuardar').addEventListener("click", (e) => {
        const datos = Object.fromEntries(new FormData(frmRegistro).entries());
        postcompanies(datos)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.viewData(data.id);
                    // Recargar la lista de países después de guardar
                    document.querySelector('lst-country').loadcompanies(); 
                });
            } else {
                console.error('Error al guardar');
            }
        }).catch(error => console.error(error));
        this.ctrlBtn(e.target.dataset.ed);
        e.stopImmediatePropagation();
        e.preventDefault();
    });
  }

  viewData(id) {
    const idView = document.querySelector('#idView');
    idView.innerHTML = id;
  }

  disableFrm=(estado) =>{
    let frm={
        nombre: ''
    }
    const frmRegistro = document.querySelector('#frmDataCountry');
    let myFrm = new FormData();
    Object.entries(CountryModel).forEach(([key, value]) => myFrm.append(key, value));
    myFrm.forEach((value, key) => {
        if (frmRegistro.elements[key]) 
            frmRegistro.elements[key].value = value;
            frmRegistro.elements[key].disabled = estado;
        
    })
  }
}

customElements.define("reg-country", RegCountry);
