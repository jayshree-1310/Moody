const loader = document.getElementById("loader");
const form = document.querySelector("form");
const searchResult = document.querySelector(".search");
const container = document.querySelector(".container");
let userQuery = "";

const ID = "491c0a25";
const key = "90f6192735aad01f8dc20fb18ee53869";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchResult.innerHTML = ""
  userQuery = e.target.querySelector("input").value;
  console.log(userQuery);
   if(!userQuery) return;
  fetchData();
});

async function fetchData() {
  loader.classList.add("loader")
  const baseURL = `https://api.edamam.com/search?q=${userQuery}&app_id=${ID}&app_key=${key}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data.hits);
  createContent(data.hits);
  loader.classList.remove("loader")
}

function createContent(results) {
  let initialContent = "";
  results.map((result) => {
    initialContent += `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class='title'>${result.recipe.label}</h1>
            <a class='view-btn' href='${result.recipe.url}'>View Recipe</a>
        </div>
        <p class='recipe-desc'>Calories : ${result.recipe.calories.toFixed(
          2
        )}</p>
    </div>`;
  });
  searchResult.innerHTML = initialContent;
}
