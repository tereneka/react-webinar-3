import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useLocale from '../../hooks/use-locale';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const translator = useLocale();

  const callbacks = {
    onRemove: (e) =>
      props.onRemove(props.item._id),
    openArticle: () =>
      props.openArticle(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div
        className={cn('title')}
        onClick={callbacks.openArticle}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} ₽
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)}{' '}
          {translator('pcs')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {translator('deleteBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  openArticle: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  openArticle: () => {},
};

export default memo(ItemBasket);
