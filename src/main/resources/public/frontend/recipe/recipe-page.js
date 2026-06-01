/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

let recipes = [];

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {

    /* 
     * TODO: Get references to various DOM elements
     * - Recipe name and instructions fields (add, update, delete)
     * - Recipe list container
     * - Admin link and logout button
     * - Search input
    */

    const addRecipeNameInput = document.getElementById("add-recipe-name-input");
    const addRecipeInstructionsInput = document.getElementById("add-recipe-instructions-input");
    const addRecipeButton = document.getElementById("add-recipe-submit-input");

    const updateRecipeNameInput = document.getElementById("update-recipe-name-input");
    const updateRecipeInstructionsInput = document.getElementById("update-recipe-instructions-input");
    const updateRecipeButton = document.getElementById("update-recipe-submit-input");

    const deleteRecipeNameInput = document.getElementById("delete-recipe-name-input");
    const deleteRecipeButton = document.getElementById("delete-recipe-submit-input");

    const recipeList = document.getElementById("recipe-list");

    const adminLink = document.getElementById("admin-link");
    const logoutButton = document.getElementById("logout-button");

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    /*
     * TODO: Show logout button if auth-token exists in sessionStorage
     */
    const auth = sessionStorage.getItem("auth-token");
    if(auth){
        logoutButton.style.display = "block";
    }

    /*
     * TODO: Show admin link if is-admin flag in sessionStorage is "true"
     */
    const admin = sessionStorage.getItem("is-admin");
    if(admin){
        adminLink.style.display = "block";
    }
 
    /*
     * TODO: Attach event handlers
     * - Add recipe button → addRecipe()
     * - Update recipe button → updateRecipe()
     * - Delete recipe button → deleteRecipe()
     * - Search button → searchRecipes()
     * - Logout button → processLogout()
     */

    addRecipeButton.addEventListener("click", addRecipe);
    updateRecipeButton.addEventListener("click", updateRecipe);
    deleteRecipeButton.addEventListener("click", deleteRecipe);
    searchButton.addEventListener("click", searchRecipes);
    logoutButton.addEventListener("click", processLogout)

    /*
     * TODO: On page load, call getRecipes() to populate the list
     */
    getRecipes();


    /**
     * TODO: Search Recipes Function
     * - Read search term from input field
     * - Send GET request with name query param
     * - Update the recipe list using refreshRecipeList()
     * - Handle fetch errors and alert user
     */
    async function searchRecipes() {
        // Implement search logic here
        try{
            const name = searchInput.value;
            const response = await fetch (`${BASE_URL}/recipes?name=${name}`)
            const recipes = await response.json();

            refreshRecipeList(recipes);

        } catch(error){
            alert("Failed!");
        }
    }

    /**
     * TODO: Add Recipe Function
     * - Get values from add form inputs
     * - Validate both name and instructions
     * - Send POST request to /recipes
     * - Use Bearer token from sessionStorage
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function addRecipe() {
        // Implement add logic here
        try{
            const recipeName = addRecipeNameInput.value;
            const recipe = addRecipeInstructionsInput.value;

            if(!recipeName || !recipe ){
                alert("Please, put recipe name and instruction!");
                return;
            }

            const token = sessionStorage.getItem("auth-token");

            const response = await fetch(`${BASE_URL}/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: recipeName,
                    instructions: recipe
                })     
            });

            if (response.ok) {
                addRecipeInput.value = "";
                addRecipeInstructionsInput.value = "";

                getRecipes();
            }


        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * TODO: Update Recipe Function
     * - Get values from update form inputs
     * - Validate both name and updated instructions
     * - Fetch current recipes to locate the recipe by name
     * - Send PUT request to update it by ID
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function updateRecipe() {
        // Implement update logic here
        try{
            const recipeName = updateRecipeNameInput.value;
            const recipeInstruction = updateRecipeInstructionsInput.value;

            if(!recipeName || !recipeInstruction ){
                alert("Please, put recipe name and instruction!");
                return;
            }

            const token = sessionStorage.getItem("auth-token");

            const recipesResponse = await fetch(`${BASE_URL}/recipes`);
            const recipes = await recipesResponse.json(); 
            
            const recipeToUpdate = recipes.find(
                recipe => recipe.name === recipeName
            );

            if (!recipeToUpdate) {
                alert("Recipe not found!");
                return;
            }

            const response = await fetch(`${BASE_URL}/recipes/${recipeToUpdate.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: recipeName,
                    instructions: recipeInstruction
                })     
            });

            if (response.ok) {
                updateRecipeNameInput.value = "";
                updateRecipeInstructionsInput.value = "";

                getRecipes();
            }

        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * TODO: Delete Recipe Function
     * - Get recipe name from delete input
     * - Find matching recipe in list to get its ID
     * - Send DELETE request using recipe ID
     * - On success: refresh the list
     */
    async function deleteRecipe() {
        // Implement delete logic here
        try{
            const recipeName = deleteRecipeNameInput.value;

            if(!recipeName){
                alert("Please, put recipe name!");
                return;
            }

            const token = sessionStorage.getItem("auth-token");

            const recipesResponse = await fetch(`${BASE_URL}/recipes`);
            const recipes = await recipesResponse.json(); 
            
            const recipeToDelete = recipes.find(
                recipe => recipe.name === recipeName
            );

            if (!recipeToDelete) {
                alert("Recipe not found!");
                return;
            }

            const response = await fetch(`${BASE_URL}/recipes/${recipeToDelete.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: recipeName
                })     
            });

            if (response.ok) {
                deleteRecipeNameInput.value = "";

                getRecipes();
            }

        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * TODO: Get Recipes Function
     * - Fetch all recipes from backend
     * - Store in recipes array
     * - Call refreshRecipeList() to display
     */
    async function getRecipes() {
        // Implement get logic here
        try{
            const response = await fetch(`${BASE_URL}/recipes`);

            const recipes = response.json();

            refreshRecipeList(recipes);
        } catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * TODO: Refresh Recipe List Function
     * - Clear current list in DOM
     * - Create <li> elements for each recipe with name + instructions
     * - Append to list container
     */
    function refreshRecipeList(recipes) {
        // Implement refresh logic here
        try{
            recipeList.innerHTML = "";

            recipes.forEach(recipe => {
                const li = document.createElement("li");

                li.textContent = `${recipe.name} - ${recipe.instructions}`;

                recipeList.appendChild(li)
            })
            

        } catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * TODO: Logout Function
     * - Send POST request to /logout
     * - Use Bearer token from sessionStorage
     * - On success: clear sessionStorage and redirect to login
     * - On failure: alert the user
     */
    async function processLogout() {
        try{
            const token = sessionStorage.getItem("auth-token");

            const response = await fetch(`${BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response.ok){
                sessionStorage.clear();
                window.location.href = "../login/login-page.html";
            } else {
                alert("Logout failed!");
            }

        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
        // Implement logout logic here
    }

});
