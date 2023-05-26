import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils';
import useLocale from '../../hooks/use-locale';

function ArticleContent({ data, onAdd }) {
  const translator = useLocale();

  return (
    <div className='ArticleContent'>
      <p className='ArticleContent-paragraph'>
        {data.description}
      </p>
      <p className='ArticleContent-paragraph'>
        {translator('articleCountry')}{' '}
        <span className='ArticleContent-mark'>
          {data.country}
        </span>
      </p>
      <p className='ArticleContent-paragraph'>
        {translator('articleCategory')}{' '}
        <span className='ArticleContent-mark'>
          {data.category}
        </span>
      </p>
      <p className='ArticleContent-paragraph'>
        {translator('articleDateCreate')}{' '}
        <span className='ArticleContent-mark'>
          {data.dateCreate}
        </span>
      </p>
      <p className='ArticleContent-price'>{`${translator(
        'articlePrice'
      )} ${numberFormat(data.price)} ₽`}</p>
      <button
        className='ArticleContent-btn'
        onClick={() => onAdd(data.id)}>
        {translator('addBtn')}
      </button>
    </div>
  );
}

ArticleContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    dateCreate: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

ArticleContent.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleContent);
