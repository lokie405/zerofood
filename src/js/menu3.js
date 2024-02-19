"use strict"

window.addEventListener("DOMContentLoaded", executeScript);

function executeScript() {
    const label = document.querySelector(".label");
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", showMenu);

    // const close = document.querySelector(".close__btn");
    // const overlay = document.querySelector("#navigation__overlay");
    const navItemsTitle = document.querySelectorAll(".nav-menu__item-title");
    const items = document.querySelector(".nav_item");
    const subitems = document.querySelectorAll(".nav_subitem");
    const homeList = document.querySelector(".home__items");
    const menuList = document.querySelector(".menu__items");

    const buttonUp = document.querySelector("#button_up");

}

function showMenu() {
    const menu = {
        home: {
            "Home": "#header",
            "Our Menu": "#our-menu",
            "Chef": "#chef",
            "Feature": "#feature",
            "Recent Post": "#recent-post",
            "Reservation": "#reservation",
            "Category": "#category",
            "Testimonials": "#testimonials",
        }
    }
    const navigationOverlay = document.createElement("div");
    navigationOverlay.classList.add("fullscreen", "animate__animated", "invisible");
    overlay.showElementWithAnim("animate__fadeIn");
    const overlayImg = document.createElement("img");
    overlayImg.src = "img/pic/main/nav-image.jpg";
    overlayImg.alt = "branch";
    overlayImg.classList.add("overlay__img");
    const overlayHue = document.createElement("div");
    overlayHue.classList.add("overlay__hue");
    navigationOverlay.appendChild(overlayImg, overlayHue);

    navigationOverlay.innerHTML = 
        `<svg class="close__btn" xmlns="http://www.w3.org/2000/svg" width="84" height="63" viewBox="0 0 84 63" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M43.5004 31.3906L57.5081 17.4815L56.0889 16.0723L42.0812 29.9814L28.0735 16.0723L26.6543 17.4815L40.662 31.3906L27.0223 44.9342L28.4415 46.3434L42.0812 32.7998L55.7209 46.3434L57.1401 44.9342L43.5004 31.3906Z" fill="black"/>
        </svg>`
    
    const menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu__wrapper");
    navigationOverlay.appendChild(menuWrapper);

    // console.log("SERYOGA", navigationOverlay);
    const navMenuItems = document.createElement("ul");
    navMenuItems.classList.add("nav-menu__items");
    menuWrapper.appendChild(navMenuItems);
    navMenuItems.style.width = "400px";
    navMenuItems.style.height = "400px";
    navMenuItems.style.background = "red";
    /**
     * Menu inflate:
     */
    for(let key in menu) {
        const navMenuItem = document.createElement("li");
        navMenuItem.classList.add("nav-menu__item");
        const navMenuItemTitle = document.createElement("h2");
        navMenuItemTitle.innerText = key;
        navMenuItemTitle.classList.add("nav-menu__item-title", "nav_item");
        const navMenuSubitems = document.createElement("ul");
        navMenuSubitems.classList.add("nav-menu__subitems", "animate__animated", "invisible");
        navMenuItem.appendChild(navMenuItemTitle, navMenuSubitems);

        for(let subitem in menu[key]) {
            const li = document.createElement("li");
            const navSubitem = document.createElement("a");
            navSubitem.classList.add("nav_subitem");
            navSubitem.href = menu[key][subitem];
            navSubitem.innerText = subitem;
            navMenuSubitems.appendChild(li);
            li.appendChild(navSubitem);
        }
    
    }




}




 // #region ====// P L U G I N //========================================================================================================

 // Switch element class..
 HTMLElement.prototype.switchClass = function (name1, name2) {
    if(this.contains(name1)) {
        this.classList.remove(name1);
        this.classList.add(name2);
        // console.info(`Class ${name1} switched to ${name2}` )
    } else {
        this.classList.remove(name2);
        this.classList.add(name1);
        // console.info(`Class ${name2} switched to ${name1}` )
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
//  Hide all expanded subElement in nav-item list..
function hideNavSubitems () {
    nav.navItemsTitle.forEach(menuItem => {
            const sublist = menuItem.nextElementSibling;
            if (!sublist.classList.contains("invisible")) {
                // console.log("!invisible");
                sublist.hideElementWithAnim("animate__fadeIn", 50);
                menuItem.classList.remove("nav-menu__item-title_active");
            }
    })
}
//  Smooth scroll to target position..
function linkTo(target) {
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
        behavior: "smooth"
    });
}
// Add first class at 1sec; add second; remove third after timeout..
// HTMLElement.prototype.classTempAddRemoveAfter = function (name1, name2, name3, time = 701) {
//     this.classList.add(name2);
//     this.classList.add(name1);
//     setTimeout(() => {
//         this.classList.remove(name1);
//         this.classList.remove(name3);
//     }, time);
// }


// Mains:..
// Add class..
// HTMLElement.prototype.classList.add = function(name1) {
//     if(!this.classList.contains(name1)) {
//         this.classList.add(name1);
//     } 
    // else {
    //     console.info(`Class "${name1}" already added no need to add one more time`)
    // }
// }

// Remove class..
// HTMLElement.prototype.classList.remove = function(name1) {
//     if(this.classList.contains(name1)) {
//         this.classList.remove(name1);
//     } 
//     // else {
//     //     console.info(`Class "${name1}" do not exist, so can not remove him`);
//     // }
// }
//  Check element to contain specify class..
// HTMLElement.prototype.contains = function(name1) {
//     if(this.classList.contains(name1)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// #endregion
