import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  list,
  itemBtnText,
  onItemBtnClick,
  getItemContent,
}) {
  return (
    <div className='List'>
      {list.map((item) => (
        <div
          key={item.code}
          className='List-item'>
          <Item
            item={item}
            btnText={itemBtnText}
            onClick={onItemBtnClick}
            getItemContent={getItemContent}
          />
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
  itemBtnText: PropTypes.string,
  onItemBtnClick: PropTypes.func,
  getItemContent: PropTypes.func,
};

List.defaultProps = {
  itemBtnText: 'Кнопка',
  onItemBtnClick: () => {},
  getItemContent: () => {},
};

export default React.memo(List);
