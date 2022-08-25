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

// DELETE DINNER CARD
const deleteDinnerCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/dinners/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getDinnerCards,
  getDinnersByDay,
  getDinnersByRecipe,
  getSingleDinnerCard,
  createDinnerCard,
  updateDinnerCard,
  deleteDinnerCard,
};
