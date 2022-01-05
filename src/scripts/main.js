import { Beta } from "./Beta.js";

const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"));

    if (user) {
        applicationElement.innerHTML = Beta();
    } else {
        applicationElement.innerHTML = LoginForm();
    }
};
