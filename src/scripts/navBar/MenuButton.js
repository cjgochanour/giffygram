import {getDisplayNavBar, setDisplayNavBarFalse, setDisplayNavBarTrue } from "../dataAccess.js";

export const MenuButton = () => {
    if (getDisplayNavBar()) {
        return `<img class="navbarItem navColBtn" id="navColBtn" src="images/Icons/nav-bar-slide-in.png" alt="AltText" width="50px" />`;
    } else {
        return `<img class="navbarItem navColBtn navBtn" id="navColBtn" src="images/Icons/nav-bar-slide-out.png" alt="AltText" width="50px" />`
    }
}

const mainContainer = document.querySelector(".beta");

//collapse functions
export const navOpen = () => {
    document.querySelector(".navbarCollapse").style.width = "175px";
    document.querySelector(".postFeed").style.marginLeft = "175px";
    document.querySelector(".menuButton").style.left = "175px";
};

export const navClose = () => {
    document.querySelector(".navbarCollapse").style.width = "0";
    document.querySelector(".postFeed").style.marginLeft = "0";
    document.querySelector(".menuButton").style.left = "0";
};

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "navColBtn") {
        if (getDisplayNavBar()) {
            navClose();
            setDisplayNavBarFalse();
            document.querySelector(".menuButton").innerHTML = MenuButton();
        } else {
            navOpen();
            setDisplayNavBarTrue();
            document.querySelector(".menuButton").innerHTML = MenuButton();
        }
    }
});