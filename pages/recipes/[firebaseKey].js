/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipes, getSingleRecipe } from '../../api/recipesData';
import SingleViewRecipeCard from '../../components/cards/singleViewRecipeCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewSingleRecipe() {
  const [singleRecipe, setSingleRecipe] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const theRecipe = () => {
    getSingleRecipe(firebaseKey).then(setSingleRecipe);
  };

  const getAllTheRecipes = () => {
    getRecipes(user.uid);
  };

  useEffect(() => {
    theRecipe();
  }, []);

  return (
    <div>
      <SingleViewRecipeCard recipeObj={singleRecipe} onUpdate={getAllTheRecipes} />
    </div>
  );
}
