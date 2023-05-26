import React, { useMemo } from 'react';
import './style.css';
import { pagesGenerator } from '../../utils';

function Pagination({
  currentPage,
  pageCount,
  switchPage,
}) {
  const pageArr = useMemo(() => {
    return pagesGenerator(currentPage, pageCount);
  }, [currentPage, pageCount]);

  return (
    <div className='Pagination'>
      {pageArr.map((item) =>
        item === '...' ? (
          <span
            className='Pagination-dots'
            key={Math.random()}>
            {item}
          </span>
        ) : (
          <button
            className={`Pagination-btn ${
              item === currentPage
                ? 'Pagination-btn_active'
                : ''
            }`}
            onClick={() => switchPage(item)}
            disabled={item === currentPage}
            key={item}>
            {item}
          </button>
        )
      )}
    </div>
  );
}

export default Pagination;
