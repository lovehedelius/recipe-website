import { isSaved, saveRecipe, unsaveRecipe } from "./local-storage-handler.js";

const MAIN = document.querySelector("main");

addEventListener("load", displayDetailedRecipe(JSON.parse(sessionStorage.getItem("recipe"))));

function displayDetailedRecipe(recipe) {
    const introductionHeader = document.createElement("header");
    const recipeHeading = document.createElement("h2");
    const infoList = document.createElement("ul");
    const timeItem = document.createElement("li");
    const ingredientsItem = document.createElement("li");
    const ratingItem = document.createElement("li");
    const descriptionParagraph = document.createElement("p");
    const image = document.createElement("img");
    const saveButton = document.createElement("button");

    const recipeSection = document.createElement("section");
    const ingredientsSection = document.createElement("section");
    const ingredientsHeading = document.createElement("h3");
    const servingsInfo = document.createElement("p");
    const ingredientsList = document.createElement("ul");
    const instructionsSection = document.createElement("section");
    const instructionsHeading = document.createElement("h3");
    const instructionsList = document.createElement("ol");

    saveButton.textContent = " Save Recipe";
    recipeHeading.textContent = recipe.name;
    timeItem.textContent = recipe.time ? `${recipe.time} minutes` : " N/A";
    ingredientsItem.textContent = `${recipe.ingredients.length} ingredients`;
    ratingItem.textContent = `${recipe.rating}% (${recipe.votes} votes)`;
    descriptionParagraph.textContent = recipe.description;
    image.src = recipe.image;
    image.alt = recipe.name;

    timeItem.classList.add("time-info");
    ingredientsItem.classList.add("ingredients-info");
    ratingItem.classList.add("rating-info");
    saveButton.classList.add("save");
    ingredientsSection.classList.add("ingredients");
    instructionsSection.classList.add("instructions");
    servingsInfo.classList.add("servings");

    if (isSaved(recipe)) {
        saveButton.classList.add("saved");
        saveButton.textContent = " Recipe Saved";
    }
    saveButton.addEventListener("click", function(event) {
        toggleSaved(recipe, event);
    });

    ingredientsHeading.textContent = "Ingredients";
    servingsInfo.textContent = `(${recipe.servings} servings)`;
    const ingredients = recipe.ingredients;
    for (let i = 0; i < ingredients.length; i++) {
        const item = document.createElement("li");
        const text = (ingredients[i].raw_text != "n/a") ? ingredients[i].raw_text : ingredients[i].ingredient.name;
        item.textContent = text;
        ingredientsList.append(item);
    }

    instructionsHeading.textContent = "Instructions";
    const instructions = recipe.instructions;
    for (let i = 0; i < instructions.length; i++) {
        const item = document.createElement("li");
        item.textContent = instructions[i].display_text;
        instructionsList.append(item);
    }

    infoList.append(timeItem, ingredientsItem, ratingItem);
    introductionHeader.append(saveButton, recipeHeading, infoList, descriptionParagraph, image);
    ingredientsSection.append(ingredientsHeading, servingsInfo, ingredientsList);
    instructionsSection.append(instructionsHeading, instructionsList);
    recipeSection.append(ingredientsSection, instructionsSection);
    MAIN.append(introductionHeader, recipeSection);
}

function toggleSaved(recipe, event) {
    const button = event.target;
    if (isSaved(recipe)) {
        unsaveRecipe(recipe);
        button.classList.remove("saved");
        button.textContent = " Save Recipe";
    } else {
        saveRecipe(recipe);
        button.classList.add("saved");
        button.textContent = " Recipe Saved";
    }
}