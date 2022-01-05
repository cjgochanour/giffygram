export const PostCreate = () => {
    return `
        <div class="PostCreate">
            <img class="closeBtn" src="images/closeX.png" alt="close post creation">
            <form>
                <input type="text" name="gifURL" id="postUrlInput" placeholder="URL:" />
                <input type="text" name="postTitle" id="postTitle" placeholder="Title:" />
                <textarea name="postComment" id="postComment" placeholder="Comment:" />
            </form>
            <button id="sendPost">Submit Post</button>
        </div>`;
};
