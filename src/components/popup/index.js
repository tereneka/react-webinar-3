import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Popup({
  isOpen,
  title,
  closePopup,
  children,
}) {
  return (
    <div
      className={`Popup ${
        isOpen ? 'Popup_open' : ''
      }`}>
      <div className='Popup-content'>
        <div className='Popup-head'>
          <h2 className='Popup-title'>{title}</h2>
          <button
            onClick={() => closePopup(false)}>
            Закрыть
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  closePopup: PropTypes.func,
  children: PropTypes.node,
};

Popup.defaultProps = {
  isOpen: false,
  title: 'Заголовок',
  closePopup: () => {},
};

export default React.memo(Popup);
