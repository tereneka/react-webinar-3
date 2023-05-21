import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartTotal({ sum }) {
  return (
    <div className='CartTotal'>
      <span>Итого</span>
      <span>{sum} ₽</span>
    </div>
  );
}

CartTotal.propTypes = {
  sum: PropTypes.string.isRequired,
};

export default React.memo(CartTotal);
