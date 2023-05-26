import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Container({ children }) {
  return (
    <div className='Container'>{children}</div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

export default memo(Container);
