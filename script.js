//llamado a la accion del boton Menu

document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const menuList = document.querySelector('.nav-right-section');
    const menuItems = menuList.querySelectorAll('li'); // Selecciona todos los elementos de la lista

    menuButton.addEventListener('click', function() {
        // Alternar la visibilidad de la lista del menú
        if (menuList.style.display === 'none' || menuList.style.display === '') {
            menuList.style.display = 'flex'; // Muestra el menú
        } else {
            menuList.style.display = 'none'; // Oculta el menú
        }
    });

    // Agregar un evento click a cada elemento de la lista
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuList.style.display = 'none'; // Oculta el menú al seleccionar una opción
        });
    });
});
