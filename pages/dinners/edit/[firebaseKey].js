import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleDinnerCard } from '../../../api/dinnersData';
import DinnerForm from '../../../components/forms/DinnerForm';

export default function EditDinnerCard() {
  const [editItem, setEditItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDinnerCard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <Head>
        <title>Plated | Update the Meal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DinnerForm dinnerObj={editItem} />
    </div>
  );
}
