import './navMenu/navMenu.js';
import './contacto/contactoComponent.js';
import './country/countryComponent.js';
import './region/regionComponent.js';
import './cities/cityComponent.js';  
import './branches/branchesComponent.js';
import './companies/companiesComponent.js';

const appContainer = document.getElementById('appContainer');
if (appContainer && !appContainer.querySelector('nav-menu')) {
    appContainer.innerHTML = '<nav-menu></nav-menu><main id="mainContent" class="container mt-4"></main>';
}
console.log('App inicializada correctamente');
