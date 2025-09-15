import { checkNbrRecipes, getRandomRecipe, getRandomRecipeMock } from "./api-handler.js";
import { isSaved, saveRecipe, unsaveRecipe } from "./local-storage-handler.js";

const RECIPE_BUTTON = document.querySelector("main>button");
const FILTER_FORM = document.querySelector("form");
const RECIPE = document.querySelector("article");

addEventListener("load", function() {
    checkNbrRecipes("all");
});
FILTER_FORM.addEventListener("change", function() {
    const selectedFilter = FILTER_FORM["filter"].value;
    checkNbrRecipes(selectedFilter);
});
RECIPE_BUTTON.addEventListener("click", displayRecipeOverview);

async function displayRecipeOverview() {
    RECIPE.replaceChildren();

    const selectedFilter = FILTER_FORM["filter"].value;
    let recipe;
    try {
        recipe = await getRandomRecipe(selectedFilter);
    } catch(error) {
        recipe = await getRandomRecipeMock();
    }
    sessionStorage.setItem("recipe", JSON.stringify(recipe));

    const recipeHeading = document.createElement("h2");
    const infoList = document.createElement("ul");
    const timeItem = document.createElement("li");
    const ingredientsItem = document.createElement("li");
    const ratingItem = document.createElement("li");
    const descriptionParagraph = document.createElement("p");
    const image = document.createElement("img");
    const saveButton = document.createElement("button");

    recipeHeading.textContent = recipe.name;
    timeItem.textContent = recipe.time ? `${recipe.time} minutes` : "N/A";
    ingredientsItem.textContent = `${recipe.ingredients.length} ingredients`;
    ratingItem.textContent = `${recipe.rating}%`;
    descriptionParagraph.textContent = recipe.description;
    image.src = recipe.image;
    image.alt = recipe.name;
    saveButton.textContent = "Save"

    timeItem.classList.add("time-info");
    ingredientsItem.classList.add("ingredients-info");
    ratingItem.classList.add("rating-info");
    saveButton.classList.add("save");

    if (isSaved(recipe)) {
        saveButton.classList.add("saved");
        saveButton.textContent = "Saved";
    }
    saveButton.addEventListener("click", function(event) {
        toggleSaved(recipe, event);
    });

    infoList.append(timeItem, ingredientsItem, ratingItem);
    RECIPE.append(recipeHeading, infoList, descriptionParagraph, image, saveButton);

    RECIPE.parentElement.classList.remove("hidden");
}

function toggleSaved(recipe, event) {
    event.preventDefault();
    const button = event.target;
    if (isSaved(recipe)) {
        unsaveRecipe(recipe);
        button.classList.remove("saved");
        button.textContent = " Save";
    } else {
        saveRecipe(recipe);
        button.classList.add("saved");
        button.textContent = " Saved";
    }
}