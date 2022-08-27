import {
  deleteDinnerCard, getDinnersByDay, getDinnersByRecipe,
} from './dinnersData';
import { deleteRecipe, getSingleRecipe } from './recipesData';

// // GET RECIPE ON DINNER CARD
const getRecipeOnDinnerCard = (dayObj, uid) => new Promise((resolve, reject) => {
  getDinnersByDay(dayObj.firebaseKey).then((dinnerArray) => {
    const userDinnerObj = dinnerArray.find((dinnerObj) => dinnerObj.uid === uid);
    if (!userDinnerObj) {
      resolve({ dayObj, userDinnerObj });
    } else {
      getSingleRecipe(userDinnerObj.recipeId).then((recipeObj) => resolve({ dayObj, userDinnerObj, recipeObj }));
    }
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

export {
  getRecipeOnDinnerCard,
  deleteRecipeCompletely,
};
