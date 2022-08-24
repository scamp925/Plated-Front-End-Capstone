/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import getRecipeOnDinnerCard from '../../api/mergedData';
import { getDinnersByDay } from '../../api/dinnersData';

function DinnerCards({ dayObj }) {
  const [recipe, setRecipe] = useState({});
  const [dinnerObj, setDinnerObj] = useState({});

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
              <Card.Link href={`/dinners/edit/${dinnerObj.firebaseKey}`}>
                <Button variant="warning" className="edit-btn">Edit</Button>
              </Card.Link>
              <Button variant="danger" className="delete-btn">Delete</Button>
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
};

DinnerCards.defaultProps = {
  dayObj: {},
};

export default DinnerCards;
