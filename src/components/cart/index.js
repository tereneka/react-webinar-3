import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({ total, children }) {
  return (
    <div className='Cart'>
      <div className='Cart-list'>{children}</div>
      <div className='Cart-total'>
        <span>Итого</span>
        <span>{total} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  total: PropTypes.string,
  children: PropTypes.node,
};

Cart.defaultProps = {
  total: '0',
};

export default React.memo(Cart);
