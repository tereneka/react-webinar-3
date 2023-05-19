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
          {`${cart.length} ${plural(cart.length, {
            zero: 'товаров',
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${cartSum} ₽`}
        </span>
      </div>
      <button onClick={() => openCartPopup(true)}>
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
