import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CatalogItem({ item, onAdd }) {
  return (
    <div className='CatalogItem'>
      <div className='CatalogItem-code'>
        {item.code}
      </div>
      <div className='CatalogItem-title'>
        {item.title}
      </div>
      <div className='CatalogItem-content'>
        {`${item.price.toLocaleString(
          'ru-RU'
        )} ₽`}
      </div>
      <div className='CatalogItem-actions'>
        <button
          className='CatalogItem-btn'
          onClick={() => {
            onAdd(item.code);
          }}>
          Добавить
        </button>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

CatalogItem.defaultProps = {
  onAdd: () => {},
};

export default React.memo(CatalogItem);
