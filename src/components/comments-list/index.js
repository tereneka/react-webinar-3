import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentsList({
  list,
  renderItem,
  isNested,
}) {
  return (
    <div
      className={`CommentsList ${
        isNested ? 'CommentsList_nested' : ''
      }`}>
      {list.map((item) => (
        <div key={item._id}>
          {renderItem(item)}
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
