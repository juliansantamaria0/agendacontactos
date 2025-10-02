export class NavMenu extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
        <style rel="stylesheet">
          @import "./App/Components/navMenu/menuStyle.css";
        </style>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Agenda</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#" data-verocultar='["c"]'>Contactos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-verocultar='["ct"]'></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-verocultar='["countries"]'>Países</a>
                  </li>
                   <li class="nav-item">
                    <a class="nav-link" href="#" data-verocultar='["regions"]'>regiones</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>        
        `;
        
        // Event listeners para navegación
        this.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                const data = JSON.parse(e.target.dataset.verocultar);
                const mainContent = document.querySelector('#mainContent');
                
                if (!mainContent) {
                    console.error('#mainContent no encontrado');
                    return;
                }
                
                mainContent.innerHTML = "";
                
                switch (data[0]) {
                    case 'c':
                        mainContent.innerHTML = "<contacto-component></contacto-component>";
                        break;
                    case 'ct':
                        mainContent.innerHTML = "<div class='alert alert-info'>Citas en desarrollo</div>";
                        break;
                    case 'countries':
                        mainContent.innerHTML = "<country-component></country-component>";
                        break;
                      case 'regions':
                        mainContent.innerHTML = "<region-component></region-component>";
                        break;
                    default:
                        console.log("Opción inválida");
                }
                
                // Actualiza active class
                this.querySelectorAll(".nav-link").forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Carga inicial: Contactos por defecto
        setTimeout(() => {
            const initialLink = this.querySelector('a[data-verocultar=\'["c"]\']');
            if (initialLink) initialLink.click();
        }, 100); // Pequeño delay para asegurar que el DOM esté listo
    }
}

customElements.define("nav-menu", NavMenu);
