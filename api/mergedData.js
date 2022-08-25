import { deleteDinnerCard, getDinnersByDay, getDinnersByRecipe } from './dinnersData';
import { deleteRecipe, getSingleRecipe } from './recipesData';

// // GET RECIPE ON DINNER CARD
const getRecipeOnDinnerCard = (dayId) => new Promise((resolve, reject) => {
  getDinnersByDay(dayId).then((dinnersArray) => {
    const recipeIdPromises = dinnersArray.map((dinners) => getSingleRecipe(dinners.recipeId));

    Promise.all(recipeIdPromises).then((recipeArray) => {
      resolve(recipeArray[0]);
    });
  })
    .catch(reject);
});

const deleteRecipeCompletely = (recipeId) => new Promise((resolve, reject) => {
  getDinnersByRecipe(recipeId).then((dinnersArray) => {
    const deleteDinnerCardPromises = dinnersArray.map((dinner) => deleteDinnerCard(dinner.firebaseKey));

    Promise.all(deleteDinnerCardPromises).then(() => {
      deleteRecipe(recipeId).then(resolve);
    });
  }).catch(reject);
});

const deleteDinnerOnDay = (dayId, firebaseKey) => new Promise((resolve, reject) => {
  getDinnersByDay(dayId).then((dinnersArray) => {
    const deleteDinnerCardPromises = dinnersArray.map((dinner) => deleteDinnerCard(dinner.firebaseKey));

    Promise.all(deleteDinnerCardPromises).then(() => {
      deleteDinnerCard(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getRecipeOnDinnerCard,
  deleteRecipeCompletely,
  deleteDinnerOnDay,
};
