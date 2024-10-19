document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const menuList = document.querySelector('.nav-right-section');
    const menuItems = menuList.querySelectorAll('li'); 

    // Inicialmente ocultar el menú en pantallas pequeñas
    if (window.innerWidth <= 600) {
        menuList.style.display = 'none';
    }

    menuButton.addEventListener('click', function() {
        if (menuList.style.display === 'none' || menuList.style.display === '') {
            menuList.style.display = 'flex'; 
        } else {
            menuList.style.display = 'none';
        }
    });

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            // Oculta el menú solo si la pantalla es pequeña
            if (window.innerWidth <= 600) {
                menuList.style.display = "none";
            } else {
                menuList.style.display = 'flex'; // Muestra el menú en pantallas grandes
            }

            // Desplaza la página hacia la sección correspondiente
            const targetId = this.querySelector("a").getAttribute("href");
            const targetElement = document.querySelector(targetId);
            const headerHeight = 100; // Altura del header
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });            A
        });
    });
});
