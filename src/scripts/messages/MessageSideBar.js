import { MessageNavbar } from "./MessageNavbar.js";
import { MessageList } from "./MessageList.js";
import { MessageForm } from "./MessageCreate.js";

export const MessageSideBar = () => {
    return `
        <section class="msgNavbar msgSidebarItem">
            ${MessageNavbar()}
        </section>
        <section class="msgCreate msgSidebarItem">
            ${MessageForm()}
        </section>
        <section class="msgList msgSidebarItem">
            ${MessageList()}
        </section>`
}

//grab items from dom
const mainContainer = document.querySelector(".beta");

//collapse functions
export const msgOpen = () => {
    document.querySelector(".msgSidebar").style.width = "20vw";
    document.querySelector(".postFeed").style.marginRight = "20vw";
}

export const msgClose = () => {
    document.querySelector(".msgSidebar").style.width = "0";
    document.querySelector(".postFeed").style.marginRight = "0";
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