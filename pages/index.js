/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getDaysOfTheWeek } from '../api/daysOfTheWeekData';
import DinnerCards from '../components/cards/DinnerCards';

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
      <Button variant="secondary">Clear the Meals for This Week</Button>
      <div className="days-container">
        {days?.map((day) => (
          <DinnerCards key={day.firebaseKey} dayObj={day} onUpdate={getSunThruSat} />
        ))}
      </div>
    </div>
  );
}

export default Home;
