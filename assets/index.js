const generateMealButton = document.querySelector('#generateMealButton');
const mealContainer = document.querySelector('#mealContainer');

generateMealButton.addEventListener('click', () => {
  mealContainer.innerHTML = ''; // clear any previous meals from the container
  
  fetch('https://api.spoonacular.com/recipes/random?number=3&tags=healthy&apiKey=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
      data.recipes.forEach(recipe => {
        const meal = document.createElement('div');
        meal.classList.add('meal');
        
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.title;
        
        const title = document.createElement('h2');
        title.textContent = recipe.title;
        
        const summary = document.createElement('p');
        summary.innerHTML = recipe.summary;
        
        const ingredientsList = document.createElement('ul');
        recipe.extendedIngredients.forEach(ingredient => {
          const li = document.createElement('li');
          li.textContent = `${ingredient.original}`;
          ingredientsList.appendChild(li);
        });
        
        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${recipe.instructions}`;
        
        meal.appendChild(image);
        meal.appendChild(title);
        meal.appendChild(summary);
        meal.appendChild(ingredientsList);
        meal.appendChild(instructions);
        
        mealContainer.appendChild(meal);
      });
    })
    .catch(error => console.log(error));
});