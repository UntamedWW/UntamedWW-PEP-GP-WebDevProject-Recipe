/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

let recipes = [];

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {

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
     * Show logout button if auth-token exists in sessionStorage
     */
    const auth = sessionStorage.getItem("auth-token");
    if(auth){
        logoutButton.style.display = "block";
    }

    /*
     * Show admin link if is-admin flag in sessionStorage is "true"
     */
    if(sessionStorage.getItem("is-admin") === "true"){
        adminLink.style.display = "block";
    }
 
    /*
     * Attach event handlers
     */

    addRecipeButton.addEventListener("click", addRecipe);
    updateRecipeButton.addEventListener("click", updateRecipe);
    deleteRecipeButton.addEventListener("click", deleteRecipe);
    searchButton.addEventListener("click", searchRecipes);
    logoutButton.addEventListener("click", processLogout)

    /*
     * On page load, call getRecipes() to populate the list
     */
    getRecipes();


    /**
     * Search Recipes Function
     */
    async function searchRecipes() {
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
     * Add Recipe Function
     */
    async function addRecipe() {
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
                addRecipeNameInput.value = "";
                addRecipeInstructionsInput.value = "";

                getRecipes();
            }


        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * Update Recipe Function
     */
    async function updateRecipe() {
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
     * Delete Recipe Function
     */
    async function deleteRecipe() {
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
                }
            });
            
            if (response.ok) {
                deleteRecipeNameInput.value = "";
                getRecipes();
            } else {
                alert("You are not authorized to delete recipes!");
            }

        }catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * Get Recipes Function
     */
    async function getRecipes() {
        // Implement get logic here
        try{
            const response = await fetch(`${BASE_URL}/recipes`);

            recipes = await response.json();

            refreshRecipeList(recipes);
        } catch(error){
            alert("Oops, something is wrong. Try again later !");
        }
    }

    /**
     * Refresh Recipe List Function
     */
    function refreshRecipeList(recipes) {
        recipeList.innerHTML = "";

        recipes.forEach(recipe => {
            const li = document.createElement("li");

            li.textContent = `${recipe.name} - ${recipe.instructions}`;

            recipeList.appendChild(li)
        })
    }

    /**
     * Logout Function
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
    }

});
