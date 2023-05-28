import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useLocale from '../../hooks/use-locale';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const translator = useLocale();

  const callbacks = {
    onRemove: () =>
      props.onRemove(props.item._id),
    onLinkClick: () => props.onLinkClick(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={props.url}
        className={cn('link')}
        onClick={callbacks.onLinkClick}>
        <div className={cn('title')}>
          {props.item.title}
        </div>
      </Link>
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
  onLinkClick: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onLinkClick: () => {},
};

export default memo(ItemBasket);
