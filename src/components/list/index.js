import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, item: Item, ...props }) {
  return (
    <div className='List'>
      {list.map((item) => (
        <div
          key={item.code}
          className='List-item'>
          <Item item={item} {...props} />
        </div>
      ))}
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
};

export default React.memo(List);
