import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL DAYS OF THE WEEK
const getDaysOfTheWeek = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/daysOfTheWeek.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE DAY OF THE WEEK
const createDayOfTheWeek = (newDayObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/daysOfTheWeek.json`, newDayObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/daysOfTheWeek/${response.data.name}.json`, body).then(() => {
        getDaysOfTheWeek(newDayObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE DAY OF THE WEEK
const updateDayOfTheWeek = (dayObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/daysOfTheWeek/${dayObj.firebaseKey}.json`, dayObj)
    .then(resolve)
    .catch(reject);
});

export {
  getDaysOfTheWeek,
  createDayOfTheWeek,
  updateDayOfTheWeek,
};
