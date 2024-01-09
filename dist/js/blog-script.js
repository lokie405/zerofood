
"use strict";

window.addEventListener("DOMContentLoaded", function() {

    function blogStyleConected() {
        const urlObject = new URL (window.location);  // "localhost:3000/"
        const styleKind = urlObject.searchParams.get("style");

        if(styleKind === "one column") {
            document.querySelector("#blog").classList.add("one-column")
        }
        if(styleKind === "two columns") {
            document.querySelector("#blog").classList.add("two-columns")
        }
    }

    
    function autoAdjustWidth() {
        const maxWidth = (document.querySelector("img.blog__img").offsetWidth) * 0.88;
        const blockMetadata = document.querySelectorAll(".blog__text-wrapper .block__metadata");
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
            if(width > maxWidth) {
                item.classList.add("metadata_small");
            } else {
                item.classList.remove("metadata_small");
            }
        })
    }

    blogStyleConected();
    autoAdjustWidth();

})