/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import getDaysOfTheWeek from '../api/daysOfTheWeekData';
import { getRecipeOnDinnerCard } from '../api/mergedData';
import DinnerCards from '../components/cards/dinnerCards';
import ClearTheWeek from '../components/features/ClearTheWeek';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [days, setDays] = useState([]);
  const { user } = useAuth();

  const getSunThruSat = () => {
    getDaysOfTheWeek().then((daysArray) => {
      const dayPromises = daysArray.map((dayObj) => getRecipeOnDinnerCard(dayObj, user.uid));

      Promise.all(dayPromises).then(setDays);
    });
  };

  useEffect(() => {
    getSunThruSat();
  }, []);

  return (
    <div>
      <h2 className="title mt-3">This Week's Dinners</h2>
      <ClearTheWeek onUpdate={getSunThruSat} />
      <div className="cards-container">
        {days?.map((day) => (
          <DinnerCards key={day.dayObj.firebaseKey} dayCardInfo={day} onUpdate={getSunThruSat} />
        ))}
      </div>
    </div>
  );
}

export default Home;
