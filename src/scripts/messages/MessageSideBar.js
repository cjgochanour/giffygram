import { MessageNavbar } from "./MessageNavbar.js";
import { MessageList, markMsgRead } from "./MessageList.js";
import { MessageForm } from "./MessageCreate.js";

export const MessageSideBar = () => {
    return `
        <section class="msgSidebarItem msgInteract">
            <div class="msgNavbar msgSidebarItem">
                ${MessageNavbar()}
            </div>
            <div class="msgCreate msgSidebarItem">
                ${MessageForm()}
            </div>
        </section>
        <section class="msgList msgSidebarItem">
            ${MessageList()}
        </section>`
}

//grab items from dom
const mainContainer = document.querySelector(".beta");

//collapse functions
export const msgOpen = () => {
    //mark all messages as read, but they are not rendered as such because msg list has already been rendered
    markMsgRead();
    document.querySelector(".msgSidebar").style.width = "20vw";
    document.querySelector(".postFeed").style.marginRight = "20vw";
}

export const msgClose = () => {
    document.querySelector(".msgSidebar").style.width = "0";
    document.querySelector(".postFeed").style.marginRight = "0";
    //rerender message list so now all the read message do not get marked as read. will ALSO update with any new messages that have been recieved.
    mainContainer.dispatchEvent(new CustomEvent("msgListChanged"));
}

//collapse variable
let msgCollapsed = true;

export const getMsgCol = () => {
    return msgCollapsed;
}

export const setMsgColTrue = () => {
    msgCollapsed = true;
}

export const setMsgColFalse = () => {
    msgCollapsed = false;
}