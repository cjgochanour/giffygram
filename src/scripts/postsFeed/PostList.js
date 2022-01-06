import { getChosenUser } from "../dataAccess.js";
import { Post } from "./Post.js";
import { getPosts } from "../dataAccess.js";
import { PostCreate } from "../createForms/PostCreate.js";

const mainContainer = document.querySelector(".beta");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "postBtn") {
        const postList = document.querySelector(".postList");
        postList.innerHTML = PostCreate();
    }
});

export const PostList = () => {
    let posts = getPosts();
    const chosenUser = getChosenUser();
    // if chosenUser = null, display all posts
    // if chosenUser = x, display posts from x
    if (chosenUser) {
        posts = posts.filter((post) => post.authorId === chosenUser);
    }

    return `<ul><li><button id="postBtn" class="postListItem postBtn">Create Post</button></li>${posts
        .map((post) => Post(post))
        .join("")}</ul>`;
};
