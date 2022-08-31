/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getRecipes } from '../../api/recipesData';
import RecipeCards from '../../components/cards/recipeCards';
import Search from '../../components/features/Search';
import { useAuth } from '../../utils/context/authContext';

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { user } = useAuth();

  const getUserRecipes = () => {
    getRecipes(user.uid).then((recipeArray) => {
      setRecipes(recipeArray);
      setFilteredRecipes(recipeArray);
    });
  };

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <div>
      <header>
        <h2>Your Recipes</h2>
      </header>
      <Search recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
      <section className="cards-container">
        {filteredRecipes?.map((recipe) => (
          <RecipeCards key={recipe.firebaseKey} recipeObj={recipe} />
        ))}
      </section>
    </div>
  );
}
