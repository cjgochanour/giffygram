import {
    getCurrentUser,
    getDisplayMessages,
    getUsers,
    setChosenUser,
    setDisplayMessageCreateTrue,
    setDisplayMessagesTrue,
    getDisplayMessageCreate,
    getDisplayPostCreate,
    setDisplayPostCreateTrue,
    getDisplayNavBar,
    setDisplayNavBarTrue,
    setDisplayNavBarFalse,
    setPostsFeedStateUser,
    setPostsFeedStatePosts,
    setDisplayFavoritesTrue,
    setDisplayFavoritesFalse,
    setChosenYear,
} from "../dataAccess.js";
import { Notification } from "./Notification.js";
import { msgOpen } from "../messages/MessageSideBar.js";
import { msgWriteOpen } from "../messages/MessageCreate.js";

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();
    const currentYear = new Date().getFullYear();
    let yearHTML = "";
    for (let x = currentYear; x >= 2021; x--) {
        yearHTML += `<option value="${x}">${x}</option>`;
    }

    // we'll add specific images later
    return `
        <img class="navbarItem navColBtn" id="navColBtn" src="images/betaLogo.png" alt="AltText" width="50px" />
        <section class="navbarCollapse navbarItem">
            <div id="homeBtn" class="navcolItem navHomeBtn"><img class="navHomeBtn" src="images/betaLogo.png" alt="AltText" width="50px" />Home</div>
            <div id="userBtn" class="navcolItem navUserBtn"><img class="navUserBtn" src="images/betaLogo.png" alt="AltText" width="50px" />${
                currentUser.firstName
            } ${currentUser.lastName}</div>
            <div id="notification" class="navcolItem notification notificationBtn">${Notification()}</div>
            <div id="writeMessageBtn" class="navcolItem writeMsgBtn"><img class="writeMsgBtn" src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</div>
            <div id="postGifBtn" class="navcolItem postGifBtn"><img class="postGifBtn" src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</div>
            <div id="filterLikeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Filter By Likes</div>
            <select id="filterDropDown" class="navcolItem dropDown">
                    <option value="0">Show All Posts</option>
                    ${users
                        .map((user) => {
                            return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`;
                        })
                        .join("")}
            </select>
            <select id="yearDropDown" class="navcolItem dropDown">
                <option value="0">Show All Years</option>
                ${yearHTML}
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

//clicking the home button rerenders the main page with post list being rendered.
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("navHomeBtn")) {
        setPostsFeedStatePosts();
        mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
    }
});

//clicking the user name rerenders postsFeed with userProfile
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("navUserBtn")) {
        setPostsFeedStateUser();
        mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
    }
});

//clicking compose message will open up messages side bar and messageCreate
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("writeMsgBtn")) {
        //open up messageSideBar if it is closed
        if (!getDisplayMessages()) {
            msgOpen();
            setDisplayMessagesTrue();
        }

        //open up the messageCreate form if it is closed
        if (!getDisplayMessageCreate()) {
            msgWriteOpen();
            setDisplayMessageCreateTrue();
        }
    }
});

//clicking post gif will pull up the postcreate form
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("postGifBtn")) {
        if (!getDisplayPostCreate()) {
            document.querySelector(".postCreate").style.visibility = "visible";
            setDisplayPostCreateTrue();
        }
    }
});

//filter by favorite button
mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "favFilter") {
        if (event.target.checked) {
            setDisplayFavoritesTrue();
            mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
        } else {
            setDisplayFavoritesFalse();
            mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
        }
    }
});

//sets chosen year from dropdown
mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "yearDropDown") {
        setChosenYear(parseInt(event.target.value));
        mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
    }
});
