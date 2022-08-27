import React from 'react';
import Button from 'react-bootstrap/Button';
import { clearAllDinners, getArrayOfFirebaseKey } from '../../api/dinnersData';
import { useAuth } from '../../utils/context/authContext';

export default function ClearTheWeek() {
  const { user } = useAuth();

  const clearAllDinnersForTheWeek = () => {
    if (window.confirm('Are you sure you want to clear all dinners currently listed for this week? Click "OK" if you wish to continue.')) {
      getArrayOfFirebaseKey(user.uid).then((firebaseKeyArray) => {
        clearAllDinners(firebaseKeyArray);
      });
    }
  };

  return (
    <div>
      <Button variant="secondary" onClick={clearAllDinnersForTheWeek}>Clear the Dinners for This Week</Button>
    </div>
  );
}
