import { getUsers, sendMessage, getCurrentUser, setDisplayMessageCreateFalse } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta");

export const MessageForm = () => {
	const users = getUsers();
	const currentUser = getCurrentUser();

	let html = `  
    <div class="messageForm">      
        <form>
            <fieldset>
                <select id="msgRecList" class="messageFormItem recipientList">
                    <option value = "0">Choose Recipient</option>
                        ${users
							.map((user) => {
								if (currentUser.id === user.id) {
									return "";
								} else {
									return `
                                <option class="recipientListItem" value="${user.id}">${user.firstName} ${user.lastName}</option>
                            `;
								}
							})
							.join("")}
                </select>
            </fieldset>
            <fieldset>
                <label class="messageFormItem msgTextLabel" for="messageCreate">Message</label>
                    <textarea type="text" name="messageCreate"></textarea>
            </fieldset>
        </form>
            <button class="sendMessageBtn messageFormItem" id="sendMessage">Send</button>
    </div>`;
	return html;
};

mainContainer.addEventListener("click", (event) => {
	if (event.target.id === "sendMessage") {
		const author = getCurrentUser();
		const currentMessage = document.querySelector(
			"textarea[name='messageCreate']"
		).value;
		const recipientSelect = document.querySelector(
			"select[id='msgRecList']"
		);
		const currentRecipient = parseInt(
			recipientSelect.options[recipientSelect.selectedIndex].value
		);
		const timestamp = Date.now();
		const authorId = author.id;

		const dataToSendToAPI = {
			recipientId: currentRecipient,
			message: currentMessage,
			authorId: authorId,
			timestamp: timestamp,
			read: false
		};

		sendMessage(dataToSendToAPI).then(() => {
			window.alert("Message Successfuly Sent");
			msgWriteClose();
			setDisplayMessageCreateFalse();
			mainContainer.dispatchEvent(new CustomEvent("msgListChanged"));
		});
	}
});

//collaspe functions
export const msgWriteOpen = () => {
	document.querySelector(".msgCreate").style.maxHeight = "14vh";
	document.querySelector(".msgList").style.marginTop = "13vh";
};

export const msgWriteClose = () => {
	document.querySelector(".msgCreate").style.maxHeight = "0";
	document.querySelector(".msgList").style.marginTop = "0";
};

