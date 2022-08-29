import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { clearAllDinners, getArrayOfFirebaseKey } from '../../api/dinnersData';
import { useAuth } from '../../utils/context/authContext';

function ClearTheWeek({ onUpdate }) {
  const { user } = useAuth();

  const clearAllDinnersForTheWeek = () => {
    if (window.confirm('Are you sure you want to clear all dinners currently listed for this week? Click "OK" if you wish to continue.')) {
      getArrayOfFirebaseKey(user.uid).then((firebaseKeyArray) => {
        clearAllDinners(firebaseKeyArray);
      }).then(() => onUpdate());
    }
  };

  return (
    <div className="to-the-right">
      <Button variant="outline-light" onClick={clearAllDinnersForTheWeek}>Clear the Dinners for This Week</Button>
    </div>
  );
}

ClearTheWeek.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default ClearTheWeek;
