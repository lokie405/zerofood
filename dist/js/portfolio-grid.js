"use strict"
import { portfolio, arrFilters } from "../js/portfolio.js";

document.addEventListener("DOMContentLoaded", executeScript);

function executeScript() {
    const filtersContainer = document.querySelector(".filters__items");
    
    /**
     * Filter section:
     */
    arrFilters.forEach(function (filter, position) {
        const elemFilter = document.createElement("li");
        elemFilter.classList.add("filter__item", "text_filter");
        elemFilter.innerText = filter;
        elemFilter.addEventListener("click", filterClick.bind(this, position));
        filtersContainer.appendChild(elemFilter);
    });

    let allElemFilters = document.querySelectorAll(".filter__item");
    allElemFilters = Array.from(allElemFilters);
    allElemFilters[0].classList.add("active");

    function filterClick(position) {
        allElemFilters.forEach(function (elem) {
            elem.classList.remove("active");
        })
        allElemFilters[position].classList.add("active");
        displayFiltered(arrFilters[position]);
    }

    function displayFiltered(target) {
        const arrCoinsidence = target === arrFilters[0] ? [...portfolio] : prepareFilter(target);
        display(arrCoinsidence);
    }
    function prepareFilter(target) {
        const arrCoinsidence = [];
        portfolio.forEach(item => {
            item.labels.forEach(label => {
                if (label === target) {
                    arrCoinsidence.push(item);
                    return;
                }
            })
        })
        return arrCoinsidence;
    }

     /**
    * Started 
    */
     filterClick(0);

    /* #region  m*/
    function display(items) {
        const portfolioGrid = document.querySelector(".portfolio__grid");
        portfolioGrid.classList.add("portfolio__grid");
        while (portfolioGrid.firstElementChild) {
            portfolioGrid.removeChild(portfolioGrid.firstElementChild);
        }
        let countItems = items.length;
        const pairItems = Math.ceil(countItems / 2);

        let cuurentItemPos = 0;
        for (let i = 0; i < pairItems; i++) {
            const postsWrapper = document.createElement("div");
            postsWrapper.classList.add("posts__wrapper");
            const itemsInPair = countItems - i * 2 > 1 ? 2 : 1;
            for (let j = 0; j < itemsInPair; j++) {
                const postsCell = document.createElement("div");
                postsCell.classList.add("posts__cell");
                switch (itemsInPair) {
                    case 1:
                        postsCell.classList.add("width_1p2", "center");
                        break;
                    case 2:
                        if(i % 3 === 0) {
                            j === 0 ? postsCell.classList.add("width_2p3") : postsCell.classList.add("width_1p3");
                        } else if (i % 3 === 1) {
                            j === 0 ? postsCell.classList.add("width_1p3") : postsCell.classList.add("width_2p3");
                        } else if(i % 3 === 2) {
                            postsCell.classList.add("width_1p2");
                        }
                        break;
                }

                inflatePostsCell(postsCell, items[cuurentItemPos]);
                postsWrapper.appendChild(postsCell);
                cuurentItemPos++;
            }  // Item in pair
            portfolioGrid.appendChild(postsWrapper);
        }  // Pair
    }
    /* #endregion */

    function inflatePostsCell(cell, item){
        const postsImg = document.createElement("img");
        postsImg.classList.add("posts__img");
        postsImg.src = item.pathImg + item.coverImg;
        postsImg.alt = item.name;

        const postsHeadline = document.createElement("div");
        postsHeadline.classList.add("headline_posts");

        const postsTitle = document.createElement("a");
        postsTitle.classList.add("posts__title", "headline_4");
        const urlToPost = new URL(window.location.origin + "/dist/portfolio-detail.html");
        // console.log(window.location.origin);
        urlToPost.searchParams.append("name", item.name);
        // console.log(item.name);
        postsTitle.href = urlToPost;
        postsTitle.innerText = item.name;

        const postsLabels = document.createElement("div");
        postsLabels.classList.add("posts__labels");

        for(let i = 0; i < item.labels.length; i++) {
            const label = document.createElement("span");
            label.addEventListener("click", filterClick.bind(this, arrFilters.indexOf(item.labels[i])));
            label.classList.add("label", "text_body");
            label.innerText = item.labels[i];
            postsLabels.appendChild(label);
        }

        postsHeadline.appendChild(postsTitle);
        postsHeadline.appendChild(postsLabels);

        cell.appendChild(postsImg);
        cell.appendChild(postsHeadline);
    }

}