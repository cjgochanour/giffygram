import {
	getChosenUser,
	getUsers,
	getPosts,
	getMessages,
	getCurrentUser,
	setDisplayProfilePosts,
  setChosenUser
} from "../dataAccess.js";
import { Message } from "../messages/Message.js";

export const Profile = () => {
	//get all necessary information to be used in profile
	const chosenUserId = getChosenUser();
	const users = getUsers();
	const posts = getPosts();
	const messages = getMessages();
	const currentUser = getCurrentUser();
	const chosenUser = users.find((user) => user.id === chosenUserId);
	const userPosts = posts.filter((post) => post.authorId === chosenUserId);
	//match all messages sent from logged in user to clicked on user
	const sentMsgs = messages.filter(
		(message) =>
			message.authorId === currentUser.id &&
			message.recipientId === chosenUser.id
	);
	//match all messages
	const recievedMsgs = messages.filter(
		(message) =>
			message.recipientId === currentUser.id &&
			message.authorId === chosenUser.id
	);
	//concatanate all messages into one array
	const allMsgs = sentMsgs.concat(recievedMsgs);
	//sort messages by time stamp in desc order
	allMsgs.sort((a, b) => b.timestamp - a.timestamp);

	return `
  <section class="profileInfo">
    <img id="profileCloseBtn" class="closeBtn" src="images/closeX.png" alt="close profile" width="30px" />
      <h2 class= "profileName">${chosenUser.firstName} ${chosenUser.lastName}</h2>
      <div class="profilePostCount">Post count: ${userPosts.length}</div>
  </section>
  <section class="profileMsgList">
      <ul class="sortedMsgList profileMsgList">
        ${allMsgs.map((msg) => Message(msg)).join("")}
      </ul>
  </section>
`;
};

const mainContainer = document.querySelector(".beta");

//listener for x button
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "profileCloseBtn") { 
    setDisplayProfilePosts();
    setChosenUser(null);
    mainContainer.dispatchEvent(new CustomEvent("postFeedChanged"));
	}
});
