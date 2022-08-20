import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL DINNERS CARDS BY UID
const getDinnerCards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/dinners.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE DINNER CARD
const createDinnerCard = (newRecipeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/dinners.json`, newRecipeObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/dinners/${response.data.name}.json`, body).then(() => {
        getDinnerCards(newRecipeObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE DINNER CARD
const updateDinnerCard = (recipeObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/dinners/${recipeObj.firebaseKey}.json`, recipeObj)
    .then(resolve)
    .catch(reject);
});

// DELETE DINNER CARD
const deleteDinnerCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/dinners/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getDinnerCards,
  createDinnerCard,
  updateDinnerCard,
  deleteDinnerCard,
};
