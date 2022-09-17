import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleRecipe } from '../../../api/recipesData';
import RecipeForm from '../../../components/forms/RecipeForm';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <Head>
        <title>Plated | Update the Recipe</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RecipeForm recipeObj={editItem} />
    </div>
  );
}
