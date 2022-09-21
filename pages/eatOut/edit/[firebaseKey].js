import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import EatOutForm from '../../../components/forms/EatOutForm';
import { getSingleEatOutCard } from '../../../api/eatOutData';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEatOutCard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <Head>
        <title>Plated | Update the Meal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <EatOutForm eatOutObj={editItem} />
    </div>
  );
}
