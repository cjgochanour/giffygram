import { msgClose, msgOpen } from "./MessageSideBar.js";
import { msgWriteClose, msgWriteOpen} from "./MessageCreate.js";
import { getDisplayMessageCreate, setDisplayMessageCreateTrue, setDisplayMessageCreateFalse, getDisplayMessages, setDisplayMessagesTrue, setDisplayMessagesFalse } from "../dataAccess.js";

export const MessageNavbar = () => {
    return `
        <div class="msgNavbarItem msgNavBtn">
        <img id="composeMsgSidebar" class="msgNavBtn" src="./images/Icons/write-message.png" alt="Compose New Message" />
        </div>
        <div class="msgNavbarItem msgNavBtn">
        <img id="closeMsgSidebar" class="msgNavBtn" src="./images/closeX.png" alt="Close Messages" />
        </div>`
}

const mainContainer = document.querySelector(".beta");

//event listener for x button image
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeMsgSidebar") {
        if (getDisplayMessages()) {
            msgClose();
            setDisplayMessagesFalse();
        } else {
            msgOpen();
            setDisplayMessagesTrue();
        }
    }
})

//listener for the compose message image
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "composeMsgSidebar") {
        if (getDisplayMessageCreate()) {
            msgWriteClose();
            setDisplayMessageCreateFalse();
        } else {
            msgWriteOpen();
            setDisplayMessageCreateTrue();
        }
    }
})