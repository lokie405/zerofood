
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
        "One short sentence, description of post.",
        "Image to view on heead. Must be min 400x800.",
        "Image with associating with post theme. At least 3 image in good quolitty.",
        "Tell how you come to topic.",
        "Start open the topic.",
        "Some quote that associated you to topic.",
        "Author of quote.",
        "Tell conclusion for post.",
        "Select tags to describe the post.",
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

    function blinkColor(elem, param){
        const colors = ["white", "black"];
        let curColorIndex = 0;
        setInterval(function() {
            setInterval(() => {
                elem.style[param] = colors[curColorIndex];
                curColorIndex = (curColorIndex + 1) % colors.length;
            }, 500);
        }, 2000)
    }
    /* #endregion */

    /* #region  Image upload */
        const fieldTitleImg = document.querySelector(".fieldset__title-img");
        const inputTitleImg = document.querySelector(".title-img__input");
        const svgUploadTitle = fieldTitleImg.querySelector(".upload__svg");

        fieldTitleImg.addEventListener("click", function(e) {
            if(e.target.tagName === "FIELDSET") {
                inputTitleImg.click();
            }
        });

        inputTitleImg.addEventListener("change", ({target}) => {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);

            reader.addEventListener("load", function (eve){
                svgUploadTitle.style.display = "none";
                const wrap = document.createElement("div");
                wrap.style.height = "100%";
                wrap.style.width = "100%";
                wrap.style.position = "relative";
                const img = document.createElement("img");
                img.src = eve.target.result;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";
                const closeImg = document.createElement("div");
                closeImg.classList.add("close__img", "headline_5");
                closeImg.innerHTML = "×";
                closeImg.addEventListener("click", function (e){
                    e.stopPropagation();
                    this.parentElement.remove();
                    svgUploadTitle.style.display = "block";
                    inputTitleImg.value = null;
                });
                wrap.appendChild(img);
                wrap.appendChild(closeImg);
                fieldTitleImg.appendChild(wrap);
            })

        })

        const fieldOtherImg = document.querySelector(".fieldset__other-img");
        const inputOtherImg = document.querySelector(".input__other-img");
        const svgUploadOther = fieldOtherImg.querySelector(".upload__svg");
        let fileOtherImg = [];

        fieldOtherImg.addEventListener("click", fieldOtherClick, {once: true});
        inputOtherImg.addEventListener("change", inputOtherChange);
        
        function fieldOtherClick (event) {
            if(fileOtherImg.length < 6) {
                inputOtherImg.click();
            } else {
                showToast("Maximum 6 image.");
            }
            fieldOtherImg.removeEventListener("click", fieldOtherClick);
            fieldOtherImg.addEventListener("click", fieldOtherClick, {once: true});
        }

        async function inputOtherChange(event) {
            for(let i = 0; i < inputOtherImg.files.length; i++){  // If add more then one file at once
                if (fileOtherImg.length < 6) {
                    let dublicat = 0;
                    fileOtherImg.forEach(elem => {
                        if(elem.name === inputOtherImg.files[i].name) {
                            dublicat++;
                        }
                    });
                    if(!dublicat) {
                        fileOtherImg.push(inputOtherImg.files[i]);
                    } else showToast(`"${inputOtherImg.files[i].name}" already added.`);
                } else showToast("Maximum 6 image.");
            }
            
            if(fileOtherImg.length > 0 && fileOtherImg.length <= 6) {
                while(fieldOtherImg.querySelector("div")){
                    fieldOtherImg.removeChild(fieldOtherImg.querySelector("div"));
                }
                fieldOtherImg.style.display = "flex";
                for (let i = 0; i < fileOtherImg.length; i++) {
                  await createPrevious(fileOtherImg[i], i);
                }
            }
            
           async function createPrevious(element, index) {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.addEventListener("load", loadFileReader);
                    reader.readAsDataURL(element);

                    function loadFileReader(event) {
                        svgUploadOther.style.display = "none";
                        const wrap = document.createElement("div");
                        wrap.style.height = "100%";
                        wrap.style.width = "100%";
                        wrap.style.position = "relative";
                        wrap.dataset.name = element.name;
                        const img = document.createElement("img");
                        img.src = event.target.result;
                        img.style.width = "100%";
                        img.style.height = "100%";
                        img.style.objectFit = "cover";
                        img.alt = event.target.name;
                        const closeImg = document.createElement("div");
                        closeImg.classList.add("close__img", "headline_5");
                        closeImg.innerHTML = "×";
                        closeImg.addEventListener("click", function (e){
                            e.stopPropagation();
                            this.parentElement.remove();
                            fileOtherImg.length === 1 ? svgUploadOther.style.display = "block" : "";
                            inputTitleImg.value = null;
                            let index;
                            fileOtherImg.forEach(elem => {
                                if(this.parentElement.dataset.name === elem.name) {
                                    index = fileOtherImg.indexOf(elem);
                                    return;
                                }
                            });
                            fileOtherImg.splice(index, 1);
                            inputOtherImg.value = null;
                        });
                        wrap.appendChild(img);
                        wrap.appendChild(closeImg);
                        fieldOtherImg.appendChild(wrap);
                        inputOtherImg.value = null;

                        resolve();
                    }
                })
            }
        }

        function showToast(message) {
            const toast = document.createElement("div");

            toast.classList.add("toast", "text_body");
            toast.innerHTML = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 2000);

        }
    /* #endregion */


    /* #region  Form check */
    const submit = formUpload.querySelector(".button_submit");
    const requireInputs = formUpload.querySelectorAll(".input__require");

    submit.addEventListener("click", function (event) {
        event.preventDefault();
        submitPostForm();
        // validateForm() ? submitPostForm() : console.log("errort");
    })

    function validateForm() {
        let isValid = true;
        requireInputs.forEach(element => {
            if(!findInvalid(element)) {
                isValid = false;  
            }
        });
        return isValid;
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

    function submitPostForm() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/upload_post.php");
        const form = new FormData(formUpload);
         // Set up the callback function to handle the response
        //  console.log("FILE 2COUNT: ", form)
        // console.log("FORM: ", form.getAll("post_tags"));
        form.set("post_other-imgs", "");
         fileOtherImg.forEach(image => {
            form.append("post_other-imgs[]", image);
            // let other = form.get("post_other-imgs[]");
         });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // document.getElementById("result").innerHTML = xhr.responseText;
                console.log("Result: ", xhr.responseText);
                const resp = document.querySelector(".insert_response");
                resp.style.backgoundColor = "red";
                resp.innerHTML = xhr.responseText;
            }
        };
        xhr.send(form);
    }
    /* #endregion */

}


