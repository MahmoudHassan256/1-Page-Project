const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const closePopupBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true)
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ``}
        <img src="${mealData.strMealThumb}"alt=${mealData.strMeal}"">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`;
    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removetMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        fetchFavMeals();
    });
    meal.addEventListener('click', () => {
        showMealInfo(mealData);

    });
    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}
function removetMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}
function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    //clear container
    favoriteContainer.innerHTML = "";


    const mealIds = getMealLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addMealFav(meal);
    }

}
function addMealFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
    <img 
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}">
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fa-solid fa-circle-xmark"></i></button>
    `;
    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removetMealLS(mealData.idMeal);
        fetchFavMeals();

    });

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);

    });
    favoriteContainer.appendChild(favMeal);
}
searchBtn.addEventListener('click', async () => {
    //clear container
    mealsEl.innerHTML = '';

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);
    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

closePopupBtn.addEventListener('click', () => {
    mealPopup.classList.add("hidden");
});

function showMealInfo(mealData) {
    //update the info
    mealInfoEl.innerHTML = ``;
    const mealEl = document.createElement('div');
    const ingredients = [];
    //get ingredient
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(`${mealData["strIngredient" + i]} -${``}- ${mealData["strMeasure" + i]}`);
        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}">
    <p>
    ${mealData.strInstructions}
    </p>
    <h3>Ingredients / Measurements</h3>
    <ul>
    ${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
    </ul>
    `;
    mealInfoEl.appendChild(mealEl);

    //show the popup

    mealPopup.classList.remove('hidden');
}