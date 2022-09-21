import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';

function RecipeCards({ recipeObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title className="recipe-title">{recipeObj?.name}</Card.Title>
          <Card.Text><b>Total Time:</b> {recipeObj?.totalTime}</Card.Text>
          <Card.Text><b>Leftovers:</b> {recipeObj?.leftovers === 'Yes' ? 'Yes' : 'No'}</Card.Text>
          <Card.Text>{recipeObj?.preheat && <b>Preheat Oven To:</b>} {recipeObj?.preheat}</Card.Text>
          <div className="underline-link">
            <Link href={`/recipes/${recipeObj?.firebaseKey}`} passHref><b>View Details</b></Link>
          </div>
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
