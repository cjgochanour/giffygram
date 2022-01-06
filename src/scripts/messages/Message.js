import { getUsers, updateMessage, getMessages } from "../dataAccess.js";

//function that returns the html for a message to appear in the message list
export const Message = (msg) => {
    const users = getUsers();
    const author = users.find(user => user.id === msg.authorId)

    return `
        <li class="msgListItem msg">
            <h4 class="msgItem msgAuthor">From: ${author.firstName} ${author.lastName}</h4>
            <div class="msgItem msgText">${msg.message}</div>
            <div class="msgItem msgTimestamp">${new Date(msg.timestamp).toLocaleString("en-US")}</div>
            <img class="msgItem msgMarkRead" id="msgRead--${msg.id}" src="./images/betaLogo.png" alt="Mark As Read" width="20px"/>
        </li>`
} 

//grab container
const mainContainer = document.querySelector(".beta");

//event listeners for pressing read button
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("msgRead")) {
        const [ ,msgIdString] = clickEvent.target.id.split("--");
        const msgId = parseInt(msgIdString);
        const messages = getMessages();
        const currentMessage = messages.find(msg => msg.id === msgId);
        currentMessage.read = true;
        
        updateMessage(currentMessage)
            .then(() => mainContainer.dispatchEvent(new CustomEvent("msgListChanged")));
    }
})