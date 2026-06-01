/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/* 
 * TODO: Get references to various DOM elements
 * - addIngredientNameInput
 * - deleteIngredientNameInput
 * - ingredientListContainer
 * - searchInput (optional for future use)
 * - adminLink (if visible conditionally)
 */
const addIngredientNameInput = document.getElementById("add-ingredient-name-input");
const deleteIngredientNameInput = document.getElementById("delete-ingredient-name-input");

const ingredientListContainer = document.getElementById("ingredient-list");

const backLink = document.getElementById("back-link");

/* 
 * TODO: Attach 'onclick' events to:
 * - "add-ingredient-submit-button" → addIngredient()
 * - "delete-ingredient-submit-button" → deleteIngredient()
 */
const addIngredientButton = document.getElementById("add-ingredient-submit-button");
const deleteIngredientButton = document.getElementById("delete-ingredient-submit-button");

addIngredientButton.onclick = addIngredient;
deleteIngredientButton.onclick = deleteIngredient;

/*
 * TODO: Create an array to keep track of ingredients
 */

let ingredients = [];

/* 
 * TODO: On page load, call getIngredients()
 */
getIngredients()


/**
 * TODO: Add Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from addIngredientNameInput
 * - Validate input is not empty
 * - Send POST request to /ingredients
 * - Include Authorization token from sessionStorage
 * - On success: clear input, call getIngredients() and refreshIngredientList()
 * - On failure: alert the user
 */
async function addIngredient() {
    // Implement add ingredient logic here
    try {
        const name = addIngredientNameInput.value.trim();

        if (!name) {
            alert("Please enter ingredient name!");
            return;
        }

        const token = sessionStorage.getItem("auth-token");

        const response = await fetch(`${BASE_URL}/ingredients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name
            })
        });

        if (response.ok) {
            addIngredientNameInput.value = "";

            getIngredients();
        } else {
            alert("Failed to add ingredient!");
        }

    } catch (error) {
        alert("Something went wrong!");
    }
}


/**
 * TODO: Get Ingredients Function
 * 
 * Requirements:
 * - Fetch all ingredients from backend
 * - Store result in `ingredients` array
 * - Call refreshIngredientList() to display them
 * - On error: alert the user
 */
async function c() {
    // Implement get ingredients logic here
    try {
        const response = await fetch(`${BASE_URL}/ingredients`);

        const data = await response.json();

        ingredients = data;

        refreshIngredientList(ingredients);

    } catch (error) {
        alert("Failed to load ingredients!");
    }
}


/**
 * TODO: Delete Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from deleteIngredientNameInput
 * - Search ingredientListContainer's <li> elements for matching name
 * - Determine ID based on index (or other backend logic)
 * - Send DELETE request to /ingredients/{id}
 * - On success: call getIngredients() and refreshIngredientList(), clear input
 * - On failure or not found: alert the user
 */
async function deleteIngredient() {
    // Implement delete ingredient logic here
}


/**
 * TODO: Refresh Ingredient List Function
 * 
 * Requirements:
 * - Clear ingredientListContainer
 * - Loop through `ingredients` array
 * - For each ingredient:
 *   - Create <li> and inner <p> with ingredient name
 *   - Append to container
 */
function refreshIngredientList() {
    // Implement ingredient list rendering logic here
}
