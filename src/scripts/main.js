import { Beta } from "./Beta.js";

const applicationElement = document.querySelector(".beta");

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("beta_user"));

    if (user) {
        applicationElement.innerHTML = Beta();
    } else {
        applicationElement.innerHTML = LoginForm();
    }
};
