import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Card = ({ item }) => (
  <div id={`card-${item.id}`} className="card">
    <img src={item.avatar_url} alt={item.login} />
    <div className="details">
      <h1 className="view">
        {item.login}
      </h1>
      <Button variant='primary' href={item.html_url}>View Profile</Button>
    </div>
  </div>
);

Card.propTypes = {
  item: PropTypes.object.isRequired
};

export default Card;
