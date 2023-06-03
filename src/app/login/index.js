import React, { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../containers/login-bar';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import useStore from '../../hooks/use-store';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    error: state.auth.loginErr,
    loggedIn: state.auth.loggedIn,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    // Авторизация пользователя
    onLogin: useCallback(
      (e, values) => {
        e.preventDefault();
        store.actions.auth.login(values);
      },
      [store, select.loggedIn]
    ),
  };

  useInit(
    () => {
      if (select.loggedIn) {
        navigate('/');
      }
    },
    [select.loggedIn],
    true
  );

  useInit(
    () => {
      store.actions.auth.resetLoginError();
    },
    [location],
    true
  );

  return (
    <PageLayout>
      <LoginBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm
          onSubmit={callbacks.onLogin}
          error={select.error}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
