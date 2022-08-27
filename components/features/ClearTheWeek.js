import React from 'react';
import Button from 'react-bootstrap/Button';
import { getArrayOfFirebaseKey } from '../../api/dinnersData';
import { useAuth } from '../../utils/context/authContext';

export default function ClearTheWeek() {
  const { user } = useAuth();

  const deleteDinnersOfWeek = () => {
    getArrayOfFirebaseKey(user.uid).then((response) => {
      console.warn('Clear the week', response);
    });
  };

  return (
    <div>
      <Button variant="secondary" onClick={deleteDinnersOfWeek}>Clear the Dinners for This Week</Button>
    </div>
  );
}
