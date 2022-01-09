import {
	getCurrentUser,
	getMessages,
	getDisplayMessages,
	setDisplayMessagesFalse,
	setDisplayMessagesTrue
} from "../dataAccess.js";
import { msgClose, msgOpen } from "../messages/MessageSideBar.js";

//function for rendering notification button
export const Notification = () => {
	const currentUser = getCurrentUser();
	const allMessages = getMessages();
	const userMessages = allMessages.filter(
		(msg) => msg.recipientId === currentUser.id
	);
	const userMessagesUnread = userMessages.filter((msg) => !msg.read);

	return `
    <div class="navBtnCircle notifcationBtn">
        <img id="notifImg" class="navBtn notificationBtn notifImg" src="${
			userMessagesUnread.length > 0
				? "images/Icons/notification-bell-filled.png"
				: "images/Icons/notification-bell-empty.png"
		}" alt="AltText"/>${
		userMessagesUnread.length > 0
			? `<div class="notificationBtn navBtn notifNumberContainer"><div class="notifNumber">${userMessagesUnread.length}</div></div>`
			: ""
	}
    </div>
    <h6 class="notificationBtn navBtn">Notifications</h6>`;
};

const mainContainer = document.querySelector(".beta");

//open messages window button event listener
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.classList.contains("notificationBtn")) {
		if (getDisplayMessages()) {
			msgClose();
			setDisplayMessagesFalse();
		} else {
			msgOpen();
			setDisplayMessagesTrue();
		}
	}
});

//event listener for notification button updating itself
mainContainer.addEventListener("notificationUpdate", (event) => {
	document.querySelector(".notification").innerHTML = Notification();
});
