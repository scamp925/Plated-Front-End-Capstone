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

  const deleteDinners = () => {
    if (window.confirm('Are you sure you want to clear all dinners currently listed for this week? Click "OK" if you wish to continue.')) {
      deleteAllDinnerCards(user.uid);
    }
  };

  const getSunThruSat = () => {
    getDaysOfTheWeek().then(setDays);
  };

  useEffect(() => {
    getSunThruSat();
  }, []);

  return (
    <div>
      <h2>Dinners This Week</h2>
      <Button variant="secondary" onClick={deleteDinners}>Clear the Dinners for This Week</Button>
      <div className="days-container">
        {days?.map((day) => (
          <DinnerCards key={day.firebaseKey} dayObj={day} />
        ))}
      </div>
    </div>
  );
}

export default Home;
