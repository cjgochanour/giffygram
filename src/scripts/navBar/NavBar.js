import { getCurrentUser, getMessages, getUsers } from "../dataAccess.js"
import { msgClose, msgOpen, getMsgCol, setMsgColFalse, setMsgColTrue } from "../messages/MessageSideBar.js";

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();

    // we'll add specific images later
    return `
        <img class="navbarItem navColBtn" id="navColBtn" src="images/betaLogo.png" alt="AltText" width="50px" />
        <section class="navbarCollapse navbarItem">
            <div id="homeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Home</div>
            <div id="userBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />${currentUser.firstName} ${currentUser.lastName}</div>
            <div id="notification" class="navcolItem notification notificationBtn">${notification()}</div>
            <div id="writeMessageBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</div>
            <div id="postGifBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</div>
            <div id="filterLikeBtn" class="navcolItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Filter By Likes</div>
            <select id="filterDropDown" class="navcolItem">
                    <option value="0">Filter by name</option>
                    ${users
                        .map((user) => {
                            return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`;
                        })
                        .join("")}
            </select>
            <div id="logoutBtn" class="navcolItem"><img id="logoutImg" src="images/betaLogo.png" alt="AltText" width="50px" />Log Out</div>
        </section>
    `;
};

//function for rendering notification button
const notification = () => {
    const currentUser = getCurrentUser();
    const allMessages = getMessages();
    const userMessages = allMessages.filter(msg => msg.recipientId === currentUser.id);
    const userMessagesUnread = userMessages.filter(msg => !msg.read);

    return `<img id="notifImg" class="notificationBtn notifImg" src="${(userMessagesUnread.length > 0) ? "images/notification-bell-filled.png" : "images/notification-bell-empty.png"}" alt="AltText" width="30px" />${(userMessagesUnread.length > 0) ? `<div class="notificationBtn notifNumberContainer"><span class="notifNumber">${userMessagesUnread.length}</span></div>` : ""}`
}

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

//collapse event listener and variable
let navCollapsed = true;

mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "navColBtn") {
        if (navCollapsed) {
            navOpen();
            navCollapsed = false;
        } else {
            navClose();
            navCollapsed = true;
        }
    }
});

//open messages window button event listener
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("notificationBtn")) {
        if (getMsgCol()) {
            msgOpen();
            setMsgColFalse();
        } else {
            msgClose();
            setMsgColTrue();
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

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "filterDropDown") {
        setChosenUser(parseInt(event.target.value));
        mainContainer.dispatchEvent(new CustomEvent("postListChanged"));
    }
});

//event listener for notification button updating itself
mainContainer.addEventListener("notificationUpdate", event => {
    document.querySelector(".notification").innerHTML = notification();
})