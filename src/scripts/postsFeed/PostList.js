import { getChosenUser, setDisplayPostCreateTrue } from "../dataAccess.js";
import { Post } from "./Post.js";
import { getPosts } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "postBtn") {
        document.querySelector(".postCreate").style.visibility = "visible";
        setDisplayPostCreateTrue();
    }
});

mainContainer.addEventListener("postListChanged", () => {
    document.querySelector(".postList").innerHTML = PostList();
});

export const PostList = () => {
    let posts = getPosts();
    const chosenUser = getChosenUser();
    // if chosenUser = null, display all posts
    // if chosenUser = x, display posts from x
    if (chosenUser) {
        posts = posts.filter((post) => post.authorId === chosenUser);
    }

    return `<ul class="postList"><li><button id="postBtn" class="postListItem postBtn">Create Post</button></li>${posts
        .map((post) => Post(post))
        .join("")}</ul>`;
};
