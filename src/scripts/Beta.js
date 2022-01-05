import { Navbar } from "./navBar/NavBar.js";

export const Beta = () => {
    // Show user's main page for post stuff
    return `
        <article class="mainPage">
            <section class="navbar">
            ${Navbar()}
            </section>
            <section class="postList">
            PostList Go Here
            </section>
            <section class="messSideBar">
            MessageSideBar Go Here
            </section>
        </article>
        <footer class="footer">
        Footer Go Here
        </footer>
    `;
};
