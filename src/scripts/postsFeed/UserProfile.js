import { getPosts, getCurrentUser } from "../dataAccess.js";
import { Post } from "./Post.js";

export const UserProfile = () => {
    const posts = getPosts();
    const currentUser = getCurrentUser();
    const curUserPosts = posts.filter(post => post.authorId === currentUser.id);

    return `
        <section class="userProfileInfo">
            <img id="profileCloseBtn" class="closeBtn" src="images/closeX.png" alt="close profile" width="30px" />
            <h2 class= "profileName">${currentUser.firstName} ${currentUser.lastName}</h2>
            <div class="profilePostCount">Post count: ${curUserPosts.length}</div>
        </section>
        <ul class="userPostsList">
            ${curUserPosts.map(post => Post(post)).join("")}
        </ul>`
}