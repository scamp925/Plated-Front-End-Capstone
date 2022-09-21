import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteEatOutCardCompletely } from '../../api/mergedData';

function EatOutCards({ dayObj, eatOutObj, onUpdate }) {
  const router = useRouter();

  const deleteThisEatOutCard = () => {
    if (window.confirm(`Warning! You are about to permanently delete ${eatOutObj.placeName}. Click "OK" if you wish to continue.`)) {
      deleteEatOutCardCompletely(eatOutObj.firebaseKey).then(() => onUpdate()).then(() => {
        router.push('/mealOptions/');
      });
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title className="recipe-title">Eating Out for Dinner</Card.Title>
          <Card.Text><b>Where to:</b> {eatOutObj?.placeName}</Card.Text>
        </Card.Body>
        {!dayObj.day && (
        <footer className="edit-delete-footer eat-out-card">
          <Link href={`/eatOut/edit/${eatOutObj.firebaseKey}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisEatOutCard}>Delete</Button>
        </footer>
        )}
      </Card>
    </div>
  );
}

EatOutCards.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  eatOutObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    placeName: PropTypes.string,
    whereTo: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

EatOutCards.defaultProps = {
  dayObj: {},
  eatOutObj: {},
};

export default EatOutCards;
