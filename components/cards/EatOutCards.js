import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function EatOutCards({ eatOutObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="individual-cards">
        <Card.Body>
          <Card.Title className="recipe-title">Eating Out for Dinner</Card.Title>
          <Card.Text>Where to: {eatOutObj?.placeName}</Card.Text>
        </Card.Body>
        <footer className="player-cards-footer">
          <Link href={`/players/edit/${eatOutObj.firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">Edit</Button>
          </Link>
          <Button variant="danger">Delete</Button>
        </footer>
      </Card>
    </div>
  );
}

EatOutCards.propTypes = {
  eatOutObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    placeName: PropTypes.string,
  }),
};

EatOutCards.defaultProps = {
  eatOutObj: {},
};

export default EatOutCards;
