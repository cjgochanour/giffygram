import {
	getUsers,
	getLikes,
	getCurrentUser,
	getPosts,
	sendLike,
	deleteLike,
	fetchLikes,
	deletePost,
	setChosenUser,
	setPostsFeedStateProfile,
	setPostsFeedStateUser
} from "../dataAccess.js";
//function returns post so that it can appear in post list
export const Post = (post) => {
	return `
        <li class="post postListItem" id="post--${post.id}">
          ${postInnerHtml(post)}
        </li>
        `;
};

const postInnerHtml = (post) => {
	const users = getUsers();
	const likes = getLikes();
	const currentUser = getCurrentUser();

	const author = users.find((user) => user.id === post.authorId);

	return `
    <h2 class="postItem postSubject">${post.subject}<h2>
    <img class="postItem postImage" src="${post.gifLink}" width="200px"/>
    <div class= "postItem postStory">${post.story}</div>
    <div class="postItem postAuthor" id="postAuthor--${post.authorId}">Posted by: ${author.firstName} ${author.lastName}</div>
    <div class="postItem postDate">${new Date(post.timestamp).toLocaleDateString("en-US")} </div>
    <img class="postItem postLikeBtn" id="likeBtn--${post.id}" src="${
		likes.find(
			(like) => like.userId === currentUser.id && like.postId === post.id
		)
			? "./images/favorite-star-yellow.svg"
			: "./images/favorite-star-blank.svg"
	}" width="20px" />
    ${
		post.authorId === currentUser.id
			? `<img class="postItem postDelBtn" id="delBtn--${post.id}" src="./images/block.svg" width="20px" />`
			: ""
	}`;
};

//grab container
const mainContainer = document.querySelector(".beta");

//event listeners

//like button add and remove
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id.startsWith("likeBtn--")) {
		//grab the post id and current user
		const [, postIdString] = clickEvent.target.id.split("--");
		const postId = parseInt(postIdString);
		const currentUser = getCurrentUser();
		const posts = getPosts();
		const likes = getLikes();

		//grab the like object which matches current user and post id if it exists
		const thisPostLikeObj = likes.find(
			(like) => like.postId === postId && like.userId === currentUser.id
		);

		//if there is a post like object, unlike it. If not, create one and send it off to database. After either of these, rerender the post.
		if (thisPostLikeObj) {
			deleteLike(thisPostLikeObj.id)
				.then(() => fetchLikes())
				.then(
					() =>
						(document.querySelector(`#post--${postId}`).innerHTML =
							postInnerHtml(
								posts.find((post) => post.id === postId)
							))
				);
		} else {
			const likeToSend = {
				userId: currentUser.id,
				postId: postId
			};

			sendLike(likeToSend)
				.then(() => fetchLikes())
				.then(
					() =>
						(document.querySelector(`#post--${postId}`).innerHTML =
							postInnerHtml(
								posts.find((post) => post.id === postId)
							))
				);
		}
	}
});

//delete post button listener
mainContainer.addEventListener("click", (event) => {
	if (event.target.id.startsWith("delBtn")) {
		const [, postId] = event.target.id.split("--");
		deletePost(parseInt(postId)).then(() =>
			mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"))
		);
	}
});

//Event listener for displaying profile
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id.startsWith("postAuthor--")) {
		//grab post author id
		const [, postAuthIdString] = clickEvent.target.id.split("--");
		const postAuthorId = parseInt(postAuthIdString);
        const currentUser = getCurrentUser();

		//fork in road where if it the selected post was written by current user, we show userProfile. Otherwise we show Profile()
		if (postAuthorId === currentUser.id) {
			//set displayProfile to userProfile
			setPostsFeedStateUser();
			//shoot out postFeedCahnge event
			mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
		} else {
			//set post author as chosenUser
			setChosenUser(postAuthorId);
			//set displayProfile to Profile
			setPostsFeedStateProfile();
			//shoot out postFeedChanged event
			mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
		}
	}
});
