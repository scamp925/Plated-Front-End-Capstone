/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEatOutCard, updateEatOutCard } from '../../api/eatOutData';

function EatOutForm({ eatOutObj }) {
  const [formInput, setFormInput] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (eatOutObj?.firebaseKey) setFormInput(eatOutObj);
  }, [eatOutObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eatOutObj?.firebaseKey) {
      updateEatOutCard(formInput)
        .then(() => router.push('/mealOptions/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEatOutCard(payload).then(() => {
        router.push('/mealOptions/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="title mt-3">{eatOutObj?.firebaseKey ? 'Update the' : 'Add a New'} Going Out Meal</h2>
      <div className="margin-top" />
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Label className="whereTo">Will you be going to a restaurant or someone's home?</Form.Label>
          <Form.Check
            className="yes-option"
            inline
            label="Restaurant"
            name="whereTo"
            type={type}
            id={`inline-${type}-1`}
            value="Restaurant"
            checked={formInput.whereTo === 'Restaurant'}
            onChange={(e) => setFormInput((prevState) => ({
              ...prevState,
              whereTo: e.target.value,
            }))}
          />
          <Form.Check
            inline
            label="Someone's Home"
            name="whereTo"
            type={type}
            id={`inline-${type}-2`}
            value="Someone's Home"
            checked={formInput.whereTo === "Someone's Home"}
            onChange={(e) => setFormInput((prevState) => ({
              ...prevState,
              whereTo: e.target.value,
            }))}
          />
          <section hidden={!formInput.whereTo}>
            <Form.Group className="mb-3" controlId="formBasicInput">
              <Form.Label>Where are you going?</Form.Label>
              <Form.Control type="text" placeholder={formInput.whereTo === "Someone's Home" ? "e.g. Lucy's house" : 'e.g. Olive Garden'} name="placeName" value={formInput.placeName} onChange={handleChange} />
            </Form.Group>
          </section>
        </div>
      ))}
      <div className="form-btn">
        <Button type="submit" variant="success">{eatOutObj?.firebaseKey ? 'Update' : 'Add'} Going Out Meal</Button>
      </div>
    </Form>
  );
}

EatOutForm.propTypes = {
  eatOutObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    placeName: PropTypes.string,
    whereTo: PropTypes.string,
  }),
};

EatOutForm.defaultProps = {
  eatOutObj: {},
};

export default EatOutForm;
