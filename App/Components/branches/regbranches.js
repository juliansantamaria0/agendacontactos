import {postBranches,patchBranches,deleteBranches} from '../../../Apis/branches/branchApi.js'; 
import BranchesModel from '../../../Models/branchesModel.js'; 
export class Regbranches extends HTMLElement { 
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
        @import "./App/Components/branches/branchesStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Sucursales <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataBranches">
                    <div class="row">
                        <div class="col">
                            <label for="nombrebranches" class="form-label">Nombre Sucursal</label>
                            <input type="text" class="form-control" id="nombrebranches" name ="nombrebranches">
                        </div>
                        <div class="col">
                            <label for="apellidobranches" class="form-label">Apellido Sucursal</label>
                            <input type="text" class="form-control" id="apellidobranches" name="apellidobranches">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="nroCelular" class="form-label">Nro Celular</label>
                            <input type="text" class="form-control" id="nroCelular" name ="nroCelular">
                        </div>
                        <div class="col">
                            <label for="emailbranches" class="form-label">Email</label>
                            <input type="text" class="form-control" id="emailbranches" name="emailbranches">
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
    const frmRegistro = document.querySelector('#frmDataBranches'); 
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    patchBranches(datos,id) // Corregido
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
        console.log('Branch updated:', responseData);
        document.querySelector('lst-branches').loadBranches(); 
    })
    .catch(error => {
        console.error('Error en la solicitud PATCH:', error.message);
        // Puedes manejar el error de otra manera si es necesario
    });
    
}
delData = (e) =>{ 
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    deleteBranches(id) // Corregido
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
        console.log('Branch deleted:', responseData); 
        document.querySelector('lst-branches').loadBranches(); 
    })
    .catch(error => {
        console.error('Error en la solicitud DELETE:', error.message); 
        // Puedes manejar el error de otra manera si es necesario
    });   
}
saveData = () =>{
        const frmRegistro = document.querySelector('#frmDataBranches');
        document.querySelector('#btnGuardar').addEventListener("click",(e) =>{
            const datos = Object.fromEntries(new FormData(frmRegistro).entries());
            postBranches(datos) // Corregido
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
                console.log('Branch added:', responseData); 
                document.querySelector('lst-branches').loadBranches(); 
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
        nombrebranches: '', 
        apellidobranches: '', 
        nroCelular: '', 
        emailbranches: '', 
        nroResidencia: ''
    }
        const frmRegistro = document.querySelector('#frmDataBranches'); 
        let myFrm = new FormData();
        Object.entries(BranchesModel).forEach(([key, value]) => myFrm.append(key, value)); 
        myFrm.forEach((value, key) => {
             if (frmRegistro.elements[key]) { 
                frmRegistro.elements[key].value= value;
                frmRegistro.elements[key].disabled = estado;
             }
        })
    }
}
customElements.define("reg-branches", Regbranches);
