import '/App/Components/country/regCountry.js';  
import '/App/Components/country/lstCountry.js';  

export class CountryComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/country/countryStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnucountry" aria-current="page" href="#" data-verocultar='["#regcountry",["#lstcountry"]]'>Registrar País</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnucountry" href="#" data-verocultar='["#lstcountry",["#regcountry"]]'>Listado de Países</a>
        </li>
      </ul>
      <div class="container" id="regcountry" style="display:block;">
          <reg-country></reg-country> // <-- Correcto
      </div>
      <div class="container" id="lstcountry" style="display:none;">
          <lst-country></lst-country> // <-- Correcto, si el custom element se define como lst-country
      </div>    
    `;
  
  }
}

customElements.define("country-component", CountryComponent);
