/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import { deleteDinnerCard } from '../../api/dinnersData';
import EatOutCards from './EatOutCards';

function DinnerCards({ dayCardInfo, onUpdate }) {
  const deleteThisDinnerCard = () => {
    if (window.confirm(`Are you sure you want to clear ${dayCardInfo.dayObj.day}'s current meal? Click "OK" if you wish to continue.`)) {
      deleteDinnerCard(dayCardInfo.userDinnerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards dinner">
        <Card.Body>
          <Card.Title className="name-of-day">{dayCardInfo.dayObj?.day}</Card.Title>
          {dayCardInfo.userDinnerObj?.locationStatusForDinner === 'Staying Home' && (
          <RecipeCards recipeObj={dayCardInfo.recipeObj} />
          )}
          {dayCardInfo.userDinnerObj?.locationStatusForDinner === 'Going Out' && (
          <EatOutCards dayObj={dayCardInfo.dayObj} eatOutObj={dayCardInfo.eatOutObj} />
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
            <div className="add-btn">
              <Link href={`/dinners/new/${dayCardInfo.dayObj?.firebaseKey}`} passHref>
                <Button variant="success">Add</Button>
              </Link>
            </div>
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
    eatOutObj: PropTypes.shape({
      firebaseKey: PropTypes.string,
      placeName: PropTypes.string,
      whereTo: PropTypes.string,
    }),
    userDinnerObj: PropTypes.shape({
      dayId: PropTypes.string,
      firebaseKey: PropTypes.string,
      eatOutId: PropTypes.string,
      locationStatusForDinner: PropTypes.string,
      recipeId: PropTypes.string,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
};

DinnerCards.defaultProps = {
  dayCardInfo: {},
};

export default DinnerCards;
