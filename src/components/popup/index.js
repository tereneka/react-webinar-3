import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Popup({
  isOpen,
  title,
  content,
  footer,
  closePopup,
}) {
  return (
    <div
      className={`Popup ${
        isOpen ? 'Popup_open' : ''
      }`}>
      <div className='Popup-container'>
        <div className='Popup-head'>
          <h2 className='Popup-title'>{title}</h2>
          <button
            className='Popup-btn'
            onClick={() => closePopup(false)}>
            Закрыть
          </button>
        </div>
        <div className='Popup-content'>
          {content}
        </div>
        <div className='Popup-footer'>
          {footer}
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
  closePopup: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  title: '',
};

export default React.memo(Popup);
