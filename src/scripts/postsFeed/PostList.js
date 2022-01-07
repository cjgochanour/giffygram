import {
    fetchPosts,
    getChosenUser,
    getCurrentUser,
    getDisplayFavorites,
    getLikes,
    setDisplayPostCreateTrue,
    setChosenYear,
    getChosenYear,
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
    const chosenYear = getChosenYear();
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
    if (chosenYear) {
        posts = posts.filter((post) => new Date(post.timestamp).getFullYear() === chosenYear);
    }

    return `<ul class="postList"><li><button id="postBtn" class="postListItem postBtn">Create Post</button></li>${posts
        .map((post) => Post(post))
        .join("")}</ul>`;
};

// make new array with only the years of posts
// use this array to generate html for the drop down selector
// use
