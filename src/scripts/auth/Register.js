export const Register = () => {
    return `
        <div class="registerForm">
            <form>
                <fieldset>
                    <label form="name">Full Name:</label>
                    <input type="text" name="name" autofocus placeholder="Full Name" />>
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
