

document.addEventListener("DOMContentLoaded", play);


function play() {
 
// #region ====// C L A S S //=============================================================================================
    // class Element {
    //     constructor(selector){
    //         // constructor(super);
    //         this._elem = document.querySelector(selector);
    //         return this._elem;
    //     }
        
    //     addClass(name){
    //         if(this._elem.classList.contains(name)) {
    //             console.log(`class: ${name} - exist, so do not need to add this class`);
    //         } else {
    //             this._elem.classList.add(name);
    //         }
    //     }
    //     removeClass(name) {
    //         if(this._elem.classList.contains(name)) {
    //             this._elem.classList.remove(name);
    //         } else {
    //             console.log(`class: ${name} - so, nothing to remove`);
    //         }
    //     }
    //     toggleClass(name) {
    //         if(this._elem.classList.contains(name)) {
    //             this._elem.classList.remove(name);
    //         } else {
    //             this._elem.classList.add(name);
    //         }
    //     }
    //     // switchClass(name1, name2) {
    //     //     if(this.classList.contains(name1)) {
    //     //         this.classList.remove(name1);
    //     //         this.classList.add(name2);
    //     //         console.info(`Class ${name1} switched to ${name2}` )
    //     //     } else {
    //     //         this.classList.remove(name2);
    //     //         this.classList.add(name1);
    //     //         console.info(`Class ${name2} switched to ${name1}` )

    //     //     }
        // }

        // addEvent(event, callback) {
        //     this._elem.addEventListener(event, callback);
        // }
        // onOver(callback) {
        //     this.elem.addEventListener("mouseover", callback);
        // }
        // onOut(callback) {
        //     this.elem.addEventListener("mouseout", callback);
        // }
    // }
    
 // #endregion

 // #region ====// I N I T   E L E M E N T // ==============================================================================================
    const nav = {
        hamburger: document.querySelector(".hamburger"),
        close: document.querySelector(".close__btn"),
        overlay: document.querySelector("#navigation__overlay"),
        navItemsTitle: document.querySelectorAll(".nav-menu__item-title"),
        items: document.querySelector(".nav_item"),
        subitems: document.querySelectorAll(".nav_subitem"),
        homeList: document.querySelector(".home__items"),
        menuList: document.querySelector(".menu__items"),
        buttonUp: document.querySelector("#button_up"),
    }
 // #endregion

 // #region ====// D O //================================================================================================================
    function initNav() {
    // Show and hide nav-menu panel..
        nav.hamburger.addEventListener("click", function() {
            nav.overlay.showElementWithAnim("animate__fadeIn");
        })
        nav.close.addEventListener("click", function() {
            nav.overlay.hideElementWithAnim("animate__fadeOut");
            hideNavSubitems();
        })
    //  Show / Hide subitem on click..
        nav.navItemsTitle.forEach(menuItem => {
            menuItem.addEventListener("click", function() {
                const sublist = this.nextElementSibling;
                if (sublist.classList.contains("invisible")) {
                    sublist.showElementWithAnim("animate__fadeIn");
                    this.classAdd("nav-menu__item-title_active");
                } else {
                    sublist.hideElementWithAnim("animate__fadeIn", 50);
                    this.classRemove("nav-menu__item-title_active");
                }
            })
        })
    // Hide overlay when choose subitem..
        nav.subitems.forEach(subitem => {
            subitem.addEventListener("click", function() {
                nav.overlay.hideElementWithAnim("animate__fadeOut");
                hideNavSubitems();
            })
        });
    }

    function initUp() {

        // console.log(typeof(nav.buttonUp));
        // console.log(typeof("str") == "string");

        window.addEventListener("scroll", function () {
            up();

        });
        
        function up() {
        // Scroll to up execute..
            nav.buttonUp.addEventListener("click", function() {
                linkTo(nav.overlay);
            })
        // Check window position to show / hide up-button..
            if(window.pageYOffset > window.innerHeight) {
                if(nav.buttonUp.contains("invisible")){
                    nav.buttonUp.showElementWithAnim("animate__fadeIn");
                }
            } else {
                if(!nav.buttonUp.contains("invisible")) {
                    nav.buttonUp.hideElementWithAnim("animate__fadeOut");

                }

            }
        }
        // up();
        
    }
    
    function test() {
        // window.addEventListener("scroll", function (e) {
        //     console.info("scroll: ", e.target);
        // })
    }
    
 // #endregion

 // #region ====// P L A Y //=============================================================================================================
 initUp();
 initNav();
    test();
 // #endregion

 // #region ====// P L U G I N //========================================================================================================

 
 // Switch element class..
    HTMLElement.prototype.switchClass = function (name1, name2) {
        if(this.contains(name1)) {
            this.classRemove(name1);
            this.classAdd(name2);
            console.info(`Class ${name1} switched to ${name2}` )
        } else {
            this.classRemove(name2);
            this.classAdd(name1);
            console.info(`Class ${name2} switched to ${name1}` )
        }
    }
 // Add one remove second class..
    HTMLElement.prototype.classAddRemove = function(name1, name2) {
        if(!this.contains(name1)) {
            this.classAdd(name1);
        }
        this.classRemove(name2);
    }
    
 // Add class and then after 250ms remove they..
    HTMLElement.prototype.addOneRemoveOne = function (name1, time = 701) {
        if(!this.contains(name1)) {
            this.classAdd(name1);
            setTimeout(() => {
                this.classRemove(name1);
            }, time);
        }
    }

 //  Show element with animation..
    HTMLElement.prototype.showElementWithAnim = function(anim, time = 700) {
        
        this.classRemove("invisible");
        this.classAdd("visible");
        this.classAdd(anim);
        setTimeout(() => {
            this.classRemove(anim);
        }, time);
    }
 //  Hide element with animation..
    HTMLElement.prototype.hideElementWithAnim = function(anim, time = 700) {
            this.classAdd(anim);
            setTimeout(() => {
                this.classRemove(anim);
                this.classRemove("visible");
                this.classAdd("invisible");
                // resolve();
            }, time);

    }
 //  Hide all expanded subElement in nav-item list..
    function hideNavSubitems () {
        nav.navItemsTitle.forEach(menuItem => {
                const sublist = menuItem.nextElementSibling;
                if (!sublist.classList.contains("invisible")) {
                    console.log("!invisible");
                    sublist.hideElementWithAnim("animate__fadeIn", 50);
                    menuItem.classRemove("nav-menu__item-title_active");
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
    //     this.classAdd(name2);
    //     this.classAdd(name1);
    //     setTimeout(() => {
    //         this.classRemove(name1);
    //         this.classRemove(name3);
    //     }, time);
    // }


 // Mains:..
 // Add class..
    HTMLElement.prototype.classAdd = function(name1) {
        if(!this.classList.contains(name1)) {
            this.classList.add(name1);
        } else {
            console.info(`Class "${name1}" already added no need to add one more time`)
        }
    }

 // Remove class..
    HTMLElement.prototype.classRemove = function(name1) {
        if(this.classList.contains(name1)) {
            this.classList.remove(name1);
        } else {
            console.info(`Class "${name1}" do not exist, so can not remove him`);
        }
    }
 //  Check element to contain specify class..
    HTMLElement.prototype.contains = function(name1) {
        if(this.classList.contains(name1)) {
            return true;
        } else {
            return false;
        }
    }

// #endregion
}
