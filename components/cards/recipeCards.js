import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';

function RecipeCards({ recipeObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title>{recipeObj?.name}</Card.Title>
          <Card.Text>Total Time: {recipeObj?.totalTime}</Card.Text>
          <Card.Text>{recipeObj?.leftovers === true ? 'Leftovers: Yes' : 'Leftovers: No'}</Card.Text>
          <Card.Text>{recipeObj?.preheat && 'Preheat Oven To:'} {recipeObj?.preheat}</Card.Text>
          <Link className="underline-link" href={`/recipes/${recipeObj?.firebaseKey}`} passHref>View Details</Link>
        </Card.Body>
      </Card>
    </div>
  );
}

RecipeCards.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    leftovers: PropTypes.string,
  }),
};

RecipeCards.defaultProps = {
  recipeObj: {},
};

export default RecipeCards;
