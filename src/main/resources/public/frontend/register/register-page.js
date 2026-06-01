/**
 * This script defines the registration functionality for the Registration page in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/* 
 * TODO: Get references to various DOM elements
 * - usernameInput, emailInput, passwordInput, repeatPasswordInput, registerButton
 */

var usernameInput = document.getElementById("username-input");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");
var repeatPasswordInput = document.getElementById("repeat-password-input");
var registerButton = document.getElementById("register-button")


/* 
 * TODO: Ensure the register button calls processRegistration when clicked
 */
registerButton.addEventListener("click", processRegistration);


/**
 * TODO: Process Registration Function
 */
async function processRegistration() {

    try{
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;

        if(!username || !email || !password || !repeatPassword){
            alert("Please, fill all fields!");
            return;
        };

        if(password !== repeatPassword){
            alert("passwords are not matching!");
            return;
        };

        const registerBody = { username, email, password };

        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(registerBody)
        };

        const response = await fetch(`${BASE_URL}/register`, requestOptions)
        if(response.status === 201){
            window.location.href = "../login/login-page.html"
        } else if(response.status === 409){
            alert("Username or email is already exist!");
        } else {
            alert("Registration failed");
        }

    } catch(error){
        console.error(error);
        alert("Oops, something is wrong");
    }
}