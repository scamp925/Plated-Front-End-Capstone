/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Head from 'next/head';
import Link from 'next/link';
import { getRecipes } from '../../api/recipesData';
import RecipeCards from '../../components/cards/recipeCards';
import Search from '../../components/features/Search';
import { useAuth } from '../../utils/context/authContext';
import { getEatOutCards } from '../../api/eatOutData';
import EatOutCards from '../../components/cards/EatOutCards';

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [eatOut, setEatOut] = useState([]);
  const { user } = useAuth();

  const getUserRecipes = () => {
    getRecipes(user.uid).then((recipeArray) => {
      setRecipes(recipeArray);
      setFilteredRecipes(recipeArray);
    });
  };

  const getUserEatOutCards = () => {
    getEatOutCards(user.uid).then((eatOutArray) => {
      setEatOut(eatOutArray);
    });
  };

  useEffect(() => {
    getUserRecipes();
    getUserEatOutCards();
  }, []);

  return (
    <div>
      <Head>
        <title>Plated | Meal Options</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h2 className="title mt-3">Your Meal Options</h2>
        <div className="text-center my-4">
          <Link href="/recipes/new" passHref>
            <Button variant="outline-light" className="add-recipe-btn">Add a Recipe</Button>
          </Link>
          <Link href="/eatOut/new" passHref>
            <Button variant="outline-light" className="add-recipe-btn">Add an Eat Out Option</Button>
          </Link>
        </div>
      </header>
      <Search recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
      <section className="cards-container">
        {filteredRecipes?.map((recipe) => (
          <RecipeCards key={recipe.firebaseKey} recipeObj={recipe} />
        ))}
        {eatOut?.map((eatOutCard) => (
          <EatOutCards key={eatOutCard.firebaseKey} eatOutObj={eatOutCard} onUpdate={getUserEatOutCards} />
        ))}
      </section>
    </div>
  );
}
