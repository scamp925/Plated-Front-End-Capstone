import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DinnerForm from '../../../components/forms/DinnerForm';

export default function AddRecipeForm() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <div>
      <Head>
        <title>Plated | Add a Meal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DinnerForm dayId={firebaseKey} />
    </div>
  );
}
