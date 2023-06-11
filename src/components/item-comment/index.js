import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/format-date';
import CommentForm from '../comment-form';
import CommentsList from '../comments-list';

function ItemComment({
  item,
  isFormOpen,
  exists,
  isCurrentUser,
  openForm,
  onSubmit,
  renderItem,
}) {
  const cn = bem('ItemComment');
  const formRef = useRef(null);
  const callbacks = {
    openForm: () => openForm(item._id),
    closeForm: () => openForm('comment'),
    onSubmit: (e, text) =>
      onSubmit(e, item._id, 'comment', text),
  };

  useEffect(() => {
    formRef.current?.focus();
  }, [isFormOpen]);

  return (
    <div className={cn()}>
      {item.isDeleted ? (
        <div className={cn('header')}>
          Комментарий был удалён
        </div>
      ) : (
        <div className={cn('header')}>
          <div
            className={`${cn('author')}  ${
              isCurrentUser
                ? cn('author_current')
                : ''
            }`}>
            {item.author.profile?.name}
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

      {item.children.length > 0 && (
        <CommentsList
          list={item.children}
          renderItem={renderItem}
          isNested={item.level < 13}
        />
      )}

      {isFormOpen && (
        <CommentForm
          isComment={false}
          label='Новый ответ'
          exists={exists}
          closeForm={callbacks.closeForm}
          onSubmit={callbacks.onSubmit}
          ref={formRef}
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
