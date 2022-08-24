/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import getRecipeOnDinnerCard from '../../api/mergedData';

function DinnerCards({ dayObj, dinnerObj }) {
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    getRecipeOnDinnerCard(dayObj.firebaseKey).then(setRecipes);
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.day}</Card.Title>
          {/* {dayObj.firebaseKey === dinnerObj.dayId && ()} */}
          <RecipeCards key={dinnerObj.recipeId} recipeObj={recipes} />
        </Card.Body>
        <footer>
          {dayObj.firebaseKey === dinnerObj.dayId ? (
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
  dinnerObj: PropTypes.shape({
    recipeId: PropTypes.string,
    dayId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

DinnerCards.defaultProps = {
  dayObj: {},
  dinnerObj: {},
};

export default DinnerCards;
