document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const menuList = document.querySelector('.nav-right-section');
    const menuItems = menuList.querySelectorAll('li');
    const btnSwitch = document.querySelector('#switch');
    const flagItems = document.querySelectorAll('.flags_item');
    
    // Recuperar el idioma del local storage y cargarlo
    const savedLanguage = localStorage.getItem('language') || 'en'; // Carga el idioma por defecto (inglés) si no hay guardado
    loadLanguage(savedLanguage); // Carga el idioma guardado o el por defecto

    // Hamburguer Menu
    if (window.innerWidth <= 600) {
        menuList.style.display = 'none';
    }

    menuButton.addEventListener('click', function() {
        menuList.style.display = (menuList.style.display === 'none' || menuList.style.display === '') ? 'flex' : 'none';
    });

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            if (window.innerWidth <= 600) {
                menuList.style.display = "none";
            }

            const targetId = this.querySelector("a").getAttribute("href");
            const targetElement = document.querySelector(targetId);
            const headerHeight = 100;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Dark Mode and Light Mode
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('light'); 
        btnSwitch.classList.add('active'); 
    }

    btnSwitch.addEventListener("click", () => {
        document.body.classList.toggle('light'); 
        btnSwitch.classList.toggle('active');
        localStorage.setItem('dark-mode', document.body.classList.contains('light'));
    });

    // Función para cargar el archivo JSON
    function loadLanguage(language) {
        const url = language === 'es' ? 'languages/es.json' : 'languages/en.json';
    
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log("Datos del JSON cargados:", data); 
                updateContent(data);
                localStorage.setItem('language', language); 
            })
            .catch(error => {
                console.error('Error loading the language file:', error);
            });
    }

    // Función para actualizar el contenido de la página
    function updateContent(data) {
        // Actualiza los enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-right-section a');
        navLinks.forEach((link, index) => {
            if (link) link.textContent = data.header.navLinks[index]?.text || '';
        });
    
        // Actualiza la sección Home
        const homeTitle = document.querySelector('#home-tittle');
        const homeDescription = document.querySelector('#home-description');

        if (homeTitle) {
            homeTitle.textContent = data.Home.title || ''; 
        }

        if (homeDescription) {
            homeDescription.textContent = data.Home.description || ''; 
        }

        // Actualiza la sección About
        const aboutTitle = document.querySelector('#About h2');
        if (aboutTitle) aboutTitle.textContent = data.About.title || '';
    
        // Actualiza los párrafos de descripción en la sección About
        const aboutDescription = document.querySelectorAll('#About p');
        data.About.description.forEach((paragraph, index) => {
            if (aboutDescription[index]) {
                aboutDescription[index].textContent = paragraph || '';
            }
        });

        // Actualiza el botón de descarga según el idioma
        const downloadButton = document.querySelector('#download-btn');
        if (downloadButton) {
            downloadButton.textContent = data.About.downloadCV || ''; 
            downloadButton.href = data.About.cvLink || ''; // Cambia el enlace según el idioma
        }
        
        // Actualiza la sección Projects
        const projectsTitle = document.querySelector('#Projects h2');
        if (projectsTitle) projectsTitle.textContent = data.Projects.title || '';
    
        const projectsContainer = document.querySelector('#Projects .projects-cars--slider');
        if (projectsContainer) {
            projectsContainer.innerHTML = ''; // Limpia el contenido existente
            
            data.Projects.projects.forEach(project => {
                console.log(`Cargando imagen desde: ${project.image}`); // Verifica la ruta de la imagen en la consola
                const projectDiv = document.createElement('article');
                projectDiv.classList.add('project-card');
                projectDiv.innerHTML = `
                    <img src="${project.image || 'images/default.png'}" alt="${project.name || ''}" class="project-image" onerror="this.onerror=null; this.src='images/default.png';">
                    <h3>${project.name || ''}</h3>
                    <p class="project-description">${project.description || ''}</p>
                    <h4>Tecnologías:</h4>
                    <section class="technologies">
                        <div class="tech-items-container">
                            ${project.technologies.map(tech => `
                                <figure class="tech-item">
                                    <img src="images/${tech.toLowerCase()}.png" alt="${tech}" class="tech-icon" onerror="this.onerror=null; this.src='images/default.png';">
                                    <figcaption class="icon-card-name">${tech}</figcaption>
                                </figure>
                            `).join('')}
                        </div>
                    </section>
                    <section class="project-buttons">
                        <a href="${project.projectLink || '#'}" class="btn" target="_blank">${project.viewProject || ''}</a>
                        <a href="${project.repositoryLink || '#'}" class="btn" target="_blank">${project.viewRepository || ''}</a>
                    </section>
                `;
                projectsContainer.appendChild(projectDiv);
            });
        }

        // Actualiza el Footer (sección ContactMe)
        const footerContactTitle = document.querySelector('#footer-tittle');
        if (footerContactTitle) footerContactTitle.textContent = data.footer.contactMe.title || '';

        // Actualiza el Footer (sección GetToKnowMe)
        const footerGetToKnowTitle = document.querySelector('#Know-me-tittle');
        if (footerGetToKnowTitle) footerGetToKnowTitle.textContent = data.footer.getToKnowMe.title || '';
    }

    // Event listeners para las banderas
    flagItems.forEach(item => {
        item.addEventListener('click', function() {
            const language = this.dataset.language; 
            loadLanguage(language); 
        });
    });
});
