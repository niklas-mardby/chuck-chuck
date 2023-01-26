/* From API https://api.chucknorris.io/ */

const urlRandom = "https://api.chucknorris.io/jokes/random";
// https://api.chucknorris.io/jokes/random?category=food
const urlCategories = "https://api.chucknorris.io/jokes/categories";
const urlSearch = "https://api.chucknorris.io/jokes/search?query=";

const selectCategories = document.querySelector("#categories") as HTMLSelectElement;
const jokeTag = document.querySelector("#joke") as HTMLElement;
const inputQueryString = document.querySelector("#query-string") as HTMLInputElement;
const buttonSearch = document.querySelector("#search-button") as HTMLButtonElement;

async function getCategories() {
    const response = await fetch(urlCategories);
    const data: string[] = await response.json();

    selectCategories.innerHTML = "";

    data.forEach(element => {
        let optionCategory = document.createElement("option");
        optionCategory.textContent = element;
        selectCategories.append(optionCategory);
    });
}

getCategories();

selectCategories.addEventListener("change", async (event) => {
    event.preventDefault();
    //console.log(selectCategories.value);
    const urlChosenCategory = urlRandom + "?category=" + selectCategories.value;

    const response = await fetch(urlChosenCategory);
    const data = await response.json();

    jokeTag.textContent = data.value;
});

// Issue: many words?
// Issue: fix Math.random

buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();

    const response = await fetch(urlSearch + inputQueryString.value);
    const data = await response.json();
    const arrLength = data.result.length;
    const randomElement = Math.floor(Math.random() * arrLength);

    jokeTag.textContent = data.result[randomElement].value;
});