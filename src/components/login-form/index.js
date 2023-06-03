import React, { memo } from 'react';
import { useForm } from '../../hooks/use-form';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ onSubmit, error, t }) {
  const { values, handleChange } = useForm([
    'login',
    'password',
  ]);

  return (
    <div className='LoginForm'>
      <h2 className='LoginForm-title'>
        {t('login')}
      </h2>
      <form
        className='LoginForm-form'
        name='login'
        onSubmit={(e) => onSubmit(e, values)}>
        <label
          className='LoginForm-label'
          htmlFor='login'>
          Логин
        </label>
        <input
          className='LoginForm-input'
          value={values.login}
          onChange={handleChange}
          name='login'
          id='login'
          type='text'
          required
          minLength={2}
          maxLength={20}
        />

        <label
          className='LoginForm-label'
          htmlFor='password'>
          Пароль
        </label>
        <input
          className='LoginForm-input'
          value={values.password}
          onChange={handleChange}
          name='password'
          id='password'
          type='password'
          required
          minLength={6}
        />

        <span
          className={`${
            error
              ? 'LoginForm-serverErr LoginForm-serverErr_visible'
              : 'LoginForm-serverErr'
          }`}>
          {error}
        </span>
        <button type='submit'>
          {t('login.enter')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: () => {},
  t: (text) => text,
};

export default memo(LoginForm);
