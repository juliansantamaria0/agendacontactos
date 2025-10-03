import '/App/Components/branches/regbranches.js';
import '/App/Components/branches/lstbranches.js';
export class branchesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/branches/branchesStyle.css";
      </style>
      <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active mnubranches" aria-current="page" href="#" data-verocultar='["#regbranches",["#lstbranches"]]'>Registrar Sucursal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mnubranches" href="#" data-verocultar='["#lstbranches",["#regbranches"]]'>Listado de Sucursales</a>
      </li>
    </ul>
    <div class="container" id="regbranches" style="display:block;">
        <reg-branches></reg-branches>
    </div>
    <div class="container" id="lstbranches" style="display:none;">
        <lst-branches></lst-branches>
    </div>    
    `;
    this.querySelectorAll(".mnubranches").forEach((val, id) => {
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

customElements.define("branches-component", branchesComponent);

