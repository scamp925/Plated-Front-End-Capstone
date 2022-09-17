import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL EAT OUT CARDS BY UID
const getEatOutCards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/eatOut.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
// GET SINNGLE EAT OUT CARD
const getSingleEatOutCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/eatOut/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
// CREATE EAT OUT CARD
const createEatOutCard = (newEatOutObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/eatOut.json`, newEatOutObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/eatOut/${response.data.name}.json`, body).then(() => {
        getEatOutCards(newEatOutObj.uid).then(resolve);
      });
    })
    .catch(reject);
});
// UPDATE EAT OUT CARD
const updateEatOutCard = (recipeObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/eatOut/${recipeObj.firebaseKey}.json`, recipeObj)
    .then(resolve)
    .catch(reject);
});

// DELETE EAT OUT CARD
const deleteEatOutCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/eatOut/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getEatOutCards,
  getSingleEatOutCard,
  createEatOutCard,
  updateEatOutCard,
  deleteEatOutCard,
};
