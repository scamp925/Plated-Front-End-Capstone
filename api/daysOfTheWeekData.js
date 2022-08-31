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

export default getDaysOfTheWeek;
