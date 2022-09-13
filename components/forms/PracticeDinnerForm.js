/* eslint-disable react-hooks/exhaustive-deps */
import AsyncSelect from 'react-select/async';
// import Creatable from 'react-select/creatable';
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
  // const [selectedValue, setSelectedValue] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (selectedOptions) => selectedOptions.recipeId;

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
      console.warn('loadOptions', searchValue, filteredOptions);
      callback(filteredOptions);
    }, 500);
  };

  useEffect(() => {
    recipeOptions();
    if (dinnerObj?.firebaseKey) setFormInput(dinnerObj);
  }, [dinnerObj, user]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

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
        // cacheOptions
        defaultOptions={recipeForDinner}
        loadOptions={loadOptions}
        onChange={handleChange}
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
  dayId: PropTypes.string.isRequired,
};

PracticeDinnerForm.defaultProps = {
  dinnerObj: {
    firebaseKey: '',
    recipeId: '',
  },
};

export default PracticeDinnerForm;
