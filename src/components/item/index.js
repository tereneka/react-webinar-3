import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useLocale from '../../hooks/use-locale';

function Item(props) {
  const cn = bem('Item');

  const translator = useLocale();

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
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
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} ₽
        </div>
        <button onClick={callbacks.onAdd}>
          {translator('addBtn')}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  openArticle: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  openArticle: () => {},
};

export default memo(Item);
