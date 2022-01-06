import { getUsers, sendMessage, getCurrentUser } from "../dataAccess.js";

const mainContainer = document.querySelector(".beta")

export const MessageForm = () => {
  const users = getUsers();

  let html = `        
    <div class="messageForm">
        <form>
            <fieldset>
                <select id="msgRecList" class="messageFormItem recipientList">
                    <option value = "0">Choose Recipient</option>
                        ${users.map((user) => {
                            return `
                                <option class="recipientListItem" value="${user.id}">${user.firstName} ${user.lastName}</option>
                            `;
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
        const currentMessage = document.querySelector("textarea[name='messageCreate']").value;
        const recipientSelect = document.querySelector("select[id='msgRecList']");
        const currentRecipient = parseInt(recipientSelect.options[recipientSelect.selectedIndex].value)
        const timestamp = Date.now();
        const authorId = author.id;

        const dataToSendToAPI = {
            recipientId: currentRecipient,
            message: currentMessage,
            authorId: authorId,
            timestamp: timestamp,
            read: false
          };
        
          
          sendMessage(dataToSendToAPI)
            .then(() => {
            window.alert("Message Successfuly Sent")
            mainContainer.dispatchEvent(new CustomEvent("msgListChanged"));     
            });
  
  }
})
