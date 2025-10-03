console.log('🔄 navMenu.js cargando...');

export class NavMenu extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 NavMenu constructor ejecutado');
        this.render();
    }

    render() {
        console.log('🎨 NavMenu renderizando...');
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Agenda</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" href="#" data-verocultar='["c"]'>Contactos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["ct"]'>Citas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["countries"]'>Países</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["regions"]'>Regiones</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["cities"]'>Ciudades</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["branches"]'>Sucursales</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-verocultar='["companies"]'>Compañías</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        console.log('✅ NavMenu HTML inyectado');

        // Event listeners para navegación
        this.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                console.log('🔗 Clic en:', e.target.textContent);
                const data = JSON.parse(e.target.dataset.verocultar);
                const mainContent = document.querySelector('#mainContent');
                if (!mainContent) {
                    console.error('❌ mainContent no encontrado');
                    return;
                }
                mainContent.innerHTML = "";
                console.log('📄 Cargando componente para:', data[0]);

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
                    case 'cities':
                        mainContent.innerHTML = "<city-component></city-component>";
                        break;
                    case 'branches':
                        mainContent.innerHTML = "<branches-component></branches-component>";
                        break;
                    case 'companies':
                        mainContent.innerHTML = "<companies-component></companies-component>";
                        break;
                    default:
                        console.log("Opción inválida:", data[0]);
                }

                // Actualiza clase active
                this.querySelectorAll(".nav-link").forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                e.preventDefault();
            });
        });

        // Carga inicial: Contactos
        setTimeout(() => {
            const initialLink = this.querySelector('a[data-verocultar=\'["c"]\']');
            if (initialLink) {
                console.log('🚀 Carga inicial: Contactos');
                initialLink.click();
            }
        }, 100);
    }
}

customElements.define("nav-menu", NavMenu);
console.log('✅ NavMenu definido como custom element');
