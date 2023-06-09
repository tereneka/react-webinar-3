import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/format-date';
import CommentForm from '../comment-form';

function ItemComment({
  item,
  isFormOpen,
  exists,
  openForm,
  onSubmit,
}) {
  const cn = bem('ItemComment');

  const callbacks = {
    openForm: () => openForm(item._id),
    closeForm: () => openForm('comment'),
    onSubmit: (e, text) =>
      onSubmit(e, item._id, 'comment', text),
  };

  return (
    <div className={cn()}>
      {item.isDeleted ? (
        <div className={cn('header')}>
          Комментарий был удалён
        </div>
      ) : (
        <div className={cn('header')}>
          <div className={cn('author')}>
            {item.author.profile.name}
          </div>
          <div className={cn('date')}>
            {formatDate(item.dateCreate)}
          </div>
        </div>
      )}

      <div className={cn('text')}>
        {item.text}
      </div>

      <button
        className={cn('btn')}
        onClick={callbacks.openForm}>
        Ответить
      </button>

      {isFormOpen && (
        <CommentForm
          isComment={false}
          label='Новый ответ'
          exists={exists}
          closeForm={callbacks.closeForm}
          onSubmit={callbacks.onSubmit}
        />
      )}
    </div>
  );
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDeleted: PropTypes.bool,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  isFormOpen: PropTypes.bool,
  exists: PropTypes.bool,
  openForm: PropTypes.func,
  onSubmit: PropTypes.func,
};

ItemComment.defaultProps = {
  openForm: () => {},
  onSubmit: () => {},
};

export default memo(ItemComment);
