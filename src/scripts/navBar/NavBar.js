import {
    getCurrentUser,
    getDisplayMessages,
    getUsers,
    setChosenUser,
    getChosenUser,
    setDisplayMessageCreateTrue,
    setDisplayMessagesTrue,
    getDisplayMessageCreate,
    getDisplayPostCreate,
    setDisplayPostCreateTrue,
    setPostsFeedStateUser,
    setPostsFeedStatePosts,
    setDisplayFavoritesTrue,
    setDisplayFavoritesFalse,
    setChosenYear,
    setDisplayMessagesFalse,
    setDisplayMessageCreateFalse,
    setDisplayNavBarFalse,
    setDisplayPostCreateFalse,
} from "../dataAccess.js";
import { Notification } from "./Notification.js";
import { msgOpen, msgClose } from "../messages/MessageSideBar.js";
import { msgWriteOpen, msgWriteClose } from "../messages/MessageCreate.js";
import { MenuButton } from "./MenuButton.js";

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();
    const currentYear = new Date().getFullYear();
    const chosenUser = getChosenUser();
    let yearHTML = "";
    for (let x = currentYear; x >= 2021; x--) {
        yearHTML += `<option value="${x}">${x}</option>`;
    }

    // we'll add specific images later
    return `
        <div class="menuButton navBtn">
        ${MenuButton()}
        </div>
        <section class="navbarCollapse navbarItem">
            <div id="homeBtn" class="navcolItem navHomeBtn navBtn">
                <div class="navBtnCircle navHomeBtn">
                    <img class="navHomeBtn navBtn" src="images/Icons/home-icon.png" alt="AltText" />
                </div>
                <h6 class="navBtn navHomeBtn">Home</h6>
            </div>
            <div id="userBtn" class="navcolItem navUserBtn navBtn">
                ${UserButton()}
            </div>
            <div id="notification" class="navcolItem navBtn navColBtn notification notificationBtn">
                ${Notification()}
            </div>
            <div id="writeMessageBtn" class="navcolItem navBtn writeMsgBtn">
                <div class="navBtnCircle writeMsgBtn">
                    <img class="navBtn writeMsgBtn" src="images/Icons/write-message.png" alt="AltText" />
                </div>
                <h6 class="navBtn writeMsgBtn">Compose Message</h6>
            </div>
            <div id="postGifBtn" class="navcolItem navBtn postGifBtn">
                <div class="navBtnCircle postGifBtn">
                    <img class="postGifBtn navBtn" src="images/Icons/post-gif.png" alt="AltText" />
                </div>
                <h6 class="navBtn postGifBtn">Post Gif</h6>
            </div>
            <div class="filtersMenu navcolItem navBtn">
                <div class="navBtnCircle filtersMenu">
                    <img class="filtersMenuImg" src="./images/Icons/filter.png" />
                </div>
                <h6 class="navBtn filtersMenu">Filter</h6>
                <div class="filtersMenuContent navcolItem navBtn">
                    <select id="filterDropDown" class="dropDown">
                            <option value="0">Show All Posts</option>
                            ${users
                                .map((user) => {
                                    return `<option value="${user.id}" ${(chosenUser === user.id) ? "selected=selected" : ""}>${user.firstName} ${user.lastName}</option>`;
                                })
                                .join("")}
                    </select>
                    <select id="yearDropDown" class="dropDown">
                        <option value="0">Show All Years</option>
                        ${yearHTML}
                    </select>
                    <div class="favFilterInline">
                        <input type="checkbox"  id="favFilter" name="favFilter" value-"favFilter"/>
                        <label for"favFilter">Filter by Favorites</label>
                    </div>
                </div>
            </div>
            <div id="logoutBtn" class="navBtn navcolItem logoutBtn">
                <div class="navBtnCircle logoutBtn">
                    <img id="logoutImg" class="navBtn logoutBtn" src="images/Icons/logout.png" alt="AltText" />
                </div>
                <h6 class="navBtn logoutBtn">Log Out</h6>
            </div>
        </section>
    `;
};

//grab items from dom
const mainContainer = document.querySelector(".beta");

//sends user to login page when logout button is clicked
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("logoutBtn")) {
        localStorage.removeItem("beta_user");
        //these functions will reset our dataAccess back to its initial state
        setDisplayNavBarFalse();
        setDisplayMessagesFalse();
        setDisplayMessageCreateFalse();
        setDisplayPostCreateFalse();
        setPostsFeedStatePosts();
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
        setChosenUser(null);
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
        if (getDisplayMessages()) {
            msgClose();
            setDisplayMessagesFalse();
        } else {
            msgOpen();
            setDisplayMessagesTrue();
        }

        //open up the messageCreate form if it is closed
        if (getDisplayMessageCreate()) {
            msgWriteClose();
            setDisplayMessageCreateFalse();
        } else {
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

//handle user button html here for use of code editing
const UserButton = () => {
    const currentUser = getCurrentUser();
    return `<div class="navBtnCircle navUserBtn">
                    <img class="navUserBtn navBtn navProfileImg" src="${currentUser.gifLink}" alt="AltText" />
            </div>
            <h6 class="navBtn navUserBtn">${currentUser.firstName} ${currentUser.lastName}</h6>`
}

//to update the profile picture if necessary
mainContainer.addEventListener("profilePicChanged", event => {
    document.querySelector(".navUserBtn").innerHTML = UserButton();
})