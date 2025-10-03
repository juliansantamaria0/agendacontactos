import {postCity,patchCity,deleteCity} from '../../../Apis/cities/citiesApi.js'; // Corregido
import CityModel from '../../../Models/CityModel.js'; 
export class Regcity extends HTMLElement {
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
        @import "./App/Components/City/cityStyle.css";
      </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Ciudades <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataCity">
                    <div class="row">
                        <div class="col">
                            <label for="nombre" class="form-label">Nombre Ciudad</label>
                            <input type="text" class="form-control" id="nombre" name ="nombre">
                        </div>
                        <div class="col">
                            <label for="RegionId" class="form-label">ID de Región</label>
                            <input type="text" class="form-control" id="RegionId" name="RegionId">
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
    const frmRegistro = document.querySelector('#frmDataCity');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    patchCity(datos,id) // Corregido
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
        console.log('City updated:', responseData); 
        document.querySelector('lst-city').loadCities(); // Corregido
    })
    .catch(error => {
        console.error('Error en la solicitud PATCH:', error.message); 
        
    });
    
}
delData = (e) =>{ 
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    deleteCity(id) // Corregido
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
        console.log('City deleted:', responseData); 
        document.querySelector('lst-city').loadCities(); // Corregido
    })
    .catch(error => {
        console.error('Error en la solicitud DELETE:', error.message); 
        
    });   
}
saveData = () =>{
        const frmRegistro = document.querySelector('#frmDataCity');
        document.querySelector('#btnGuardar').addEventListener("click",(e) =>{
            const datos = Object.fromEntries(new FormData(frmRegistro).entries());
            postCity(datos) // Corregido
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
                console.log('City added:', responseData); 
                document.querySelector('lst-city').loadCities(); // Corregido
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
         nombre: '',
         RegionId: ''
    }
        const frmRegistro = document.querySelector('#frmDataCity'); 
        let myFrm = new FormData();
        Object.entries(CityModel).forEach(([key, value]) => myFrm.append(key, value)); 
        myFrm.forEach((value, key) => {
             if (frmRegistro.elements[key]) { 
                frmRegistro.elements[key].value= value;
                frmRegistro.elements[key].disabled = estado;
             }
        })
    }
}
customElements.define("reg-city", Regcity);

