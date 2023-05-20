import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onDelete }) {
  return (
    <div className='CartItem'>
      <div className='CartItem-code'>
        {item.code}
      </div>
      <div className='CartItem-title'>
        {item.title}
      </div>
      <div className='CartItem-content'>
        <span>{`${item.price.toLocaleString(
          'ru-RU'
        )} ₽`}</span>
        <span>{`${item.count} шт`}</span>
      </div>
      <div className='CartItem-actions'>
        <button
          className='CartItem-btn'
          onClick={() => {
            onDelete(item.code);
          }}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
