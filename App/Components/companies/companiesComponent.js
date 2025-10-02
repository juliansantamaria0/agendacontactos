import '/App/Components/companies/regcompanies.js';
import '/App/Components/companies/lstcompanies.js';
export class companiesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/companies/companiesStyle.css";
      </style>
      <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active mnucompanies" aria-current="page" href="#" data-verocultar='["#regcompanies",["#lstcompanies"]]'>Registrar companies</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mnucompanies" href="#" data-verocultar='["#lstcompanies",["#regcompanies"]]'>Listado de companiess</a>
      </li>
    </ul>
    <div class="container" id="regcompanies" style="display:block;">
        <reg-companies></reg-companies>
    </div>
    <div class="container" id="lstcompanies" style="display:none;">
        <lst-companies></lst-companies>
    </div>    
    `;
    this.querySelectorAll(".mnucompanies").forEach((val, id) => {
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

customElements.define("companies-component", companiesComponent);