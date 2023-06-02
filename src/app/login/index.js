import React, { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../containers/login-bar';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const callbacks = {
    // Авторизация пользователя
    onLogin: useCallback(
      (e, values) => {
        e.preventDefault();
        store.actions.user.login(values);
        navigate('/');
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <LoginBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        onSubmit={callbacks.onLogin}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
