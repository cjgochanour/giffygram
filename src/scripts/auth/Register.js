export const Register = () => {
    return `
        <div class="registerForm">
            <form>
            <fieldset>
                <label form="firstName">First Name:</label>
                <input type="text" name="firstName" autofocus placeholder="First Name" />>
            </fieldset>
            <fieldset>
                <label form="lastName">Last Name:</label>
                <input type="text" name="lastName" placeholder="Last Name" />>
            </fieldset>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
        <button id="loginButton">Login</button>
        <button id="registerButton">Register</button>
        </div>`;
};
