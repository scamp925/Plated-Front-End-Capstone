/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import RecipeCards from './recipeCards';
// import { getRecipes } from '../../api/recipesData';
// import { useAuth } from '../../utils/context/authContext';

function DinnerCards({ dayObj, dinnerObj }) {
  // const [recipes, setRecipes] = useState([]);
  // const { user } = useAuth();

  // // const findRecipe = recipes?.find((recipe) => dinnerObj.recipeId === recipe.firebaseKey);

  // useEffect(() => {
  //   getRecipes(user.uid).then(setRecipes);
  // }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          {/* <RecipeCards key={dinnerObj.recipeId} recipeObj={findRecipe} /> */}
        </Card.Body>
        <footer>
          {dinnerObj.recipeId ? (
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
