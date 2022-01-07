import { msgClose, msgOpen } from "./MessageSideBar.js";
import { msgWriteClose, msgWriteOpen} from "./MessageCreate.js";
import { getDisplayMessageCreate, setDisplayMessageCreateTrue, setDisplayMessageCreateFalse, getDisplayMessages, setDisplayMessagesTrue, setDisplayMessagesFalse } from "../dataAccess.js";

export const MessageNavbar = () => {
    return `
        <img id="composeMsgSidebar" class="msgNavbarItem" src="./images/betaLogo.png" alt="Compose New Message" width="30px" />
        <img id="closeMsgSidebar" class="msgNavbarItem" src="./images/closeX.png" alt="Close Messages" width="30px" />`
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