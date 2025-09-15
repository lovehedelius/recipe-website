import { getMockedRecipes } from "./mock-api.js";

const BASE_URL = "https://tasty.p.rapidapi.com";
const RECIPES_PER_REQUEST = 1;
let totalRecipes = 10000;

export async function checkNbrRecipes(filter) {
    let url = `${BASE_URL}/recipes/list?from=0&size=1`;
    if (filter != "all") {
        url += `&tags=${filter}`;
    }
    const response = await fetch(url, {
        headers: {
            "x-rapidapi-key": "dd4d74245dmsh024141f86bdfb6dp1d5e6bjsn7824ade6d822",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    });
    const json = await response.json();
    totalRecipes = json.count;
}
    
export async function getRandomRecipe(filter) {
    const offset = Math.floor(Math.random() * (totalRecipes - RECIPES_PER_REQUEST + 1));
    let url = `${BASE_URL}/recipes/list?from=${offset}&size=${RECIPES_PER_REQUEST}`;
    if (filter != "all") {
        url += `&tags=${filter}`;
    }
    const response = await fetch(url, {
        headers: {
            "x-rapidapi-key": "dd4d74245dmsh024141f86bdfb6dp1d5e6bjsn7824ade6d822",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    });
    const json = await response.json();
    const nbrResults = json.results.length;
    const index = Math.floor(Math.random() * nbrResults);
    let recipe = json.results[index];

    const id = recipe.canonical_id;
    if (id.startsWith("compilation")) { // Some "recipes" are compilations containing multiple recipes
        const compilationSize = recipe.recipes.length;
        const compilationIndex = Math.floor(Math.random() * compilationSize);
        recipe = recipe.recipes[compilationIndex];
    }

    return {
        name: recipe.name,
        description: recipe.description,
        time: recipe.total_time_minutes,
        servings: recipe.num_servings,
        ingredients: recipe.sections.flatMap(section => section.components),
        instructions: recipe.instructions,
        image: recipe.thumbnail_url,
        rating: recipe.user_ratings.score.toPrecision(2) * 100,
        votes: recipe.user_ratings.count_negative + recipe.user_ratings.count_positive
    };
}

export async function getRandomRecipeMock() {
    const json = await getMockedRecipes();
    const nbrResults = json.results.length;
    const index = Math.floor(Math.random() * nbrResults);
    let recipe = json.results[index];

    const id = recipe.canonical_id;
    if (id.startsWith("compilation")) { // Some "recipes" are compilations containing multiple recipes
        const compilationSize = recipe.recipes.length;
        const compilationIndex = Math.floor(Math.random() * compilationSize);
        recipe = recipe.recipes[compilationIndex];
    }

    return {
        name: recipe.name,
        description: recipe.description,
        time: recipe.total_time_minutes,
        servings: recipe.num_servings,
        ingredients: recipe.sections.flatMap(section => section.components),
        instructions: recipe.instructions,
        image: recipe.thumbnail_url,
        rating: recipe.user_ratings.score.toPrecision(2) * 100,
        votes: recipe.user_ratings.count_negative + recipe.user_ratings.count_positive
    };
}