import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteRecipeCompletely } from '../../api/mergedData';

function SingleViewRecipeCard({ recipeObj, onUpdate }) {
  const router = useRouter();

  const deleteThisRecipe = () => {
    if (window.confirm(`Warning! You are about to permanently delete ${recipeObj.name}. Click "OK" if you wish to continue.`)) {
      deleteRecipeCompletely(recipeObj.firebaseKey).then(() => onUpdate()).then(() => {
        router.push('/recipes/recipes');
      });
    }
  };

  return (
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
          <footer className="edit-delete-footer">
            <Card.Link href={`/recipes/edit/${recipeObj.firebaseKey}`}>
              <Button variant="info" className="edit-btn">Edit</Button>
            </Card.Link>
            <Button variant="danger" className="delete-btn" onClick={deleteThisRecipe}>Delete</Button>
          </footer>
        </Card.Body>
      </Card>
    </div>
  );
}

SingleViewRecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    leftovers: PropTypes.bool,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SingleViewRecipeCard.defaultProps = {
  recipeObj: {},
};

export default SingleViewRecipeCard;
