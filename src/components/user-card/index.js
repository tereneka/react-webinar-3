import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UserCard({ user, t }) {
  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>
        {t('user.title')}
      </h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>
          {user.profile?.name}
        </div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>
          Телефон:
        </div>
        <div className={cn('value')}>
          {user.profile?.phone}
        </div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>
          {user.email}
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  t: PropTypes.func,
};

UserCard.defaultProps = {
  t: (text) => text,
};

export default memo(UserCard);
