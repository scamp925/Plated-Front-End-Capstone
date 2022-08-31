/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import { deleteDinnerCard } from '../../api/dinnersData';

function DinnerCards({ dayCardInfo, onUpdate }) {
  const deleteThisDinnerCard = () => {
    if (window.confirm(`Are you sure you want to clear ${dayCardInfo.dayObj.day}'s current meal? Click "OK" if you wish to continue.`)) {
      deleteDinnerCard(dayCardInfo.userDinnerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayCardInfo.dayObj?.day}</Card.Title>
          {dayCardInfo.userDinnerObj && (
            <RecipeCards recipeObj={dayCardInfo.recipeObj} />
          )}
        </Card.Body>
        <footer>
          {dayCardInfo.userDinnerObj ? (
            <div className="edit-delete-footer">
              <Link href={`/dinners/edit/${dayCardInfo.userDinnerObj?.firebaseKey}`} passHref>
                <Button variant="info" className="edit-btn">Change Dinner</Button>
              </Link>
              <Button variant="danger" className="delete-btn" onClick={deleteThisDinnerCard}>Clear Dinner</Button>
            </div>
          ) : (
            <Link href={`/dinners/new/${dayCardInfo.dayObj?.firebaseKey}`} passHref>
              <Button variant="success" className="add-btn">Add</Button>
            </Link>
          )}
        </footer>
      </Card>
    </div>
  );
}

DinnerCards.propTypes = {
  dayCardInfo: PropTypes.shape({
    dayObj: PropTypes.shape({
      day: PropTypes.string,
      firebaseKey: PropTypes.string,
    }),
    recipeObj: PropTypes.shape({
      firebaseKey: PropTypes.string,
      name: PropTypes.string,
      totalTime: PropTypes.string,
      preheat: PropTypes.string,
      leftovers: PropTypes.string,
      ingredients: PropTypes.string,
      directions: PropTypes.string,
    }),
    userDinnerObj: PropTypes.shape({
      dayId: PropTypes.string,
      firebaseKey: PropTypes.string,
      recipeId: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
};

DinnerCards.defaultProps = {
  dayCardInfo: {},
};

export default DinnerCards;
