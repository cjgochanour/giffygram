import { sendUser, getUsers } from "../dataAccess.js";
import { setAuthStateLogin, setAuthStateReg } from "./Auth.js";

const mainContainer = document.querySelector(".beta");

export const Register = () => {
  return `
      <section class="registerPage">
        <img class="betaLogo" src="images/betaLogo.png" />
        <div class="registerForm">
                <label form="firstName">First Name:</label>
                <input type="text" name="firstName" autofocus placeholder="First Name" />
                <label form="lastName">Last Name:</label>
                <input type="text" name="lastName" placeholder="Last Name" />
                    <label for="email">Email:</label>
                    <input type="text" name="email" placeholder="Email address" />
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                    <label for="gifLink">Profile Gif</label>
                    <input type="text" name="gifLink" placeholder="Link the Gif that represents You" />
                    <label for="bio">Short Bio (not required)</label>
                    <textarea name="bio" id="bioRegister" placeholder="Tell us about yourself (max 250 characters)" rows="4"></textarea>
          <div class="registerFormButtons">
            <button id="returnToLoginButton">Return to Login</button>
            <button id="registerButton">Register</button>
          </div>
        </div>
      </section>`;
};

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "registerButton") {
    const users = getUsers();
    const newFirstName = document.querySelector("input[name='firstName']").value;
    const newLastName = document.querySelector("input[name='lastName']").value;
    const newEmail = document.querySelector("input[name='email']").value.toLowerCase();
    const newPassword = document.querySelector("input[name='password']").value;
    const newGifLink = document.querySelector("input[name='gifLink']").value;
    const newBio = document.querySelector("#bioRegister").value;

    const dataToSendToAPI = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      gifLink: newGifLink,
      bio: newBio
    };

    if (users.find((user) => user.email === newEmail)) {
      window.alert("This email is already in use");
    } else if (!newFirstName || !newLastName || !newEmail || !newPassword || !newGifLink) {
      window.alert("Please fill out all required fields")
    } else {
      setAuthStateLogin()
      sendUser(dataToSendToAPI)
      .then(res => res.json())
      .then((newUser) => {
        localStorage.setItem("beta_user", newUser.id)
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
      });
    }
  }
});

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "returnToLoginButton") {
    setAuthStateLogin()
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
  }
});