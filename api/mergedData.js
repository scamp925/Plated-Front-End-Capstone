import {
  deleteDinnerCard, deleteDinnerCards, getDinnerCards, getDinnersByDay, getDinnersByRecipe,
} from './dinnersData';
import { deleteRecipe, getSingleRecipe } from './recipesData';

// // GET RECIPE ON DINNER CARD
const getRecipeOnDinnerCard = (dayId) => new Promise((resolve, reject) => {
  getDinnersByDay(dayId).then((dinnerArray) => {
    const recipeIdPromises = dinnerArray.map((dinners) => getSingleRecipe(dinners.recipeId));

    Promise.all(recipeIdPromises).then((recipeArray) => {
      resolve(recipeArray[0]);
    });
  })
    .catch(reject);
});

// DELETE SINGLE RECIPE FROM ALL PAGES OF THE APP
const deleteRecipeCompletely = (recipeId) => new Promise((resolve, reject) => {
  getDinnersByRecipe(recipeId).then((dinnerArray) => {
    const deleteDinnerCardPromises = dinnerArray.map((dinner) => deleteDinnerCard(dinner.firebaseKey));

    Promise.all(deleteDinnerCardPromises).then(() => {
      deleteRecipe(recipeId).then(resolve);
    });
  }).catch(reject);
});

// DELETE ALL DINNER CARDS ON THE WEEK CALENDAR
const deleteAllDinnerCards = (uid) => new Promise((resolve, reject) => {
  getDinnerCards(uid).then((dinnersArray) => {
    const dinnerCardPromises = dinnersArray.map((dinner) => dinner.firebaseKey);

    Promise.all(dinnerCardPromises).then((dinnerFbKeyArray) => {
      deleteDinnerCards(dinnerFbKeyArray).then(resolve);
    });
  }).catch(reject);
});

export {
  getRecipeOnDinnerCard,
  deleteRecipeCompletely,
  deleteAllDinnerCards,
};
