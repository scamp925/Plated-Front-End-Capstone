/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import getRecipeOnDinnerCard from '../../api/mergedData';
import { deleteDinnerCard, getDinnersByDay } from '../../api/dinnersData';

function DinnerCards({ dayObj, onUpdate }) {
  const [recipe, setRecipe] = useState({});
  const [dinnerObj, setDinnerObj] = useState({});

  const deleteThisDinnerCard = () => {
    if (window.confirm(`Are you sure you want to clear ${dayObj.day}'s current meal? Click "OK" if you wish to continue.`)) {
      deleteDinnerCard(dinnerObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getRecipeOnDinnerCard(dayObj.firebaseKey).then(setRecipe);
    getDinnersByDay(dayObj.firebaseKey).then(setDinnerObj);
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.day}</Card.Title>
          {dayObj.firebaseKey === dinnerObj[0]?.dayId && (
            <RecipeCards key={dinnerObj.recipeId} recipeObj={recipe} />
          )}
        </Card.Body>
        <footer>
          {dayObj.firebaseKey === dinnerObj[0]?.dayId ? (
            <div className="edit-delete-footer">
              <Card.Link href={`/dinners/edit/${dinnerObj[0]?.firebaseKey}`}>
                <Button variant="warning" className="edit-btn">Change Meal</Button>
              </Card.Link>
              <Button variant="danger" className="delete-btn" onClick={deleteThisDinnerCard}>Clear Meal</Button>
            </div>
          ) : (
            <Link href={`/dinners/new/${dayObj.firebaseKey}`} passHref>
              <Button variant="success" className="add-btn">Add</Button>
            </Link>
          )}
        </footer>
      </Card>
    </div>
  );
}

DinnerCards.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

DinnerCards.defaultProps = {
  dayObj: {},
};

export default DinnerCards;
