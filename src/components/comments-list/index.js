import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentsList({
  list,
  renderItem,
  isNested,
}) {
  return (
    <div className='CommentsList'>
      {list.map((item) => (
        <div
          key={item._id}
          className={`CommentsList-item ${
            isNested
              ? 'CommentsList-item_nested'
              : ''
          }`}>
          {renderItem(item)}
          {item.children.length > 0 && (
            <CommentsList
              list={item.children}
              renderItem={renderItem}
              isNested={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
  isNested: PropTypes.bool,
};

CommentsList.defaultProps = {
  renderItem: (item) => {},
  isNested: false,
};

export default memo(CommentsList);
