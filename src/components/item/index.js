import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  return (
    <div className='Item'>
      <div className='Item-code'>
        {props.item.code}
      </div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-content'>
        {props.getItemContent(props.item)}
      </div>
      <div className='Item-actions'>
        <button
          onClick={() => {
            props.onClick(props.item.code);
          }}>
          {props.btnText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  getItemContent: PropTypes.func,
};

Item.defaultProps = {
  btnText: 'Кнопка',
  onClick: () => {},
  getItemContent: () => {},
};

export default React.memo(Item);
