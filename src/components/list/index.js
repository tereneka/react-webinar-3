import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({
  list,
  total,
  item: Item,
  ...props
}) {
  return (
    <div className='List'>
      {list.map((item) => (
        <div
          key={item.code}
          className='List-item'>
          <Item item={item} {...props} />
        </div>
      ))}

      {total !== undefined && (
        <div className='List-total'>
          <span>Итого</span>
          <span>{total} ₽</span>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  item: PropTypes.object,
  total: PropTypes.string,
};

List.defaultProps = {
  total: undefined,
};

export default React.memo(List);
