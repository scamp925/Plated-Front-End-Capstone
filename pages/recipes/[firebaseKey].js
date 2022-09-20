/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getRecipes, getSingleRecipe } from '../../api/recipesData';
import SingleViewRecipeCard from '../../components/cards/SingleViewRecipeCard';
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
    <div className="single-recipe-view">
      <Head>
        <title>Plated | {singleRecipe.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SingleViewRecipeCard recipeObj={singleRecipe} onUpdate={getAllTheRecipes} />
    </div>
  );
}
