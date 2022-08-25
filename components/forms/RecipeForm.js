import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../api/recipesData';

const initialState = {
  firebaseKey: '',
  name: '',
  totalTime: '',
  preheat: '',
  ingredients: '',
  directions: '',
  leftovers: false,
};

function RecipeForm({ recipeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (recipeObj?.firebaseKey) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj?.firebaseKey) {
      updateRecipe(formInput)
        .then(() => router.push(`/recipes/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRecipe(payload).then(() => {
        router.push('/recipes/recipes');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="title mt-5">{recipeObj?.firebaseKey ? 'Update' : 'Add'} a Recipe</h1>
      <div className="margin-top" />
      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Name of Recipe</Form.Label>
        <Form.Control type="text" placeholder="e.g. Cacio e Pepe" name="name" value={formInput.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Total Time</Form.Label>
        <Form.Control type="text" placeholder="e.g. 30 minutes" name="totalTime" value={formInput.totalTime} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInput">
        <Form.Label>Preheat Oven To</Form.Label>
        <Form.Text className="text-muted">Leave blank if a preheat is not needed</Form.Text>
        <Form.Control type="text" placeholder="e.g. 350 degrees" name="preheat" value={formInput.preheat} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control as="textarea" rows={3} type="text" placeholder="List recipe's ingredients here" name="ingredients" value={formInput.ingredients} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Directions</Form.Label>
        <Form.Control as="textarea" rows={3} type="text" placeholder="List recipe's directions here" name="directions" value={formInput.directions} onChange={handleChange} />
      </Form.Group>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Label className="leftovers">Leftovers?</Form.Label>
          <Form.Check
            inline
            label="Yes"
            name="leftovers"
            type={type}
            id={`inline-${type}-1`}
            checked={formInput.leftovers}
            onChange={(e) => setFormInput((prevState) => ({
              ...prevState,
              leftovers: e.target.checked,
            }))}
          />
          <Form.Check
            inline
            label="No"
            name="leftovers"
            type={type}
            id={`inline-${type}-2`}
          />
        </div>
      ))}
      <Button type="submit" variant="success" className="form-btn">{recipeObj?.firebaseKey ? 'Update' : 'Add'} Recipe</Button>
    </Form>
  );
}

RecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    totalTime: PropTypes.string,
    preheat: PropTypes.string,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
    leftovers: PropTypes.bool,
  }),
};

RecipeForm.defaultProps = {
  recipeObj: initialState,
};

export default RecipeForm;
