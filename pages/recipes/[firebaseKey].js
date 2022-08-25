/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../api/recipesData';
import SingleViewRecipeCard from '../../components/cards/singleViewRecipeCard';

export default function ViewSingleRecipe() {
  const [singleRecipe, setSingleRecipe] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const theRecipe = () => {
    getSingleRecipe(firebaseKey).then(setSingleRecipe);
  };

  useEffect(() => {
    theRecipe();
  }, []);

  return (
    <div>
      <SingleViewRecipeCard recipeObj={singleRecipe} />
    </div>
  );
}
