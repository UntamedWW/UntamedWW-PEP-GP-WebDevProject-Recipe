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
 * 
 * Requirements:
 * - Retrieve username, email, password, and repeat password from input fields
 * - Validate all fields are filled
 * - Check that password and repeat password match
 * - Create a request body with username, email, and password
 * - Define requestOptions using method POST and proper headers
 * 
 * Fetch Logic:
 * - Send POST request to `${BASE_URL}/register`
 * - If status is 201:
 *      - Redirect user to login page
 * - If status is 409:
 *      - Alert that user/email already exists
 * - Otherwise:
 *      - Alert generic registration error
 * 
 * Error Handling:
 * - Wrap in try/catch
 * - Log error and alert user
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
        } else if(response.status == 409){
            alert("Username or email is already exist!");
        } else {
            alert("Registration failed");
        }

    }catch(error){
        console.error(error);
        alert("Oops, something is wrong");

    }

    // Example placeholder:
        // const registerBody = { username, email, password };

    // await fetch(...)
}


// **Requirements:**

// - Registration form should include:
//   - Username, Email, Password, Repeat Password fields
//   - Submit button with ID `register-button`
// - JS should:
//   - Validate that all inputs are filled
//   - Ensure password and repeated password match
//   - Create a registration object and send a POST request to `http://localhost:8081/register`
//   - On success: redirect to login page
//   - On failure: show an alert 
  
//   