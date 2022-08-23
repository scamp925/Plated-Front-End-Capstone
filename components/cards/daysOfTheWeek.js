/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './recipeCards';
import { getRecipes } from '../../api/recipesData';
// import { getRecipes, getSingleRecipe } from '../../api/recipesData';
import { useAuth } from '../../utils/context/authContext';
// import { getDinnerCards, getSingleDinnerCard } from '../../api/dinnersData';
// import DinnerCards from './dinnerCards';
// // import getRecipeOnDinnerCard from '../../api/mergedData';
// import { getSingleDinnerCard } from '../../api/dinnersData';

function DaysOfTheWeek({ dayObj, dinnerObj }) {
  // const [dinnerCard, setDinnerCard] = useState({});
  const [recipes, setRecipes] = useState([]);
  // const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const findRecipe = recipes?.find((recipe) => dinnerObj.recipeId === recipe.firebaseKey);

  useEffect(() => {
    // getSingleDinnerCard(dayObj.firebaseKey).then(setDinnerCard);
    // getRecipeOnDinnerCard (dinnerObj.dayId, dinnerObj.recipeId).then(setDinnerCard);
    // getSingleDinnerCard(dayObj.firebaseKey).then(setDinnerCard).then(() => {
    //   getSingleRecipe(dinnerCard.recipeId).then((response) => {
    //     console.warn(response);
    //   });
    // });
    getRecipes(user.uid).then(setRecipes);
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.day}</Card.Title>
          {/* {dayObj.firebaseKey === dinnerObj.dayId && ()} */}
          <RecipeCards key={dinnerObj.recipeId} recipeObj={findRecipe} />
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

DaysOfTheWeek.propTypes = {
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

DaysOfTheWeek.defaultProps = {
  dayObj: {},
  dinnerObj: {},
};

export default DaysOfTheWeek;
