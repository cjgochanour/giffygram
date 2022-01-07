import {
    fetchPosts,
    getChosenUser,
    getCurrentUser,
    getDisplayFavorites,
    getLikes,
    setDisplayPostCreateTrue,
} from "../dataAccess.js";
import { Post } from "./Post.js";
import { getPosts } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "postBtn") {
        document.querySelector(".postCreate").style.visibility = "visible";
        setDisplayPostCreateTrue();
    }
});

export const PostList = () => {
    let posts = getPosts();
    const currentUser = getCurrentUser();
    const likes = getLikes();
    const chosenUser = getChosenUser();
    const displayFavorites = getDisplayFavorites();
    // if chosenUser = null, display all posts
    // if chosenUser = x, display posts from x
    if (chosenUser) {
        posts = posts.filter((post) => post.authorId === chosenUser);
    }
    //if displayFavorites = true, filter posts by favorited
    if (displayFavorites) {
        const userLiked = likes.filter((like) => like.userId === currentUser.id);
        posts = posts.filter((post) => userLiked.find((like) => like.postId === post.id));
    }

    return `<ul class="postList"><li><button id="postBtn" class="postListItem postBtn">Create Post</button></li>${posts
        .map((post) => Post(post))
        .join("")}</ul>`;
};
