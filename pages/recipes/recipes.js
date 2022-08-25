/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getRecipes } from '../../api/recipesData';
import RecipeCards from '../../components/cards/RecipeCards';
import { useAuth } from '../../utils/context/authContext';

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getUserRecipes = () => {
    getRecipes(user.uid).then((recipeArray) => {
      setRecipes(recipeArray);
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
      <section className="cards-container">
        {recipes?.map((recipe) => (
          <RecipeCards key={recipe.firebaseKey} recipeObj={recipe} />
        ))}
      </section>
    </div>
  );
}
