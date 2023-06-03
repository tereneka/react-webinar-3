import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';
import LoginTool from '../../components/login-tool';

function LoginBar() {
  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    loggedIn: state.auth.loggedIn,
    userData: state.user.data,
  }));

  const callbacks = {
    // Переход на страницу логина
    openLogin: useCallback(
      (_id) => navigate('/login'),
      []
    ),
    // Отмена авториазции пользователя
    onLogout: useCallback(
      () => store.actions.auth.logout(),
      [store]
    ),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <LoginTool
      loggedIn={select.loggedIn}
      userName={select.userData?.profile?.name}
      link={`/user/${select.userData._id}`}
      onClick={
        select.loggedIn
          ? callbacks.onLogout
          : callbacks.openLogin
      }
      t={t}
    />
  );
}

export default memo(LoginBar);
