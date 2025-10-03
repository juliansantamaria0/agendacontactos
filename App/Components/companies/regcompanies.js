import {postCompany,patchCompany,deleteCompany} from '../../../Apis/companies/companiesApi.js'; // Corregido
import CompanyModel from '../../../Models/CompanyModel.js'; 
export class Regcompanies extends HTMLElement {
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
        @import "./App/Components/companies/companiesStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Compañías <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataCompanies">
                    <div class="row">
                        <div class="col">
                            <label for="nombrecompanies" class="form-label">Nombre Compañía</label>
                            <input type="text" class="form-control" id="nombrecompanies" name ="nombrecompanies">
                        </div>
                        <div class="col">
                            <label for="apellidocompanies" class="form-label">Apellido Contacto</label>
                            <input type="text" class="form-control" id="apellidocompanies" name="apellidocompanies">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="nroCelular" class="form-label">Nro Celular Contacto</label>
                            <input type="text" class="form-control" id="nroCelular" name ="nroCelular">
                        </div>
                        <div class="col">
                            <label for="emailcompanies" class="form-label">Email Contacto</label>
                            <input type="text" class="form-control" id="emailcompanies" name="emailcompanies">
                        </div>
                        <div class="col">
                            <label for="nroResidencia" class="form-label">Nro Residencia</label>
                            <input type="text" class="form-control" id="nroResidencia" name="nroResidencia">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <div class="container mt-4 text-center">
                                <a href="#" class="btn btn-primary"  id="btnNuevo" data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
                                <a href="#" class="btn btn-dark " id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
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
      this.querySelector("#btnNuevo").addEventListener("click",(e) =>{
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(false);
      })
      this.querySelector("#btnCancelar").addEventListener("click",(e) =>{
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(true);
      })
  }
resetIdView =() =>{
    const idView = document.querySelector('#idView');
    idView.innerHTML = '';   
}
eventoEditar =() =>{
    document.querySelector('#btnEditar').addEventListener("click",(e) =>{
        this.editData();
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
eventoEliminar =() =>{
    document.querySelector('#btnEliminar').addEventListener("click",(e) =>{
        this.delData(e); 
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
ctrlBtn = (e) =>{
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
enabledBtns =() =>{
    document.querySelectorAll(".btn").forEach((val, id) => {
        this.ctrlBtn(val.dataset.ed);
    })
}
editData = () =>{
    const frmRegistro = document.querySelector('#frmDataCompanies');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    patchCompany(datos,id) // Corregido
    .then(response => {
        // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
        if (response.ok) {
            return response.json(); // Devolver la respuesta como JSON
        } else {
            // Si la respuesta no fue exitosa, lanzar una excepción
            throw new Error(`Error en la solicitud PATCH: ${response.status} - ${response.statusText}`);
        }
    })
    .then(responseData => {
        // Hacer algo con la respuesta exitosa si es necesario
        console.log('Company updated:', responseData);
        document.querySelector('lst-companies').loadCompanies(); // Corregido
    })
    .catch(error => {
        console.error('Error en la solicitud PATCH:', error.message);
        // Puedes manejar el error de otra manera si es necesario
    });
    
}
delData = (e) =>{
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    deleteCompany(id) // Corregido
    .then(response => {
        // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
        if (response.ok) {
            return response.json(); // Devolver la respuesta como JSON
        } else {
            // Si la respuesta no fue exitosa, lanzar una excepción
            throw new Error(`Error en la solicitud DELETE: ${response.status} - ${response.statusText}`);
        }
    })
    .then(responseData => {
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn(e.target.dataset.ed);
        console.log('Company deleted:', responseData); 
        document.querySelector('lst-companies').loadCompanies(); // Corregido
    })
    .catch(error => {
        console.error('Error en la solicitud DELETE:', error.message);
       
    });   
}
saveData = () =>{
        const frmRegistro = document.querySelector('#frmDataCompanies');
        document.querySelector('#btnGuardar').addEventListener("click",(e) =>{
            const datos = Object.fromEntries(new FormData(frmRegistro).entries());
            postCompany(datos) // Corregido
            .then(response => {
                // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
                if (response.ok) {
                    return response.json(); // Devolver la respuesta como JSON
                } else {
                    // Si la respuesta no fue exitosa, lanzar una excepción
                    throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                }
            })
            .then(responseData => {
                
                this.viewData(responseData.id);
                console.log('Company added:', responseData); 
                document.querySelector('lst-companies').loadCompanies(); // Corregido
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error.message);
                
            });
            this.ctrlBtn(e.target.dataset.ed);
            e.stopImmediatePropagation();
            e.preventDefault();
        })
}
viewData = (id)=>{
    const idView = document.querySelector('#idView');
    idView.innerHTML = id;
}
disableFrm = (estado) =>{
    let frm={
    nombrecompanies: '', 
    apellidocompanies: '', 
    nroCelular: '',
    emailcompanies: '', 
    nroResidencia: ''
    }
        const frmRegistro = document.querySelector('#frmDataCompanies'); 
        let myFrm = new FormData();
        Object.entries(CompanyModel).forEach(([key, value]) => myFrm.append(key, value)); 
        myFrm.forEach((value, key) => {
             if (frmRegistro.elements[key]) { 
                frmRegistro.elements[key].value= value;
                frmRegistro.elements[key].disabled = estado;
             }
        })
    }
}
customElements.define("reg-companies", Regcompanies);
