import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
          <header>
            <Card.Title className="single-recipe-title">{recipeObj.name}</Card.Title>
          </header>
          <section className="recipe-details">
            <Card.Text>Total Time: {recipeObj.totalTime}</Card.Text>
            <Card.Text>{recipeObj.leftovers === 'Yes' ? 'Leftovers: Yes' : 'Leftovers: No'}</Card.Text>
            <Card.Text>{recipeObj.preheat && 'Preheat Oven To:'} {recipeObj.preheat}</Card.Text>
            <Card.Text>{recipeObj.ingredients && 'Ingredients:'}</Card.Text>
            <Card.Text className="box-around-input ingredients">{recipeObj.ingredients}</Card.Text>
            <Card.Text>{recipeObj.directions && 'Directions:'}</Card.Text>
            <Card.Text className="box-around-input">{recipeObj.directions}</Card.Text>
          </section>
          <footer className="single-view-edit-and-delete-buttons">
            <Link href={`/recipes/edit/${recipeObj.firebaseKey}`} passHref>
              <Button variant="info" className="edit-btn">Edit</Button>
            </Link>
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
    leftovers: PropTypes.string,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SingleViewRecipeCard.defaultProps = {
  recipeObj: {},
};

export default SingleViewRecipeCard;
