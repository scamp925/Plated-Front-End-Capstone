import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search({ recipes, setFilteredRecipes }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = recipes.filter((recipe) => recipe.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredRecipes(results);
  };

  const resetInput = () => {
    setSearchInput('');
    setFilteredRecipes(recipes);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for Meal by Name"
          aria-label="Search for Meal by Name"
          value={searchInput}
          onChange={handleChange}
          aria-describedby="basic-addon2"
        />
        <Button variant="secondary" onClick={resetInput}>
          Reset Search
        </Button>
      </InputGroup>
    </div>
  );
}

Search.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default Search;
