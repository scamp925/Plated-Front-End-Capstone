import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe } from '../../api/recipesData';

const initialState = {
  firebaseKey: '',
  name: '',
  totalTime: '',
  preheat: '',
  ingredients: '',
  directions: '',
  leftovers: '',
};

function RecipeForm({ recipeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createRecipe(payload).then(() => {
      router.push('/recipes/recipes');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="title mt-5">{recipeObj?.firebaseKey ? 'Update' : 'Add'} a Recipe</h1>
      <div className="margin-top" />
      <FloatingLabel controlId="floatingInput1" label="Recipe's Name" className="mb-3">
        <Form.Control type="text" placeholder="Ex: Cacio e Pepe" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Total Time" className="mb-3">
        <Form.Control type="text" placeholder="Ex: 30 minutes" name="totalTime" value={formInput.totalTime} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Preheat Oven To" className="mb-3">
        <Form.Control type="text" placeholder="Ex: 350 degrees" name="preheat" value={formInput.preheat} onChange={handleChange} />
      </FloatingLabel>
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
      <Button type="submit" variant="dark" className="form-btn">{recipeObj?.firebaseKey ? 'Update' : 'Add'} Recipe</Button>
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
