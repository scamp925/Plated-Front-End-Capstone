import React from 'react';
import { useRouter } from 'next/router';
import DinnerForm from '../../../components/forms/DinnerForm';
import PracticeDinnerForm from '../../../components/forms/PracticeDinnerForm';

export default function AddRecipeForm() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <div>
      <DinnerForm dayId={firebaseKey} />
      <PracticeDinnerForm dayId={firebaseKey} />
    </div>
  );
}
