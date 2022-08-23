import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createDinnerCard } from '../../api/dinnersData';
import { getRecipes } from '../../api/recipesData';

const initialState = {
  recipeId: '',
  dayId: '',
};

function DinnerForm({ dinnerObj, dayId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [recipeForDinner, setRecipeForDinner] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRecipes(user.uid).then(setRecipeForDinner);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid, dayId };
    createDinnerCard(payload).then(() => {
      router.push('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="title mt-5">{dinnerObj?.firebaseKey ? 'Update' : 'Select'} a Meal for Dinner</h2>
      <Form.Select
        name="recipeId"
        onChange={handleChange}
        className="mb-3"
        required
      >
        <option value="">Select a Recipe</option>
        {
            recipeForDinner.map((recipe) => (
              <option
                key={recipe.firebaseKey}
                value={recipe.firebaseKey}
                selected={dinnerObj?.recipeId === recipe.firebaseKey}
              >
                {recipe.name}
              </option>
            ))
          }
      </Form.Select>
      <Button type="submit" variant="dark" className="form-btn">{dinnerObj?.firebaseKey ? 'Update' : 'Add'} Dinner Card</Button>
    </Form>
  );
}

DinnerForm.propTypes = {
  dinnerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
  }).isRequired,
  dayId: PropTypes.string.isRequired,
};

export default DinnerForm;
