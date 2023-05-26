import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Menu({ linkList }) {
  return (
    <nav className='Menu'>
      {linkList.map((link) => (
        <Link
          className='Menu-link'
          to={link.to}
          key={link.to}>
          {link.linkText}
        </Link>
      ))}
    </nav>
  );
}

Menu.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      linkText: PropTypes.string,
    })
  ).isRequired,
};

export default memo(Menu);
