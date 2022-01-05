import { MessageNavbar } from "./MessageNavbar.js";
import { MessageList } from "./MessageList.js";

export const MessageSideBar = () => {
    return `
        <section class="msgNavbar msgSidebarItem">
            ${MessageNavbar()}
        </section>
        <section class="msgList msgSidebarItem">
            ${MessageList()}
        </section>`
}