import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function EatOutCards({ dayObj, eatOutObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title className="recipe-title">Eating Out for Dinner</Card.Title>
          <Card.Text><b>Where to:</b> {eatOutObj?.placeName}</Card.Text>
        </Card.Body>
        {!dayObj.day && (
        <footer className="eat-out-cards-footer">
          <Link href={`/eatOut/edit/${eatOutObj.firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">Edit</Button>
          </Link>
          <Button variant="danger">Delete</Button>
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
};

EatOutCards.defaultProps = {
  dayObj: {},
  eatOutObj: {},
};

export default EatOutCards;
