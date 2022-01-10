import { getUsers, updateMessage, getMessages, getCurrentUser } from "../dataAccess.js";

//function that returns the html for a message to appear in the message list
export const Message = (msg) => {
    const currentUser = getCurrentUser();
    const users = getUsers();
    const author = users.find(user => user.id === msg.authorId)

    return `
        <li class="msgListItem msg ${(currentUser.id === msg.recipientId) ? "recievedMsg" : "sentMsg"}">
            <h4 class="msgItem msgAuthor">${(currentUser.id === msg.authorId) ? "Sent by You" : `From: ${author.firstName} ${author.lastName}`}</h4>
            <div class="msgItem msgText">${msg.message}</div>
            <div class="msgItem msgBottomBar">
                <div class="msgItem msgTimestamp">${new Date(msg.timestamp).toLocaleString("en-US")}</div>
                <div class="msgReadImg">
                ${(msg.read) ? "" : `<img class="msgItem msgMarkRead" id="msgRead--${msg.id}" src="./images/unread-message.png" alt="Mark As Read" width="20px"/>`}
                </div>
            </div>
        </li>`
} 

//grab container
const mainContainer = document.querySelector(".beta");

// //event listeners for pressing read button
// mainContainer.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id.startsWith("msgRead")) {
//         const [ ,msgIdString] = clickEvent.target.id.split("--");
//         const msgId = parseInt(msgIdString);
//         const messages = getMessages();
//         const currentMessage = messages.find(msg => msg.id === msgId);
//         currentMessage.read = true;
        
//         updateMessage(currentMessage)
//             .then(() => mainContainer.dispatchEvent(new CustomEvent("msgListChanged")));
//     }
// })
