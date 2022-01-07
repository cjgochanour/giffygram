import { getMessages, getCurrentUser, fetchMessages, updateMessage } from "../dataAccess.js";
import { Message } from "./Message.js";
 


//make a list of messages from the message module
export const MessageList = () => {
	const messages = getMessages();
	const currentUser = getCurrentUser();
	//make sure we are only using messages from the current user
	const curUserMsg = messages.filter(
		(msg) => msg.recipientId === currentUser.id
	);
	const curUserMsgUnread = curUserMsg.filter((msg) => !msg.read);
	const curUserMsgRead = curUserMsg.filter((msg) => msg.read);

	return `
        <ul class="msgSideBarItem msgList">
            ${curUserMsgUnread.map((msg) => Message(msg)).join("")}
			${curUserMsgRead.map((msg) => Message(msg)).join("")}
        </ul>`;
};

const mainContainer = document.querySelector(".beta");

mainContainer.addEventListener("msgListChanged", () => {
	fetchMessages().then(() => {
		mainContainer.dispatchEvent(new CustomEvent("notificationUpdate"));
		document.querySelector(".msgList").innerHTML = MessageList();
	});
});

// to mark messages as read when you open the msgSidebar. Then rerender notification button with its event.
export const markMsgRead = () => {
	const messages = getMessages();
	const currentUser = getCurrentUser();
	const curUserMsg = messages.filter(msg => msg.recipientId === currentUser.id);
	const curUserMsgUnread = curUserMsg.filter((msg) => !msg.read);
	const promiseArray = [];

	curUserMsgUnread.forEach(msg => {
		msg.read = true;
		promiseArray.push(updateMessage(msg));
	});

	Promise.all(promiseArray)
		.then(() => fetchMessages())
		.then(() => mainContainer.dispatchEvent(new CustomEvent("notificationUpdate")))
}