/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeCards from './RecipeCards';
import { deleteDinnerCard, getDinnersByDay } from '../../api/dinnersData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleRecipe } from '../../api/recipesData';

function DinnerCards({ dayObj }) {
  const [recipe, setRecipe] = useState({});
  const [dinnerObj, setDinnerObj] = useState({});
  const [dinnerObjArray, setDinnerObjArray] = useState([]);
  const [deletedDinnerObj, setDeletedDinnerObj] = useState(false);
  const { user } = useAuth();

  const deleteThisDinnerCard = () => {
    if (window.confirm(`Are you sure you want to clear ${dayObj.day}'s current meal? Click "OK" if you wish to continue.`)) {
      deleteDinnerCard(dinnerObj?.firebaseKey).then(() => setDeletedDinnerObj(!deletedDinnerObj));
    }
  };

  useEffect(() => {
    getDinnersByDay(dayObj.firebaseKey).then(setDinnerObjArray);
  }, [deletedDinnerObj]);

  useEffect(() => {
    const currentUserDinnerObj = dinnerObjArray.find((dinnerCard) => dinnerCard.uid === user.uid);
    setDinnerObj(currentUserDinnerObj);
  }, [dinnerObjArray]);

  useEffect(() => {
    getSingleRecipe(dinnerObj?.recipeId).then(setRecipe);
  }, [dinnerObj]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.day}</Card.Title>
          {dayObj.firebaseKey === dinnerObj?.dayId && (
            <RecipeCards key={dinnerObj.recipeId} recipeObj={recipe} />
          )}
        </Card.Body>
        <footer>
          {dayObj.firebaseKey === dinnerObj?.dayId ? (
            <div className="edit-delete-footer">
              <Card.Link href={`/dinners/edit/${dinnerObj?.firebaseKey}`}>
                <Button variant="info" className="edit-btn">Change Dinner</Button>
              </Card.Link>
              <Button variant="danger" className="delete-btn" onClick={deleteThisDinnerCard}>Clear Dinner</Button>
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
