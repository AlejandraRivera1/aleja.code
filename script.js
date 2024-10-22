document.addEventListener("DOMContentLoaded", function() {
    const languageButton = document.querySelector('.language');
    const darkModeButton = document.querySelector('.dark-mode');
    const menuButton = document.querySelector('.menu-button');
    const menuList = document.querySelector('.nav-right-section');
    const menuItems = menuList.querySelectorAll('li');

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
            if (window.innerWidth <= 600) {
                menuList.style.display = "none";
            } else {
                menuList.style.display = 'flex'; 
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

});
