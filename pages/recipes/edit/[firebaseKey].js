import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
    <RecipeForm obj={editItem} />
  );
}
