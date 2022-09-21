import {
  deleteDinnerCard, getDinnersByDay, getDinnersByEatOutId, getDinnersByRecipe,
} from './dinnersData';
import { deleteEatOutCard, getSingleEatOutCard } from './eatOutData';
import { deleteRecipe, getSingleRecipe } from './recipesData';

// // GET RECIPE OR EAT OUT OPTION ON DINNER CARD
const getMealOnDinnerCard = (dayObj, uid) => new Promise((resolve, reject) => {
  getDinnersByDay(dayObj.firebaseKey).then((dinnerArray) => {
    const userDinnerObj = dinnerArray.find((dinnerObj) => dinnerObj.uid === uid);
    if (!userDinnerObj) {
      resolve({ dayObj, userDinnerObj });
    } else if (userDinnerObj.recipeId) {
      getSingleRecipe(userDinnerObj.recipeId).then((recipeObj) => resolve({ dayObj, userDinnerObj, recipeObj }));
    } else {
      getSingleEatOutCard(userDinnerObj.eatOutId).then((eatOutObj) => resolve({ dayObj, userDinnerObj, eatOutObj }));
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

// DELETE SINGLE EAT OUT CARD FROM ALL PAGES OF THE APP
const deleteEatOutCardCompletely = (eatOutId) => new Promise((resolve, reject) => {
  getDinnersByEatOutId(eatOutId).then((dinnerArray) => {
    const deleteDinnerCardPromises = dinnerArray.map((dinner) => deleteDinnerCard(dinner.firebaseKey));

    Promise.all(deleteDinnerCardPromises).then(() => {
      deleteEatOutCard(eatOutId).then(resolve);
    });
  }).catch(reject);
});

export {
  getMealOnDinnerCard,
  deleteRecipeCompletely,
  deleteEatOutCardCompletely,
};
