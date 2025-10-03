import '/App/Components/cities/regcity.js';  
import '/App/Components/cities/lstcity.js';  

export class cityComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/City/cityStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnucity" aria-current="page" href="#" data-verocultar='["#regcity",["#lstcity"]]'>Registrar Ciudad</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnucity" href="#" data-verocultar='["#lstcity",["#regcity"]]'>Listado de Ciudades</a>
        </li>
      </ul>
      <div class="container" id="regcity" style="display:block;">
          <reg-city></reg-city>
      </div>
      <div class="container" id="lstcity" style="display:none;">
          <lst-city></lst-city>
      </div>    
    `;
    this.querySelectorAll(".mnucity").forEach((val, id) => {
        val.addEventListener("click", (e)=>{
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    });
  }
}

customElements.define("city-component", cityComponent);
