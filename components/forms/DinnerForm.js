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
import { getEatOutCards } from '../../api/eatOutData';

const initialState = {
  recipeId: '',
  dayId: '',
};

function PracticeDinnerForm({ dinnerObj, dayId }) {
  const [recipeForDinner, setRecipeForDinner] = useState([]);
  const [eatOutForDinner, setEatOutForDinner] = useState([]);
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

  const eatOutOptions = () => {
    getEatOutCards(user.uid).then((eatOutArray) => {
      const nameOfPlace = eatOutArray.map((eatOutPlace) => ({
        name: eatOutPlace.placeName,
        label: eatOutPlace.placeName,
        eatOutId: eatOutPlace.firebaseKey,
      }));
      setEatOutForDinner(nameOfPlace);
    });
  };

  const loadRecipeOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = recipeForDinner.filter((recipeOption) => recipeOption.label.toLowerCase().includes(searchValue.toLowerCase()));
      callback(filteredOptions);
    }, 500);
  };

  const loadEatOutOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = eatOutForDinner.filter((eatOutOption) => eatOutOption.label.toLowerCase().includes(searchValue.toLowerCase()));
      callback(filteredOptions);
    }, 500);
  };

  useEffect(() => {
    recipeOptions();
    eatOutOptions();
    if (dinnerObj?.firebaseKey) setFormInput(dinnerObj);
  }, [dinnerObj, user]);

  const handleChangeForRecipe = (selectedOption) => {
    const { name, value } = selectedOption;
    const recipeId = `${selectedOption.recipeId}`;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      recipeId,
      eatOutId: '',
    }));
  };

  const handleChangeForEatOut = (selectedOption) => {
    const { name, value } = selectedOption;
    const eatOutId = `${selectedOption.eatOutId}`;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      eatOutId,
      recipeId: '',
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
      <h2 className="title mt-5">{dinnerObj?.firebaseKey ? 'Update the' : 'What Are You Doing'} for Dinner</h2>
      <div className="margin-top" />
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Label className="locationStatusForDinner">Will you be staying home or going out to eat for dinner?</Form.Label>
          <Form.Check
            className="yes-option"
            inline
            label="Staying Home"
            name="locationStatusForDinner"
            type={type}
            id={`inline-${type}-1`}
            value="Staying Home"
            checked={formInput.locationStatusForDinner === 'Staying Home'}
            onChange={(e) => setFormInput((prevState) => ({
              ...prevState,
              locationStatusForDinner: e.target.value,
            }))}
          />
          <Form.Check
            inline
            label="Going Out"
            name="locationStatusForDinner"
            type={type}
            id={`inline-${type}-2`}
            value="Going Out"
            checked={formInput.locationStatusForDinner === 'Going Out'}
            onChange={(e) => setFormInput((prevState) => ({
              ...prevState,
              locationStatusForDinner: e.target.value,
            }))}
          />
          <section hidden={!formInput.locationStatusForDinner}>
            <AsyncSelect
              defaultOptions={formInput.locationStatusForDinner === 'Staying Home' ? recipeForDinner : eatOutForDinner}
              loadOptions={formInput.locationStatusForDinner === 'Staying Home' ? loadRecipeOptions : loadEatOutOptions}
              onChange={formInput.locationStatusForDinner === 'Staying Home' ? handleChangeForRecipe : handleChangeForEatOut}
              value={formInput.locationStatusForDinner === 'Staying Home' ? recipeForDinner.find((item) => item.recipeId === formInput.recipeId || '') : eatOutForDinner.find((item) => item.eatOutId === formInput.eatOutId || '')}
              getOptionValue={(option) => option.name}
              placeholder={formInput.locationStatusForDinner === 'Staying Home' ? 'Select or Search For a Recipe' : 'Select or Search Where You Are Going To'}
            />
          </section>
        </div>
      ))}
      <div className="form-btn">
        <Button type="submit" variant="success">{dinnerObj?.firebaseKey ? 'Update' : 'Add'} Dinner Card</Button>
      </div>
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
