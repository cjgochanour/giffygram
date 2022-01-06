import { Navbar } from "./navBar/NavBar.js";
import { PostList } from "./postsFeed/PostList.js";
import { MessageSideBar } from "./messages/MessageSideBar.js";
import { Footer } from "./footer/Footer.js";

export const Beta = () => {
    // Show user's main page for post stuff
    return `
        <article class="mainPage">
            <section class="navbar mainPageItem">
                ${Navbar()}
            </section>
            <section class="postFeed mainPageItem">
            ${PostList()}
            </section>
            <section class="msgSidebar mainPageItem">
                ${MessageSideBar()}
            </section>
        </article>
        <footer class="footer">
            ${Footer()}
        </footer>
    `;
};
