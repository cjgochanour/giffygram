import { PostList } from "./PostList.js";
import { Profile } from "./Profile.js";
import { UserProfile } from "./UserProfile.js";
import { getPostsFeedState, fetchPosts } from "../dataAccess.js";

export const PostsFeed = () => {
    switch (getPostsFeedState()) {
        case "postList":
            return PostList();
            break;

        case "profile":
            return Profile();
            break;

        case "userProfile":
            return UserProfile();
            break;
    }
}

const mainContainer = document.querySelector(".beta")

// rerender post list and change displayprofile to false
mainContainer.addEventListener("postFeedChanged", () => {
    fetchPosts()
        .then(() => {
        document.querySelector(".postFeed").innerHTML = PostsFeed()});
});