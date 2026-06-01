/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL


//  References to various DOM elements
const addIngredientNameInput = document.getElementById("add-ingredient-name-input");
const deleteIngredientNameInput = document.getElementById("delete-ingredient-name-input");

const ingredientListContainer = document.getElementById("ingredient-list");

const backLink = document.getElementById("back-link");


// 'onclick' events to:
const addIngredientButton = document.getElementById("add-ingredient-submit-button");
const deleteIngredientButton = document.getElementById("delete-ingredient-submit-button");

addIngredientButton.onclick = addIngredient;
deleteIngredientButton.onclick = deleteIngredient;


// An array to keep track of ingredients
let ingredients = [];

getIngredients()



// Ingredient Function
async function addIngredient() {
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


//  Fet ingredients Function
async function getIngredients() {
    try {
        const response = await fetch(`${BASE_URL}/ingredients`);

        const data = await response.json();

        ingredients = data;

        refreshIngredientList(ingredients);

    } catch (error) {
        alert("Failed to load ingredients!");
    }
}


// Delete Ingredient Function
async function deleteIngredient() {
    try{
        const name = deleteIngredientNameInput.value.trim();

        if(!name){
            alert("Please, fill the name of the ingridient");
            return;
        }

        const ingredientToDelete = ingredients.find(
            ingredient => ingredient.name === name
        );
        
        if (!ingredientToDelete) {
            alert("Ingredient not found!");
            return;
        }
        
        const token = sessionStorage.getItem("auth-token");
        
        const response = await fetch(
            `${BASE_URL}/ingredients/${ingredientToDelete.id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (response.ok) {
            deleteIngredientNameInput.value = "";

            getIngredients();
        } else {
            alert("Failed to delete ingredient!");
        }

    } catch(error) {
        alert("Something went wrong!");
    }
}



//Refresh Ingredient List Function
function refreshIngredientList() {
    try {
        ingredientListContainer.innerHTML = "";

        ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            const p = document.createElement("p");

            p.textContent = ingredient.name;

            li.appendChild(p);
            ingredientListContainer.appendChild(li);
        });

    } catch (error) {
        alert("Something went wrong!");
    }
}
