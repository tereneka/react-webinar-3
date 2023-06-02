import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LoginTool({
  loggedIn,
  userName,
  link,
  onClick,
  t,
}) {
  const cn = bem('LoginTool');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to={link}>
        {userName}
      </Link>
      <button onClick={onClick}>
        {loggedIn ? t('logout') : t('login')}
      </button>
    </div>
  );
}

LoginTool.propTypes = {
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  t: PropTypes.func,
};

LoginTool.defaultProps = {
  onClick: () => {},
  t: (text) => text,
};

export default memo(LoginTool);
