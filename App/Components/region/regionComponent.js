import '/App/Components/region/regregion.js';
import '/App/Components/region/lstregion.js';
export class regionComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/region/regionStyle.css";
      </style>
      <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active mnuregion" aria-current="page" href="#" data-verocultar='["#regregion",["#lstregion"]]'>Registrar region</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mnuregion" href="#" data-verocultar='["#lstregion",["#regregion"]]'>Listado de regions</a>
      </li>
    </ul>
    <div class="container" id="regregion" style="display:block;">
        <reg-region></reg-region>
    </div>
    <div class="container" id="lstregion" style="display:none;">
        <lst-region></lst-region>
    </div>    
    `;
    this.querySelectorAll(".mnuregion").forEach((val, id) => {
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

customElements.define("region-component", regionComponent);