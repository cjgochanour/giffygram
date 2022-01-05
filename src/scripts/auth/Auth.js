import { LoginForm } from "./Login.js";
import { Register } from "./Register.js";

// Variable and functions for controlling login State

let authState = "login";

export const setAuthStateLogin = () => {
    authState = "login";
};

export const setAuthStateReg = () => {
    authState = "register";
};

// Auth() function to be called by main.js to return login or register html based on authState

export const Auth = () => {
    if (authState === "login") {
        return LoginForm();
    } else if (authState === "register") {
        return Register();
    }
}