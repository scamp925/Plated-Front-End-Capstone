/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getDaysOfTheWeek } from '../api/daysOfTheWeekData';
import { deleteAllDinnerCards } from '../api/mergedData';
import DinnerCards from '../components/cards/DinnerCards';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [days, setDays] = useState([]);
  const { user } = useAuth();

  const getSunThruSat = () => {
    getDaysOfTheWeek().then(setDays);
  };

  const deleteAllDinners = () => {
    deleteAllDinnerCards(user.uid);
  };

  useEffect(() => {
    getSunThruSat();
    deleteAllDinners();
  }, []);

  return (
    <div>
      <h2>Dinners This Week</h2>
      <Button variant="secondary">Clear the Dinners for This Week</Button>
      <div className="days-container">
        {days?.map((day) => (
          <DinnerCards key={day.firebaseKey} dayObj={day} />
        ))}
      </div>
    </div>
  );
}

export default Home;
