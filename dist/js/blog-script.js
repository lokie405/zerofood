
"use strict";

window.addEventListener("DOMContentLoaded", function() {

    function autoAdjustWidth() {
        const maxWidth = (document.querySelector("img.btc__img").offsetWidth) * 0.88;
        const blockMetadata = document.querySelectorAll(".btc__text-wrapper .block__metadata");
        const maxSymbol = 10;
        blockMetadata.forEach(function(item) {  // => 
        // Cut down first and second name..
            const nameElem = item.querySelector(".metadata__item");
            const name = nameElem.innerText;
            let name1 = name.slice(0, name.indexOf(" "));
            let name2 = name.slice(name.indexOf(" "));
            if(name1.length >= maxSymbol) {
                name1 = name1.slice(0, maxSymbol) + "...";
            }
            if(name2.length >= maxSymbol) {
                name2 = name2.slice(0, maxSymbol) + "...";
            }
            nameElem.innerHTML = name1 + name2;
        // Width metadata maker
            const width = item.offsetWidth;
            // console.log("1 width: ", width);
            // console.log("2 maxWidth: ", maxWidth);
            // const heightItem = item.querySelector(".metadata__item").offsetHeight;
            // console.log(heightItem);
            if(width > maxWidth) {
                item.classList.add("metadata_small");
                // console.log("3 LESS");
            } else {
                item.classList.remove("metadata_small");
            }
        })
    }

    autoAdjustWidth();

})