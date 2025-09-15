export function isSaved(recipe) {
    const savedRecipes = getSavedRecipes();
    for (let i = 0; i < savedRecipes.length; i++) {
        if (savedRecipes[i].name === recipe.name) {
            return true;
        }
    }
    return false;
}

export function saveRecipe(recipe) {
    if (isSaved(recipe)) {
        return;
    }
    const savedRecipes = getSavedRecipes();
    savedRecipes.push(recipe);
    const savedRecipesString = JSON.stringify(savedRecipes);
    localStorage.setItem("savedRecipes", savedRecipesString);
}

export function unsaveRecipe(recipe) {
    if (!isSaved(recipe)) {
        return;
    }
    const savedRecipes = getSavedRecipes();
    for (let i = savedRecipes.length - 1; i >= 0; i--) {
        if (savedRecipes[i].name === recipe.name) {
            savedRecipes.splice(i, 1);
        }
    }
    const savedRecipesString = JSON.stringify(savedRecipes);
    localStorage.setItem("savedRecipes", savedRecipesString);
}

function getSavedRecipes() {
    const savedRecipesString = localStorage.getItem("savedRecipes");
    const savedRecipes = savedRecipesString ? JSON.parse(savedRecipesString) : [];
    return savedRecipes;
}