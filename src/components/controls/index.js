import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({
  cart,
  cartSum,
  openCartPopup,
}) {
  return (
    <div className='Controls'>
      <div className='Controls-cart'>
        В корзине:
        <span className='Controls-cart_selected'>
          {cart.length > 0
            ? `${cart.length} ${plural(
                cart.length,
                {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                }
              )} / ${cartSum} ₽`
            : 'пусто'}
        </span>
      </div>
      <button
        className='Controls-btn'
        onClick={() => openCartPopup(true)}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.array,
  cartSum: PropTypes.string,
  openCartPopup: PropTypes.func,
};

Controls.defaultProps = {
  cart: [],
  cartSum: '0',
  openCartPopup: () => {},
};

export default React.memo(Controls);
