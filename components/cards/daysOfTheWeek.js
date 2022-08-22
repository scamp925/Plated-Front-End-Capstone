import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function DaysOfTheWeek({ dayObj, dinnerObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dayObj.day}</Card.Title>
          {/* {dinnerObj.firebaseKey && } */}
        </Card.Body>
        <footer>
          <Card.Link href="/dinners/new" passHref>
            <Button variant="success" className="add-btn">Add</Button>
          </Card.Link>
          {dinnerObj.firebaseKey && (
            <div className="edit-delete-footer">
              <Card.Link href={`/dinners/edit/${dinnerObj.firebaseKey}`} passHref>
                <Button variant="warning" className="edit-btn">Edit</Button>
              </Card.Link>
              <Button variant="danger" className="delete-btn">Delete</Button>
            </div>
          )}
        </footer>
      </Card>
    </div>
  );
}

DaysOfTheWeek.propTypes = {
  dayObj: PropTypes.shape({
    day: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  dinnerObj: PropTypes.shape({
    recipeId: PropTypes.string,
    dayId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

DaysOfTheWeek.defaultProps = {
  dayObj: {},
  dinnerObj: {},
};

export default DaysOfTheWeek;
