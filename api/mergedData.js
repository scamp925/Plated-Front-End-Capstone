import { getDinnersByDay } from './dinnersData';
import { getSingleRecipe } from './recipesData';

// // GET RECIPE ON DINNER CARD
const getRecipeOnDinnerCard = (dayId) => new Promise((resolve, reject) => {
  getDinnersByDay(dayId).then((dinnersArray) => {
    console.warn(dinnersArray, 'dinner array');
    const recipeIdPromises = dinnersArray.map((dinners) => getSingleRecipe(dinners.recipeId));

    Promise.all(recipeIdPromises).then((recipeArray) => {
      console.warn(recipeArray);
      resolve(recipeArray[0]);
    });
  })
    .catch(reject);
});

export default getRecipeOnDinnerCard;
