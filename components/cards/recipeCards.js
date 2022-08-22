import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function recipeCards({ recipeObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{recipeObj.name}</Card.Title>
          <Card.Text>{recipeObj.totalTime}</Card.Text>
          <Card.Text>{recipeObj.leftovers}</Card.Text>
          <Card.Text>{recipeObj.preheat}</Card.Text>
          <Card.Link href={`/recipes/${recipeObj.firebaseKey}`} passHref>View Details</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

recipeCards.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    leftovers: PropTypes.bool,
  }),
};

export default recipeCards;
