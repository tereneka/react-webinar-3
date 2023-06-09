import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm({
  isComment,
  label,
  exists,
  closeForm,
  onSubmit,
}) {
  const cn = bem('CommentForm');

  const [value, setValue] = useState('');

  const callbacks = {
    closeForm: () => closeForm(),
    onSubmit: (e) => onSubmit(e, value),
  };

  return (
    <div className={cn()}>
      {exists ? (
        <form
          className={cn('form')}
          onSubmit={callbacks.onSubmit}>
          <label className={cn('label')}>
            {label}
          </label>
          <textarea
            className={cn('input')}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
          />
          <div className={cn('btn-group')}>
            <button type='submit'>
              Отправить
            </button>
            {!isComment && (
              <button
                onClick={callbacks.closeForm}>
                Отмена
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className={cn('login')}>
          <Link
            className={cn('login-link')}
            to='/login'>
            Войдите
          </Link>
          {`, чтобы иметь возможность ${
            isComment
              ? 'комментировать'
              : 'ответить'
          }. `}
          {!isComment && (
            <button
              className={cn('login-btn')}
              onClick={closeForm}>
              Отмена
            </button>
          )}
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  isComment: PropTypes.bool,
  label: PropTypes.string,
  exists: PropTypes.bool,
  closeForm: PropTypes.func,
  onSubmit: PropTypes.func,
};

CommentForm.defaultProps = {
  closeForm: () => {},
  onSubmit: () => {},
};

export default memo(CommentForm);
