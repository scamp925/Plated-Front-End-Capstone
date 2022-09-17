/* eslint-disable semi */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function MealCards({ recipeObj, eatOutObj }) {
  if (recipeObj) {
    return (
      <div>
        <Card style={{ width: '18rem' }} className="individual-cards">
          <Card.Body>
            <Card.Title className="recipe-title">{recipeObj?.name}</Card.Title>
            <Card.Text>Total Time: {recipeObj?.totalTime}</Card.Text>
            <Card.Text>{recipeObj?.leftovers === 'Yes' ? 'Leftovers: Yes' : 'Leftovers: No'}</Card.Text>
            <Card.Text>{recipeObj?.preheat && 'Preheat Oven To:'} {recipeObj?.preheat}</Card.Text>
            <div className="underline-link">
              <Link href={`/recipes/${recipeObj?.firebaseKey}`} passHref>View Details</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title className="recipe-title">Eating Out for Dinner</Card.Title>
          <Card.Text>Where to: {eatOutObj?.placeName}</Card.Text>
        </Card.Body>
        <footer className="player-cards-footer">
          <Link href={`/players/edit/${eatOutObj.firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">Edit</Button>
          </Link>
          <Button variant="danger">Delete</Button>
        </footer>
      </Card>
    </div>
  );
}

MealCards.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    leftovers: PropTypes.string,
  }),
  eatOutObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    placeName: PropTypes.string,
  }),
}

MealCards.defaultProps = {
  recipeObj: {},
  eatOutObj: {},
};

export default MealCards
