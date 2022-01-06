import { getCurrentUser, getMessages } from "../dataAccess.js";
import { msgClose, msgOpen, getMsgCol, setMsgColFalse, setMsgColTrue } from "../messages/MessageSideBar.js";

//function for rendering notification button
export const Notification = () => {
    const currentUser = getCurrentUser();
    const allMessages = getMessages();
    const userMessages = allMessages.filter((msg) => msg.recipientId === currentUser.id);
    const userMessagesUnread = userMessages.filter((msg) => !msg.read);

    return `<img id="notifImg" class="notificationBtn notifImg" src="${
        userMessagesUnread.length > 0 ? "images/notification-bell-filled.png" : "images/notification-bell-empty.png"
    }" alt="AltText" width="30px" />${
        userMessagesUnread.length > 0
            ? `<div class="notificationBtn notifNumberContainer"><span class="notifNumber">${userMessagesUnread.length}</span></div>`
            : ""
    }`;
};

const mainContainer = document.querySelector(".beta");

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

//event listener for notification button updating itself
mainContainer.addEventListener("notificationUpdate", (event) => {
    document.querySelector(".notification").innerHTML = notification();
});