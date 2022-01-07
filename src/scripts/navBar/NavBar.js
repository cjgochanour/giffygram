import {
    getCurrentUser,
    getUsers,
    setChosenUser,
    getDisplayNavBar,
    setDisplayNavBarTrue,
    setDisplayNavBarFalse,
    setDisplayFavoritesTrue,
    setDisplayFavoritesFalse,
} from "../dataAccess.js";
import { Notification } from "./Notification.js";

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();

    // we'll add specific images later
    return `
        <img class="navbarItem navColBtn" id="navColBtn" src="images/betaLogo.png" alt="AltText" width="50px" />
        <section class="navbarCollapse navbarItem">
            <div id="homeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Home</div>
            <div id="userBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />${
                currentUser.firstName
            } ${currentUser.lastName}</div>
            <div id="notification" class="navcolItem notification notificationBtn">${Notification()}</div>
            <div id="writeMessageBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</div>
            <div id="postGifBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</div>
            <div id="filterLikeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Filter By Likes</div>
            <select id="filterDropDown" class="navcolItem">
                    <option value="0">Show All Posts</option>
                    ${users
                        .map((user) => {
                            return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`;
                        })
                        .join("")}
            </select>
            <input type="checkbox" class="navcolItem" id="favFilter">Filter By Favorite</select>
            <div id="logoutBtn" class="navcolItem"><img id="logoutImg" src="images/betaLogo.png" alt="AltText" width="50px" />Log Out</div>
        </section>
    `;
};

//grab items from dom
const mainContainer = document.querySelector(".beta");

//collapse functions
export const navOpen = () => {
    document.querySelector(".navbarCollapse").style.width = "10vw";
    document.querySelector(".postFeed").style.marginLeft = "10vw";
};

export const navClose = () => {
    document.querySelector(".navbarCollapse").style.width = "0";
    document.querySelector(".postFeed").style.marginLeft = "0";
};

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "navColBtn") {
        if (getDisplayNavBar()) {
            navClose();
            setDisplayNavBarFalse();
        } else {
            navOpen();
            setDisplayNavBarTrue();
        }
    }
});

//sends user to login page when logout button is clicked
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "logoutBtn" || clickEvent.target.id === "logoutImg") {
        localStorage.removeItem("beta_user");
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

//filter by user
mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "filterDropDown") {
        setChosenUser(parseInt(event.target.value));
        mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
    }
});

//filter by favorite button
mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "favFilter") {
        if (event.target.checked) {
            setDisplayFavoritesTrue();
            mainContainer.dispatchEvent(new CustomEvent("postListChanged"));
        } else {
            setDisplayFavoritesFalse();
            mainContainer.dispatchEvent(new CustomEvent("postListChanged"));
        }
    }
});
