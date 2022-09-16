/* eslint-disable react-hooks/exhaustive-deps */
import AsyncSelect from 'react-select/async';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createDinnerCard, updateDinnerCard } from '../../api/dinnersData';
import { getRecipes } from '../../api/recipesData';

const initialState = {
  recipeId: '',
  dayId: '',
};

function PracticeDinnerForm({ dinnerObj, dayId }) {
  const [recipeForDinner, setRecipeForDinner] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const recipeOptions = () => {
    getRecipes(user.uid).then((recipeArray) => {
      const recipeName = recipeArray.map((recipe) => ({
        name: recipe.name,
        label: recipe.name,
        recipeId: recipe.firebaseKey,
      }));
      setRecipeForDinner(recipeName);
    });
  };

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = recipeForDinner.filter((recipeOption) => recipeOption.label.toLowerCase().includes(searchValue.toLowerCase()));
      callback(filteredOptions);
    }, 500);
  };

  useEffect(() => {
    recipeOptions();
    if (dinnerObj?.firebaseKey) setFormInput(dinnerObj);
  }, [dinnerObj, user]);

  const handleChange = (selectedOption) => {
    const { name, value } = selectedOption;
    const recipeId = `${selectedOption.recipeId}`;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      recipeId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dinnerObj?.firebaseKey) {
      updateDinnerCard(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid, dayId };
      createDinnerCard(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="title mt-5">{dinnerObj?.firebaseKey ? 'Update' : 'Select'} a Meal for Dinner</h2>
      <AsyncSelect
        defaultOptions={recipeForDinner}
        loadOptions={loadOptions}
        onChange={handleChange}
        value={recipeForDinner.find((item) => item.recipeId === formInput.recipeId || '')}
        getOptionValue={(option) => option.name}
      />
      <Button type="submit" variant="success" className="form-btn">{dinnerObj?.firebaseKey ? 'Update' : 'Add'} Dinner Card</Button>
    </Form>
  );
}

PracticeDinnerForm.propTypes = {
  dinnerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
  }),
  dayId: PropTypes.string,
};

PracticeDinnerForm.defaultProps = {
  dinnerObj: {
    firebaseKey: '',
    recipeId: '',
  },
  dayId: '',
};

export default PracticeDinnerForm;
