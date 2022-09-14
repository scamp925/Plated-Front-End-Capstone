import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleDinnerCard } from '../../../api/dinnersData';
import DinnerForm from '../../../components/forms/DinnerForm';
import PracticeDinnerForm from '../../../components/forms/PracticeDinnerForm';

export default function EditDinnerCard() {
  const [editItem, setEditItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDinnerCard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <DinnerForm dinnerObj={editItem} />
      <PracticeDinnerForm dinnerObj={editItem} />
    </div>
  );
}
