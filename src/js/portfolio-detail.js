"use strict"
import { portfolio, arrExt } from "../js/portfolio.js";
// const fs = require('fs');
// const path = require('path');

window.addEventListener("DOMContentLoaded", executeScript);

async function executeScript() {
    Array.prototype.last = function (){
        this[length - 1];
    }

    /**
     * Define object to work on it:
     */
    const title = new URL(window.location.href).searchParams.get("name");
    const postPosition = portfolio.findIndex(elem => elem.name === title);
    const post = portfolio[postPosition];
    
    /**
     * Title action:
    */
    const portfolioTitle = document.querySelector(".headline__title.headline_1");
    const portfolioScroll = document.querySelector(".scroll_portfolio-grids");
    portfolioTitle.innerText = post.name;
    portfolioScroll.style.opacity = "1";


    fetch("./php/load_post_image.php", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"data" : post.pathImg}),
    })
    .then(response => {
        const resp = response.json();
        return resp;
    })
    .then(data => {
        const pattern = new RegExp(`^${1}.|${2}.|${3}.`);
        const images = data.filter(item => item.match(pattern));

        smallInit(images[0]);
        middleInit(images[1]);
        bigInit(images[2]);
    })
    .catch(error => {
        console.error("Error fetch: ", error);
    })

    navInit(postPosition);

    /**
     * Small-cell action:
    */
   function smallInit(image) {
        const detailCellSmall = document.querySelector(".detail__cell_small");
        const img = document.createElement("img");
        img.classList.add("detail__img","detail__img_small");
        img.src = post.pathImg + image;
        img.alt = "image 1";
        const descWrapper = document.createElement("div");
        descWrapper.classList.add("desc__wrapper");
        const headlineDetail = document.createElement("div");
        headlineDetail.classList.add("headline_detail", "headline__detail_small", "headline_detail");
        const headlineTitle = document.createElement("h4");
        headlineTitle.classList.add("headline__title", "headline_4");
        headlineTitle.innerText = post.introTitle;
        const headlineText = document.createElement("p");
        headlineText.classList.add("headline__text", "text_body");
        headlineText.innerText = post.introText;
        const detailDesc = document.createElement("p");
        detailDesc.classList.add("detail__desc", "detail__desc_small", "text_body");
        detailDesc.innerText = post.introDesc;

        headlineDetail.appendChild(headlineTitle);
        headlineDetail.appendChild(headlineText);
        descWrapper.appendChild(headlineDetail);
        descWrapper.appendChild(detailDesc);
        detailCellSmall.appendChild(img);
        detailCellSmall.appendChild(descWrapper);
    }

    /**
     * Middle-cell action:
     */
    function middleInit(image) {
        const detailCellMiddle = document.querySelector(".detail__cell_middle");
        detailCellMiddle.innerHTML = 
        `
        <img src="${post.pathImg + image}" alt="image 2" class="detail__img detail__img_middle">
        <div class="headline_detail headline__detail_middle headline_detail">
            <h4 class="headline__title headline_4">${post.tasteTitle}</h4>
            <p class="headline__text text_body">${post.tasteDesc}</p>
        </div>
        <p class="detail__desc detail__desc_middle text_body">${post.tasteText}</p>`
    }

    /**
     * Big-cell action:
     */
    function bigInit(image) {
        const detailCellBig = document.querySelector(".detail__cell_big");
        detailCellBig.innerHTML = 
        `
        <div class="headline_detail headline__detail_big headline_detail">
            <h4 class="headline__title headline_4">${post.suggestionTitle}</h4>
            <p class="headline__text text_body">${post.suggestion}</p>
        </div>
        <img src="${post.pathImg + image}" alt="${post.alt}" class=" detail__img detail__img_big"> 
        `
    }
    
    /**
     * Navigation init:
     */
    function navInit(position) {
        const previousPage = document.querySelector(".previous-page");
        const previousTitle = previousPage.querySelector(".navigation__title");
        const backToGrid = document.querySelector(".back-to-grid");
        const nextPage = document.querySelector(".next-page");
        const nextTitle = nextPage.querySelector(".navigation__title");

        const prevPos = position > 0 ? position - 1 : portfolio.length - 1;
        previousTitle.innerText = portfolio[prevPos].name;
        const nextPos = position < portfolio.length - 1 ? position + 1 : 0;
        nextTitle.innerText = portfolio[nextPos].name;
        
        previousPage.addEventListener("click", () => {
            const url = new URL(window.location.origin + "/dist/portfolio-detail.html");
            const titleName = portfolio[prevPos].name;
            url.searchParams.append("name", titleName);
            window.location.href = url;
        })

            
        backToGrid.addEventListener("click", () => {
            window.location.href = window.location.origin + "/dist/portfolio-grids.html";
        })
        const urlToPostNext = new URL(window.location.origin + "/dist/portfolio-detail.html");
        urlToPostNext.searchParams.append("name", portfolio[nextPos].name);

        nextPage.addEventListener("click", () => {
            const url = new URL(window.location.origin + "/dist/portfolio-detail.html");
            const titleName = portfolio[nextPos].name;
            url.searchParams.append("name", titleName);
            
            // console.log("nextEVNAME", portfolio[prevPos].name);
            window.location.href = url;
            portfolioScroll.style.opacity = "0";
            portfolioTitle.innerText = "";

        })
            
    }


    /**
     * Utility
     */


}