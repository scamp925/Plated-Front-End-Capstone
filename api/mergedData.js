import { getSingleDinnerCard } from './dinnersData';
import { getSingleRecipe } from './recipesData';

// // GET RECIPE ON DINNER CARD
const getRecipeOnDinnerCard = (dayFirebaseKey, recipeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleDinnerCard(dayFirebaseKey)
    .then(() => getSingleRecipe(recipeFirebaseKey)
      .then(resolve))
    .catch(reject);
});

// // GET DAY ON DINNER CARD
// const getDayOnDinnerCard = (dayFirebaseKey) => new Promise((resolve, reject) => {

// });

export default getRecipeOnDinnerCard;
// export {
//   getRecipeOnDinnerCard,
//   getDayOnDinnerCard,
// };
