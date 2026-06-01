/**
 * This script handles the login functionality for the Recipe Management Application.
 * It manages user authentication by sending login requests to the server and handling responses.
*/
const BASE_URL = "http://localhost:8081"; // backend URL

var usernameInput = document.getElementById("login-input");
var passwordInput = document.getElementById("password-input");
var loginButton = document.getElementById("login-button");
var logoutButton = document.getElementById("logout-button");

loginButton.addEventListener("click", processLogin);
logoutButton.addEventListener("click", processLogout)

//Login function
async function processLogin() {
    try {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if(!username || !password) {
            alert("Username or password is empty!");
            return
        }
    
        const requestBody = { username, password };

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
            body: JSON.stringify(requestBody)        
        };
    
        const response = await fetch(`${BASE_URL}/login`, requestOptions);

        if(response.status === 200) {
            const responseText = await response.text();

            const parts = responseText.split(" ");

            const token = parts[0];
            const isAdmin = parts[1];

            sessionStorage.setItem("auth-token", token);
            sessionStorage.setItem("is-admin", isAdmin);

            setTimeout (() => {
                window.location.href = "../recipe/recipe-page.html"
            }, 500);

        } else if( response.status === 401){
            alert("Wrong username or password!");
        } else {
            alert("Unknown issue!")
        }

    } catch (error) {
        console.log(error);
        alert("Something`s wrong, try again later!");
    }
}

async function processLogout() {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("is-admin");

    window.location.href = "../login/login-page.html"
    
}

