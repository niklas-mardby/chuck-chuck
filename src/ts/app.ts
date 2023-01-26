/* From API https://api.chucknorris.io/ */

const urlRandom = "https://api.chucknorris.io/jokes/random";
// https://api.chucknorris.io/jokes/random?category=food
const urlCategories = "https://api.chucknorris.io/jokes/categories";
const urlSearch = "https://api.chucknorris.io/jokes/search?query=beard";

const selectCategories = document.querySelector("#categories") as HTMLSelectElement;
const jokeTag = document.querySelector("#joke") as HTMLElement;

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