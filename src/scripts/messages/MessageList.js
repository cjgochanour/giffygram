import { getMessages, getCurrentUser } from "../dataAccess.js";
import { Message } from "./Message.js";
 
const mainContainer = document.querySelector(".beta");

//make a list of messages from the message module
export const MessageList = () => {
    const messages = getMessages();
    const currentUser = getCurrentUser();
    //make sure we are only using messages from the current user
    const curUserMsg = messages.filter(msg => msg.recipientId === currentUser.id);
    
    return `
        <ul class="msgSideBarItem msgList">
            ${curUserMsg.map(msg => Message(msg)).join("")}
        </ul>`
}

mainContainer.addEventListener("msgListChanged", () => {
    document.querySelector(".msgList").innerHTML = MessageList();
});