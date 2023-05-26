import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { langList } from '../../constants';

function Locale({ lang, changeLang }) {
  return (
    <select
      className='Locale'
      value={lang}
      onChange={(e) =>
        changeLang(e.target.value)
      }>
      {langList.map((lang) => (
        <option key={lang}>{lang}</option>
      ))}
    </select>
  );
}

Locale.propTypes = {
  lang: PropTypes.string,
  changeLang: PropTypes.func,
};

Locale.defaultProps = {
  lang: 'русский',
  changeLang: () => {},
};

export default Locale;
