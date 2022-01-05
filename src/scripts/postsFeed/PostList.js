import { getChosenUser } from "../dataAccess.js";
import { Post } from "./Post.js";
import { getPosts } from "../dataAccess.js";

export const PostList = () => {
    let posts = getPosts();
    const chosenUser = getChosenUser();
    // if chosenUser = null, display all posts
    // if chosenUser = x, display posts from x
    if (chosenUser) {
        posts = posts.filter((post) => post.authorId === chosenUser);
    }

    return `<ul><li><button class="postListItem postBtn">Create Post</button></li>${posts
        .map((post) => Post(post))
        .join("")}</ul>`;
};
