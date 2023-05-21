import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({
  list,
  item: Item,
  total,
  isScrolled,
  ...props
}) {
  return (
    <div className='List'>
      <div
        className={`List-container ${
          isScrolled
            ? 'List-container_scrolled'
            : ''
        }`}>
        {list.map((item) => (
          <div
            key={item.code}
            className='List-item'>
            <Item item={item} {...props} />
          </div>
        ))}
      </div>

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
  isScrolled: PropTypes.bool,
};

List.defaultProps = {
  total: undefined,
  isScrolled: false,
};

export default React.memo(List);
