import React, { memo } from 'react';
import { useForm } from '../../hooks/use-form';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ onSubmit, t }) {
  const {
    values,
    errMessages,
    isTouched,
    handleChange,
  } = useForm(['login', 'password']);

  const isFormValid =
    !Object.values(errMessages).some(
      (i) => !!i
    ) &&
    !Object.values(isTouched).some((i) => !i);

  return (
    <div className='LoginForm'>
      <h2 className='LoginForm-title'>
        {t('login')}
      </h2>
      <form
        className='LoginForm-form'
        name='login'
        onSubmit={(e) => onSubmit(e, values)}
        noValidate>
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

        <span className='LoginForm-err'>
          {errMessages.login}
        </span>

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
        <span className='LoginForm-err'>
          {errMessages.password}
        </span>

        <span className='LoginForm-serverErr'></span>
        <button
          type='submit'
          disabled={!isFormValid}>
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
