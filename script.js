document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const menuList = document.querySelector('.nav-right-section');
    const menuItems = menuList.querySelectorAll('li');
    const btnSwitch = document.querySelector('#switch');


    //Hamburguer Menu
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


    //Dark Mode And Light Mode
    document.addEventListener("DOMContentLoaded", () => {
        if (localStorage.getItem('dark-mode') === 'true') {
            document.body.classList.add('light'); 
            btnSwitch.classList.add('active'); 
        }
    });

    btnSwitch.addEventListener("click", () => {
        document.body.classList.toggle('light'); 
        btnSwitch.classList.toggle('active');
    
        
        if (document.body.classList.contains('light')) {
            localStorage.setItem('dark-mode', 'true'); 
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    });
    

});
