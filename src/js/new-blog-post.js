
"use strict";

window.addEventListener("DOMContentLoaded", scriptMain);

function scriptMain () {

    const tooltip = document.querySelector(".tooltip");
    const fieldsetTitle = document.querySelector(".fieldset__title");
    const titleInput = fieldsetTitle.querySelector("#input__title");
    const infoTitle = fieldsetTitle.querySelector(".hint__info");
    const requireTitle = fieldsetTitle.querySelector(".hint__require");


    const info = {
        title: "Name of blog post.",
        titleImg: "Image to view on heead. Must be min 400x800.",
        otherImg: "Image with associating with post theme. At least 3 image in good quolitty",
    }
    const require = "Field is require!"

    infoTitle.addEventListener("mouseover", function(e){showTooltip(info.title)});
    infoTitle.addEventListener("mouseout", function(e){hideTooltip()});
    infoTitle.addEventListener("click", function(e){toogleTooltip(info.title)});
    requireTitle.addEventListener("mouseover", function(e){showTooltip(require)});
    requireTitle.addEventListener("mouseout", function(e){hideTooltip()});
    requireTitle.addEventListener("click", function(e){toogleTooltip(require)});
    
    function showTooltip(hint) {
        const x = event.clientX + window.pageXOffset;
        const y = event.clientY + window.pageYOffset;
        // console.log("x: ", x, "; y: ", y, event);
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - 40}px`;
        tooltip.style.display = "block";
        tooltip.innerText = hint;
    }

    function hideTooltip() {
        tooltip.style.display = "none";
        console.log("HIDE");
    }

    function toogleTooltip(hint) {
        event.stopPropagation();
        showTooltip(hint);
        setTimeout(() => {
            hideTooltip();
        }, 2000);
    }
}


