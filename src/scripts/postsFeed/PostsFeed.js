import { PostList } from "./PostList.js";
import { getDisplayProfile, setDisplayProfileFalse, setDisplayProfileTrue, fetchPosts } from "../dataAccess.js";

export const PostsFeed = () => {
    if (getDisplayProfile()) {
        return Profile();
    } else {
        return PostList();
    }
}

const mainContainer = document.querySelector(".beta")

// rerender post list and change displayprofile to false
mainContainer.addEventListener("postListChanged", () => {
    fetchPosts()
        .then(() => {
        setDisplayProfileFalse();
        document.querySelector(".postFeed").innerHTML = PostsFeed()});
});