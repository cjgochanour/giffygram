import { Navbar } from "./navBar/NavBar.js";
import { PostsFeed } from "./postsFeed/PostsFeed.js"
import { MessageSideBar } from "./messages/MessageSideBar.js";
import { Footer } from "./footer/Footer.js";
import { PostCreate } from "./postsFeed/PostCreate.js";

export const Beta = () => {
    // Show user's main page for post stuff
    return `
        <section class="postCreate">
        ${PostCreate()}
        </section>
        <article class="mainPage">
            <section class="navbar mainPageItem">
                ${Navbar()}
            </section>
            <section class="postFeed mainPageItem">
                ${PostsFeed()}
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
