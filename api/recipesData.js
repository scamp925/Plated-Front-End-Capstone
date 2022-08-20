import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL RECIPES BY UID
const getRecipes = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE RECIPE
const getSingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE RECIPE
const createRecipe = (newRecipeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/recipes.json`, newRecipeObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/recipes/${response.data.name}.json`, body).then(() => {
        getRecipes(newRecipeObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE RECIPE
const updateRecipe = (recipeObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/recipes/${recipeObj.firebaseKey}.json`, recipeObj)
    .then(resolve)
    .catch(reject);
});

// DELETE RECIPE
const deleteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/recipes/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
