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

// GET DINNER CARDS BY DAYID
const getDinnersByDay = (dayId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/dinners.json?orderBy="dayId"&equalTo="${dayId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getDinnersByRecipe = (recipeId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/dinners.json?orderBy="recipeId"&equalTo="${recipeId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

// GET SINGLE DINNER CARD
const getSingleDinnerCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/dinners/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// GET ARRAY OF USER'S DINNER CARDS' FIREBASEKEYS
const getArrayOfFirebaseKey = (uid) => new Promise((resolve, reject) => {
  getDinnerCards(uid).then((dinnersArray) => {
    const dinnerCardPromises = dinnersArray.map((dinner) => dinner.firebaseKey);

    Promise.all(dinnerCardPromises).then(resolve);
  }).catch(reject);
});

// CREATE DINNER CARD
const createDinnerCard = (newDinnerCardObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/dinners.json`, newDinnerCardObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/dinners/${response.data.name}.json`, body).then(() => {
        getDinnerCards(newDinnerCardObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE DINNER CARD
const updateDinnerCard = (dinnerCardObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/dinners/${dinnerCardObj.firebaseKey}.json`, dinnerCardObj)
    .then(resolve)
    .catch(reject);
});

// DELETE SINGLE DINNER CARD
const deleteDinnerCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/dinners/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

// DELETE ALL DINNER CARDS ASSOCIATED TO USER
const clearAllDinners = (array) => new Promise((resolve, reject) => {
  const arrayOfPromises = array.map((firebaseKey) => deleteDinnerCard(firebaseKey));

  Promise.all(arrayOfPromises).then(resolve).catch(reject);
});
export {
  getDinnerCards,
  getDinnersByDay,
  getDinnersByRecipe,
  getSingleDinnerCard,
  getArrayOfFirebaseKey,
  createDinnerCard,
  updateDinnerCard,
  deleteDinnerCard,
  clearAllDinners,
};
