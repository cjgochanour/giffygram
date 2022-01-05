export const PostCreate = () => {
    return `
        <div class="PostCreate">
            <form>
                <fieldset>
                    <legend>Create A Post</legend>

                    <input type="text" name="gifURL" id="postUrlInput" placeholder="URL:" />
                    <input type="text" name="postTitle" id="postTitle" placeholder="Title:" />
                    <textarea name="postComment" id="postComment" placeholder="Comment:" />
                </fieldset>
            </form>
        </div>`;
};
