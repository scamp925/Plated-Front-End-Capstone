/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getDaysOfTheWeek } from '../api/daysOfTheWeekData';
import DinnerCards from '../components/cards/dinnerCards';

function Home() {
  const [days, setDays] = useState([]);

  const getSunThruSat = () => {
    getDaysOfTheWeek().then(setDays);
  };

  useEffect(() => {
    getSunThruSat();
  }, []);

  return (
    <div>
      <h2>Dinners This Week</h2>
      <div className="days-container">
        {days?.map((day) => (
          <DinnerCards key={day.firebaseKey} dayObj={day} />
        ))}
      </div>
    </div>
  );
}

export default Home;
