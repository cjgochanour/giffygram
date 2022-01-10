import { getUsers } from "../dataAccess.js";
import { setAuthStateLogin, setAuthStateReg } from "./Auth.js";

document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null;
        const userState = getUsers();

        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user;
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("beta_user", foundUser.id);
            document.querySelector(".beta").dispatchEvent(new CustomEvent("stateChanged"));
        } else {
            window.alert("Email or Password was incorrect. Please try again.")
        }
    }
});

//When register button is clicked, change authState to register and send out stateChanged event so main will rerender the whole app with register being returned for Auth()
document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "goToRegisterButton") {
        setAuthStateReg();
        document.querySelector(".beta").dispatchEvent(new CustomEvent("stateChanged"));
    }
});

export const LoginForm = () => {
    return `
    <section class="loginPage">
        <img class="betaLogo" src="images/betaLogo.png" />
        <div class="loginForm">
                    <label for="email">Email</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Password" />
            <div class="loginFormButtons">
                <button id="loginButton">Login</button>
                <button id="goToRegisterButton">Register</button>
            </div>
        </div>
    </section>
    `;
};
