
"use strict";

window.addEventListener("DOMContentLoaded", scriptMain);

function scriptMain() {

    /* #region  Tooltip */
    const formUpload = document.querySelector("#upload__form");
    const tooltip = document.querySelector(".tooltip");
    const infoTooltips = document.querySelectorAll(".hint__info");
    const requireTooltips = document.querySelectorAll(".hint__require");

    const info = [
        "Name of blog post.",
        "Image to view on heead. Must be min 400x800.",
        "Image with associating with post theme. At least 3 image in good quolitty.",
        "Tell how you come to topic.",
        "Start open the topic.",
        "Some quote that associated you to topic.",
        "Author of quote.",
        "Tell conclusion for post.",
    ]
    const require = "Field is required."

    requireTooltips.forEach(function (elem) {
        elem.addEventListener("mouseover", function (e) { showTooltip(require) });
        elem.addEventListener("mouseout", function (e) { hideTooltip() });
        elem.addEventListener("click", function (e) { toogleTooltip(require) });
    })
    infoTooltips.forEach(function (elem, pos) {
        elem.addEventListener("mouseover", function (event) { showTooltip(info[pos]) });
        elem.addEventListener("mouseout", function (event) { hideTooltip() });
        elem.addEventListener("click", function (event) { toogleTooltip(info[pos]) });
    })

    function showTooltip(hint) {
        const rect = event.target.getBoundingClientRect();
        const x = rect.right + window.pageXOffset;
        const y = rect.top + window.pageYOffset;
        tooltip.style.right = `calc(100% - ${x}px + ${rect.width}px)`;
        tooltip.style.top = `${y - rect.height}px`;
        tooltip.style.display = "block";
        tooltip.innerHTML = hint;
    }

    function hideTooltip() {
        tooltip.style.display = "none";
    }

    function toogleTooltip(hint) {
        event.stopPropagation();
        showTooltip(hint);
        setTimeout(() => {
            hideTooltip();
        }, 2000);
    }
    /* #endregion */

    /* #region  Image upload */
        const fieldTitleImg = document.querySelector(".fieldset__title-img");
        const inputTitleImg = document.querySelector(".title-img__input");
        const svgUploadTitle = fieldTitleImg.querySelector(".upload__svg");

        fieldTitleImg.addEventListener("click", function(e) {
            if(e.target.tagName === "FIELDSET") {
                console.log("inputTitleImg.click()")
                inputTitleImg.click();

            }
        });

        inputTitleImg.addEventListener("change", ({target}) => {
            const reader = new FileReader();

            reader.addEventListener("load", function (eve){
                svgUploadTitle.style.display = "none";
                const imgWrap = document.createElement("div");
                imgWrap.classList.add("wrap__img-display");
                const imgDisplay = document.createElement("img");
                imgDisplay.src = eve.target.result;
                imgDisplay.classList.add("display__title-img");
                const closeImg = document.createElement("div");
                closeImg.classList.add("close__img", "headline_5");
                closeImg.innerHTML = "✖︎";
                closeImg.addEventListener("click", function (e){
                    e.stopPropagation();
                    imgWrap.remove();
                    svgUploadTitle.style.display = "block";
                    inputTitleImg.value = null;
                })

                imgWrap.appendChild(imgDisplay);
                imgWrap.appendChild(closeImg);
                fieldTitleImg.appendChild(imgWrap);
            })

            reader.readAsDataURL(target.files[0]);
        })

        let clickCount = 0;
        const fieldOtherImg = document.querySelector(".fieldset__other-img");
        const inputOtherImg = document.querySelector(".input__other-img");
        const svgUploadOther = fieldOtherImg.querySelector(".upload__svg");
        let fileOtherImg = [];

        fieldOtherImg.addEventListener("click", fieldOtherClick, {once: true});
        inputOtherImg.addEventListener("change", inputOtherChange)
        let inputClick = 0;
        let changeClick = 0;
        function fieldOtherClick (event) {
            // console.log(event.target);
            changeClick = 0;
            inputOtherImg.click();
            inputClick++;
            console.log("input:", inputClick);
            fieldOtherImg.removeEventListener("click", fieldOtherClick);
            fieldOtherImg.addEventListener("click", fieldOtherClick, {once: true});
        }

        function inputOtherChange(event) {
            // console.log("INFO width: ", );
            if(fileOtherImg.length < 6) {
                for(let i = 0; i < inputOtherImg.files.length; i++){
                    if (fileOtherImg.length < 6) {
                        fileOtherImg.push(inputOtherImg.files[i]);
                    }
                    // console.log("i = ", i);
                    // console.log("filesStore have: ", fileOtherImg.length);
                }

            }

            if(fileOtherImg.length > 0) {
                fileOtherImg.forEach(createPrevious);

            }

            function createPrevious(element, index, array) {
                // console.log("createPrev");
                const reader = new FileReader();
                reader.addEventListener("load", loadFileReader);
                reader.readAsDataURL(element);

                function loadFileReader(event) {
                    // console.log("YES");
                    svgUploadOther.style.display = "none";
                    const wrap = document.createElement("div");
                    wrap.style.height = "100%";
                    wrap.style.width = `${fieldOtherImg.offsetWidth/array.length}`;
                    wrap.style.display = "relative";
                    wrap.id = `wrapper__other-img_${index}`;
                    const img = document.createElement("img");
                    img.src = event.target.result;
                    img.classList.add("display__title-img");

                    wrap.appendChild(img);
                    fieldOtherImg.appendChild(wrap);

                }
            }
            // changeClick++;
            // console.log("change", changeClick);
            // console.log(event.target);

        }

        function showMassage() {
            console.log("MUTCH MORE")
        }
        // fieldOtherImg.addEventListener("click", (event) => {
        //     if(event.target.tagName === "FIELDSET") {

        //         clickCount++;
        //         console.log("inputOtherImg.click(): ", clickCount);
        //         inputOtherImg.click();

        //         inputOtherImg.addEventListener("change", (event) => {
        //             if(event.target.tagN === "INPUT") {
        //                 event.stopPropagation();
        //                 console.log("inputOtherImg.change")
        //                 for(let i = 0; i < inputOtherImg.files.length; i++) {
        //                     fileOtherImg.push(inputOtherImg.files[0]);
        //                     console.log("I: ", i);
        //                 }
        //                 console.log("input.files: ", inputOtherImg.files);
        //                 console.log("LENGTH inputOtherImg: ", fileOtherImg.length);
        //                 console.log("FileOther: ", fileOtherImg);


        //             }
        //             // const reader = new FileReader();
        //             // reader.addEventListener("load", (eve) => {
        //             //     svgUploadOther.style.display = "none";
        //             //     const imgCount = inputOtherImg.value;
        //             //     // console.log("imgCount", imgCount);
        //             // });
                    
        //         });




        //     }
        //     // if(inputOtherImg.files.length < 6) {
        //         // addImage();
        //         // function addImage() {
        //                     // console.log("length", inputOtherImg.files.length);
        //                     // const oldInput = fieldOtherImg.querySelector(".input__other-img");
        //                     // const newInput = document.createElement("input");
        //                     // newInput.type = "file";
        //                     // newInput.multiple = true;
        //                     // newInput.hidden = true;
        //                     // newInput.classList.add("input__other-img", "input__require");
        //             // newInput.name = "post_other-imgs[]";
        //             // newInput.click();
        //         // }
                


        //         // inputOtherImg.parentNode.replaceChild(newInput, oldInput);
                
        //         // newInput.click();
                
        //     // }

        // });
    /* #endregion */


    /* #region  Form check */
    const submit = formUpload.querySelector(".button_submit");
    const requireInputs = formUpload.querySelectorAll(".input__require");

    submit.addEventListener("click", function (event) {
        event.preventDefault();
        validateForm();
    })

    function validateForm() {
        requireInputs.forEach(element => {
            findInvalid(element);
        });
    }

    function findInvalid(elem, note) {
        let isValid = true;
        if (!elem.value) {
            isValid = false;
            elem.parentElement.classList.add("invalid");
        } else {
            elem.parentElement.classList.contains("invalid") ? elem.parentElement.classList.remove("invalid") : "";
        }
        return isValid;
    }
    /* #endregion */

}


