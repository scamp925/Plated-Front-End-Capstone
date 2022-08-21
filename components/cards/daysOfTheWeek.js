import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function daysOfTheWeek({ dayObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.name}</Card.Title>
        </Card.Body>
        <footer>
          <Card.Link href="/dinners/new">
            <Button variant="success" className="add-btn">Add</Button>
          </Card.Link>
        </footer>
      </Card>
    </div>
  );
}

daysOfTheWeek.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

daysOfTheWeek.defaultProps = {
  dayObj: {},
};

export default daysOfTheWeek;
