import { getUsers } from "./dataAccess.js";

export const messageForm = () => {
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
            <button id="sendMessage">Send</button>
    </div>`;
    return html;
};
