import { useEffect, useState } from 'react';
import { getDaysOfTheWeek } from '../api/daysOfTheWeekData';
import DaysOfTheWeek from '../components/cards/daysOfTheWeek';

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
          <DaysOfTheWeek key={day.firebaseKey} dayObj={day} />
        ))}
      </div>
    </div>
  );
}

export default Home;
