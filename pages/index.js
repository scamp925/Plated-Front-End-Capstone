/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getDaysOfTheWeek } from '../api/daysOfTheWeekData';
import { getSingleDinnerCard } from '../api/dinnersData';
import DaysOfTheWeek from '../components/cards/daysOfTheWeek';

function Home() {
  const [days, setDays] = useState([]);
  const [dinnerCards, setDinnerCards] = useState({});

  const getSunThruSat = () => {
    getDaysOfTheWeek().then(setDays);
  };

  const singleDinnerCardbyDayId = () => {
    getSingleDinnerCard(days.firebaseKey).then(setDinnerCards);
  };

  useEffect(() => {
    getSunThruSat();
    singleDinnerCardbyDayId();
  }, []);

  return (
    <div>
      <h2>Dinners This Week</h2>
      <div className="days-container">
        {days?.map((day) => (
          <DaysOfTheWeek key={day.firebaseKey} dayObj={day} dinnerObj={dinnerCards} />
        ))}
      </div>
    </div>
  );
}

export default Home;
