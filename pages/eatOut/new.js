import React from 'react';
import Head from 'next/head';
import EatOutForm from '../../components/forms/EatOutForm';

export default function addEatOutCardForm() {
  return (
    <div>
      <Head>
        <title>Plated | Add Eat Out Option</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <EatOutForm />
    </div>
  );
}
