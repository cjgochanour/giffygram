import { Navbar } from "./navBar/NavBar.js";
import { PostList } from "./postsFeed/PostList.js";

import { MessageSideBar } from "./messages/MessageSideBar.js";

export const Beta = () => {
    // Show user's main page for post stuff
    return `
        <article class="mainPage">
            <section class="navbar">
                ${Navbar()}
            </section>
            <section class="postList">
            ${PostList()}
            </section>
            <section class="messSideBar">
                ${MessageSideBar()}
            </section>
        </article>
        <footer class="footer">
        Footer Go Here
        </footer>
    `;
};
