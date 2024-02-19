"use strict"

window.addEventListener("DOMContentLoaded",execute);

function execute() {

    const menu = {
        home: {
            title: "Home", 
            body: {
                "Home": "index.html#header",
                "Our Menu": "index.html#our-menu",
                "Chef": "index.html#chef",
                "Feature": "index.html#features",
                "Recent Post": "index.html#recent-post",
                "Reservation": "index.html#reservation",
                "Category": "index.html#category",
                "Testimonials": "index.html#testimonials",
                },
        },
        menu: {
            title: "Menu",
            body: {
                "Menu": "menu.html#menu_header",
                "Starters": "menu.html#starters",
                "Mains": "menu.html#mains",
                "Drinks": "menu.html#drinks",
                "Reservation": "menu.html#reservation",
            },
        },
        contact: {
            title: "Contact",
            body: {
                "Contact": "contact.html#contact_header",
                "Location": "contact.html#location",
                "Reservation": "contact.html#resform",
            },
        },
        about: {
            title: "About us",
            body: {
                "About": "about.html#about_header",
                "Staff": "about.html#staff",
                "Process": "about.html#staff",
                "Reservation": "about.html#form-reservation",
            },
        },
        portfolio: {
            title: "Portfolio",
            body: {
                "portfolio": "portfolio-grids.html#portfolio-grids_header",
            },
        },
        blog: {
            title: "Blog",
            body: {
                "Add own post": "add-new-post.html#add-new-post_header",
                "One columns": "blog.html?style=one%20column#blog_header",
                "Two columns": "blog.html?style=two%20columns#blog_header",
            },
        },
    }

    // const label = document.querySelector(".label");
    const footer = document.querySelector("#footer");
    /**
     * Menu create
     */
    const navigationOverlay = document.createElement("div");
    navigationOverlay.id = "navigation__overlay";
    navigationOverlay.classList.add("fullscreen", "animate__animated", "invisible");
    footer.insertAdjacentElement("afterend", navigationOverlay);
    
    const overlayImg = document.createElement("img");
    overlayImg.classList.add("overlay__img");
    overlayImg.src = "img/pic/main/nav-image.jpg";
    overlayImg.alt = "branch";
    navigationOverlay.appendChild(overlayImg);
    const overlayHue = document.createElement("div");
    overlayHue.classList.add("overlay__hue");
    navigationOverlay.appendChild(overlayHue);
    
    overlayHue.insertAdjacentHTML("afterend", `
        <svg class="close__btn" xmlns="http://www.w3.org/2000/svg" width="84" height="63" viewBox="0 0 84 63" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M43.5004 31.3906L57.5081 17.4815L56.0889 16.0723L42.0812 29.9814L28.0735 16.0723L26.6543 17.4815L40.662 31.3906L27.0223 44.9342L28.4415 46.3434L42.0812 32.7998L55.7209 46.3434L57.1401 44.9342L43.5004 31.3906Z" fill="black"/>
        </svg>
    
    `)

    const menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu__wrapper");
    navigationOverlay.appendChild(menuWrapper);
    const navMenuItems = document.createElement("ul");
    navMenuItems.classList.add("nav-menu__items");
    menuWrapper.appendChild(navMenuItems);
    for (let item in menu) {
        const navMenuItem = document.createElement("li");
        navMenuItem.classList.add("nav-menu__item");
        navMenuItems.appendChild(navMenuItem);
        const navMenuItemTitle = document.createElement("h2");
        navMenuItemTitle.classList.add("nav-menu__item-title", "nav_item");
        navMenuItemTitle.innerText = menu[item].title;
        navMenuItem.appendChild(navMenuItemTitle);
        const navMenuSubitems = document.createElement("ul");
        navMenuSubitems.classList.add("home__items", "nav-menu__subitems", "animate__animated", "invisible");
        for(let subitem in menu[item].body) {
            const li = document.createElement("li");
            navMenuSubitems.appendChild(li);
            const navSubitem = document.createElement("a");
            navSubitem.classList.add("nav_subitem");
            navSubitem.href = menu[item].body[subitem];
            navSubitem.innerText = subitem;
            li.appendChild(navSubitem);
        }
        navMenuItem.appendChild(navMenuSubitems);
    }

    /**
     * Widget adress
     */
    function initWidget() {
        const widget = document.createElement("div");
        widget.id = "widget";
        menuWrapper.insertAdjacentElement("afterend",widget);
        const widgetTitle = document.createElement("h5");
        widgetTitle.classList.add("widget__title", "headline_5", "white");
        widgetTitle.innerText = "Contact";
        widget.appendChild(widgetTitle);
        const widgetCommunnication = document.createElement("div");
        widgetCommunnication.classList.add("widget__communication", "widget__block");
        widget.appendChild(widgetCommunnication);
        const communicationTel = document.createElement("a");
        communicationTel.classList.add("communication__tel", "text_widget", "white");
        communicationTel.innerText = "+86 852 346 000";
        communicationTel.href = "tel: +86 852 346 000";
        widgetCommunnication.appendChild(communicationTel);
        const communicationEmail = document.createElement("a");
        communicationEmail.classList.add("communication__email", "text_widget", "white");
        communicationEmail.href = "meilto:info@foodzero.com";
        communicationEmail.innerText = "info@foodzero.com";
        widgetCommunnication.appendChild(communicationEmail);
        const widgetAdress = document.createElement("div");
        widgetAdress.classList.add("widget__adress", "widget__block", "white");
        widget.appendChild(widgetAdress);
        const adressStreet = document.createElement("a");
        adressStreet.classList.add("adress__street", "text_widget");
        adressStreet.innerText = "1959 Sepulveda Blvd.";
        widgetAdress.appendChild(adressStreet);
        const adressCity = document.createElement("a");
        adressCity.classList.add("adress__city", "text_widget");
        adressCity.innerText = "Culver City, CA, 90230";
        widgetAdress.appendChild(adressCity);
        const widgetSocial = document.createElement("ul");
        widgetSocial.classList.add("widget__social", "widget__block");
        widget.appendChild(widgetSocial);
        const arraySocialItems = ["icon-Icon_instagram", "icon-Icon_twitter", "icon-Icon_facebook", "icon-Icon_youtube"];
        for(let i = 0; i < arraySocialItems.length; i++) {
            const li = document.createElement("li");
            widgetSocial.appendChild(li);
            const socialItem = document.createElement("a");
            socialItem.classList.add("social__item");
            li.appendChild(socialItem);
            const icon = document.createElement("span");
            icon.classList.add(arraySocialItems[i]);
            socialItem.appendChild(icon);

        }

    }


    /**
     * Click events
     */
    // Humburger
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", hamburgerClick);
    function hamburgerClick() {
        navigationOverlay.showElementWithAnim("animate__fadeIn");
    }
    // Close
    const close = document.querySelector(".close__btn");
    close.addEventListener("click", closeClick);
    function closeClick() {
        linkTo(hamburger, "auto");
        navigationOverlay.hideElementWithAnim("animate__fadeOut");
        document.body.style.overflow = "visible";
        hideNavSubitems();
    }

    /**
     * Up button
     */
    const btnUp = document.createElement("buton");
    btnUp.id = "button_up";
    btnUp.classList.add("animate__animated");
    btnUp.innerText = "UP";
    if(window.pageYOffset < window.innerHeight) {
        btnUp.classList.add("invisible");
    }
    navigationOverlay.insertAdjacentElement("afterend", btnUp);
    window.addEventListener("scroll", function (event) {
        if(event.target === navigationOverlay) {
        }
        up();
    });
    function up() {
        // Scroll to up execute..
        btnUp.addEventListener("click", function() {
            linkTo(hamburger);
        })
        // Check window position to show / hide up-button..
        if(window.pageYOffset > window.innerHeight) {
            if(btnUp.classList.contains("invisible")){
                btnUp.showElementWithAnim("animate__fadeIn");
            }
        } else {
            if(!btnUp.classList.contains("invisible")) {
                btnUp.hideElementWithAnim("animate__fadeOut");
            }
        }
    }


    /**
     * EXECUTE
     */
    initWidget();

    /**
     * Helper
     */
    //  Hide all expanded subElement in nav-item list..
    function hideNavSubitems () {
        document.querySelectorAll(".nav-menu__item-title").forEach(menuItem => {
                const sublist = menuItem.nextElementSibling;
                if (!sublist.classList.contains("invisible")) {
                    sublist.hideElementWithAnim("animate__fadeIn", 50);
                    menuItem.classList.remove("nav-menu__item-title_active");
                }
        })
    }
    //  Smooth scroll to target position..
    function linkTo(target, behaivor = "smooth") {
        let elem;
        if(typeof(target) == "string") {
            elem = document.querySelector(query);
        } else if(typeof(target) == "object") {
            elem = target;
        }
        const paddingTop = window.getComputedStyle(elem, null).getPropertyValue("padding-top");
        const position = elem.offsetTop + Number(paddingTop.substring(0, paddingTop.length - 2));

        scroll({
            top: position,
            behavior: behaivor
        });
    }
    // Hide / Show subitems
    document.querySelectorAll(".nav-menu__item-title").forEach(menuItem => {
        menuItem.addEventListener("click", function() {
            const sublist = this.nextElementSibling;
            if (sublist.classList.contains("invisible")) {
                sublist.showElementWithAnim("animate__fadeIn");
                this.classList.add("nav-menu__item-title_active");
            } else {
                sublist.hideElementWithAnim("animate__fadeIn", 50);
                this.classList.remove("nav-menu__item-title_active");
            }
        })
    })
    // Hide overlay when choose subitem..
    document.querySelectorAll(".nav_subitem").forEach(subitem => {
        subitem.addEventListener("click", function() {
            navigationOverlay.hideElementWithAnim("animate__fadeOut");
            document.body.style.overflow = "visible";
            hideNavSubitems();
        })
    });

    /**
     * Utitlity
     */
    // Switch element class..
    HTMLElement.prototype.switchClass = function (name1, name2) {
        if(this.contains(name1)) {
            this.classList.remove(name1);
            this.classList.add(name2);
        } else {
            this.classList.remove(name2);
            this.classList.add(name1);
        }
    }
    // Add one remove second class..
    HTMLElement.prototype.addRemove = function(add, remove) {
        if(!this.contains(add)) {
            this.classList.add(add);
        }
        this.classList.remove(remove);
    }
    // Add class and then after 250ms remove they..
    HTMLElement.prototype.addOneRemoveOne = function (name1, time = 701) {
        if(!this.contains(name1)) {
            this.classList.add(name1);
            setTimeout(() => {
                this.classList.remove(name1);
            }, time);
        }
    }
    //  Show element with animation..
    HTMLElement.prototype.showElementWithAnim = function(anim, time = 700) {
        
        this.classList.remove("invisible");
        this.classList.add("visible");
        this.classList.add(anim);
        setTimeout(() => {
            this.classList.remove(anim);
        }, time);
    }
    //  Hide element with animation..
    HTMLElement.prototype.hideElementWithAnim = function(anim, time = 700) {
            this.classList.add(anim);
            setTimeout(() => {
                this.classList.remove(anim);
                this.classList.remove("visible");
                this.classList.add("invisible");
                // resolve();
            }, time);

    }
}