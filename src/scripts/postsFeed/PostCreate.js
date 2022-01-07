import { fetchPosts, getCurrentUser, sendPost, setDisplayPostCreateFalse } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta");

mainContainer.addEventListener("click", (event) => {
    if (event.target.className === "closeBtn") {
        document.querySelector(".postCreate").style.visibility = "hidden";
        setDisplayPostCreateFalse();
    }
});

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "sendPost") {
        const author = getCurrentUser();
        const subject = document.querySelector("input[name='postTitle']").value;
        const gifLink = document.querySelector("input[name='gifURL']").value;
        const story = document.querySelector("textarea[name='postComment']").value;
        const timestamp = Date.now();
        const authorId = author.id;

        if (subject && gifLink.startsWith("http") && story) {
            const post = { subject, gifLink, story, timestamp, authorId };

            sendPost(post)
                .then(() => {
                    setDisplayPostCreateFalse();
                    document.querySelector(".postCreate").style.visibility = "hidden";
                    document.querySelector("input[name='postTitle']").value = "";
                    document.querySelector("input[name='gifURL']").value = "";
                    document.querySelector("textarea[name='postComment']").value = "";
                    mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
                });
        } else {
            window.alert("Please Enter A GIF URL, Title, and Comment");
        }
    }
});

export const PostCreate = () => {
    return `
            <img id="closeBtn" class="closeBtn" src="images/closeX.png" alt="close post creation" width="30px">
            <form>
                <input type="text" name="gifURL" id="postUrlInput" placeholder="URL:" />
                <input type="text" name="postTitle" id="postTitle" placeholder="Title:" />
                <textarea name="postComment" id="postComment" placeholder="Comment:"></textarea>
            </form>
            <button id="sendPost">Submit Post</button>
`;
};
