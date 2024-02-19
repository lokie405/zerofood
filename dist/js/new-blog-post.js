
"use strict";

window.addEventListener("DOMContentLoaded", scriptMain);

function scriptMain() {

    /* #region  Tooltip */
    const formUpload = document.querySelector("#upload__form");
    const tooltip = document.querySelector(".tooltip");
    const labels = formUpload.querySelectorAll(".label__form-upload");
    const maxImageCount = 3;
    const arrInfo = [
        "Name of blog post.",
        "Image for top. Better if atleast min 400x800.",
        "Image with associating with post theme. At least 3 image in good quolitty.",
        "Tell how you come to topic.",
        "Start open the topic.",
        "Some quote that associated you to topic.",
        "Author of quote.",
        "Select tags to describe the post.",
    ]
    
    labels.forEach(showInfoSvg);
    
    function showInfoSvg(elem, pos) {
        const info = document.createElement("span");
        info.classList.add("icon-info-svgrepo-com-3", "info-tooltip__svg", "text_body");
        elem.insertAdjacentElement("beforeend", info);

        info.addEventListener("mouseover", function(event){showTooltip(arrInfo[pos])});
        info.addEventListener("mouseout", function(event){hideTooltip()});
    }

    function showTooltip(hint) {
        const rect = event.target.getBoundingClientRect();
        const x = rect.right + window.pageXOffset;
        const y = rect.top + window.pageYOffset;
        const border = window.getComputedStyle(tooltip).borderWidth.replace("px", "");
        tooltip.style.right = `calc(100% - ${x}px + ${rect.width}px)`;
        tooltip.style.top = `${y - rect.height}px`;
        tooltip.style.display = "block";
        tooltip.innerHTML = hint;
    }

    function hideTooltip() {
        setTimeout(() => {
            tooltip.style.display = "none";
        }, 500);
    }
    /* #endregion */

    /* #region  Image upload */

        // Title
        const uploadTitleImg = formUpload.querySelector(".upload__title-img");
        const inputTitleImg = document.querySelector(".title-img__input");
        const svgUploadTitle = document.querySelector(".upload__svg");

        uploadTitleImg.addEventListener("click", function(e) {  // Prevent click at already load image            
            e.stopPropagation();
            if(e.target.tagName === "DIV" || e.target.tagName === "SPAN") {
                inputTitleImg.click();
            }
        });

        inputTitleImg.addEventListener("click", e => {
            e.stopPropagation();
        });
        inputTitleImg.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

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
                    svgUploadTitle.style.display = "inline";
                    inputTitleImg.value = null;
                });
                wrap.appendChild(img);
                wrap.appendChild(closeImg);
                uploadTitleImg.appendChild(wrap);
            })

        })


        // Other
        const uploadOtherImg = document.querySelector(".upload__other-img");
        const inputOtherImg = document.querySelector(".input__other-img");
        const svgUploadOther = uploadOtherImg.querySelector(".upload__svg");
        let fileOtherImg = [];

        uploadOtherImg.addEventListener("click", uploadOtherClick, {once: true});
        inputOtherImg.addEventListener("change", inputOtherChange);
        
        function uploadOtherClick (event) {
            if(fileOtherImg.length < maxImageCount) {
                inputOtherImg.click();
            } else {
                showToast(`Maximum ${maxImageCount} image.`);
            }
            uploadOtherImg.removeEventListener("click", uploadOtherClick);
            uploadOtherImg.addEventListener("click", uploadOtherClick, {once: true});
        }

        async function inputOtherChange(event) {
            for(let i = 0; i < inputOtherImg.files.length; i++){  // If add more then one file at once
                if (fileOtherImg.length < maxImageCount) {
                    let dublicat = 0;
                    fileOtherImg.forEach(elem => {
                        if(elem.name === inputOtherImg.files[i].name) {
                            dublicat++;
                        }
                    });
                    if(!dublicat) {
                        fileOtherImg.push(inputOtherImg.files[i]);
                    } else showToast(`"${inputOtherImg.files[i].name}" already added.`);
                } else showToast(`Maximum ${maxImageCount} image.`);
            }
            
            if(fileOtherImg.length > 0 && fileOtherImg.length <= maxImageCount) {
                while(uploadOtherImg.querySelector("div")){
                    uploadOtherImg.removeChild(uploadOtherImg.querySelector("div"));
                }
                uploadOtherImg.style.display = "flex";
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
                            fileOtherImg.length === 1 ? svgUploadOther.style.display = "inline" : "";
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
                        uploadOtherImg.appendChild(wrap);
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
        form.set("post_other-imgs", "");
         fileOtherImg.forEach(image => {
            form.append("post_other-imgs[]", image);
         });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Result: ", xhr.responseText);
                const resp = document.querySelector(".insert_response");
                resp.style.backgoundColor = "red";
                resp.innerHTML = xhr.responseText;
            }
        };
        xhr.send(form);
    }
    /* #endregion */

    /**
     * Prevent some bugs (bublling effect)
     */
 window.addEventListener("click", (e) => {
    // console.log("target", e.target);
    if(e.target === formUpload.querySelector(".input__post_tag")) {
        e.preventDefault()
    }
})

}


