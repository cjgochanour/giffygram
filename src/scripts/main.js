import {
	fetchLikes,
	fetchMessages,
	fetchPosts,
	fetchUsers
} from "./dataAccess.js";
import { Beta } from "./Beta.js";
import { LoginForm } from "./auth/Login.js";

const mainContainer = document.querySelector(".beta");

export const renderApp = () => {
	Promise.all([
		fetchUsers(),
		fetchPosts(),
		fetchLikes(),
		fetchMessages()
	]).then(() => {
		const user = parseInt(localStorage.getItem("beta_user"));

		if (user) {
			mainContainer.innerHTML = Beta();
		} else {
			mainContainer.innerHTML = LoginForm();
		}
	});
};

mainContainer.addEventListener("stateChanged", (event) => {
	renderApp();
});

renderApp();
