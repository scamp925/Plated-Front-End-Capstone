import React from 'react';
import Head from 'next/head';
import RecipeForm from '../../components/forms/RecipeForm';

export default function addRecipeForm() {
  return (
    <div>
      <Head>
        <title>Plated | Add a Recipe</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RecipeForm />
    </div>
  );
}
