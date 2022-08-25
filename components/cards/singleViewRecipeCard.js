import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

function SingleViewRecipeCards({ recipeObj }) {
  return (
  //     <Card>
  //   <Card.Header as="h5">Featured</Card.Header>
  //   <Card.Body>
  //     <Card.Title>Special title treatment</Card.Title>
  //     <Card.Text>
  //       With supporting text below as a natural lead-in to additional content.
  //     </Card.Text>
  //     <Button variant="primary">Go somewhere</Button>
  //   </Card.Body>
  // </Card>

    <div>
      <Card>
        <Card.Body>
          <Card.Title>{recipeObj.name}</Card.Title>
          <Card.Text>Total Time: {recipeObj.totalTime}</Card.Text>
          <Card.Text>{recipeObj.leftovers === true ? 'Leftovers: Yes' : 'Leftovers: No'}</Card.Text>
          <Card.Text>{recipeObj.preheat && 'Preheat Oven To:'} {recipeObj.preheat}</Card.Text>
          <Card.Text>{recipeObj.ingredients && 'Ingredients'}</Card.Text>
          <Card.Text className="box-around-input">{recipeObj.ingredients}</Card.Text>
          <Card.Text>{recipeObj.directions && 'Directions'}</Card.Text>
          <Card.Text className="box-around-input">{recipeObj.directions}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

SingleViewRecipeCards.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    leftovers: PropTypes.bool,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }),
};

SingleViewRecipeCards.defaultProps = {
  recipeObj: {},
};

export default SingleViewRecipeCards;
