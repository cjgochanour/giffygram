import { getCurrentUser, getLikes, getUsers } from "../dataAccess.js"

export const Navbar = () => {
    const currentUser = getCurrentUser();
    const users = getUsers();
    // we'll add specific images later
    return `
        <span id="homeBtn" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Home</span>
        <span id="userBtn" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />${currentUser.firstName} ${currentUser.lastName}</span>
        <span id="notification" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Notifications</span>
        <span id="writeMessageBtn" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Compose Message</span>
        <span id="postGifBtn" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Post Gif</span>
        <select id="filterDropDown" class="navbarItem">
                <option value="0">Filter by name</option>
                ${users.map(user => {
                    return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`
                }).join("")}
        </select>
        <span id="logoutBtn" class="navbarItem"><img src="images/betaLogo.png" alt="AltText" width="50px" />Log Out</span>
    `
}