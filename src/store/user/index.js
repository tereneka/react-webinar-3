import StoreModule from '../module';

/**
 * Детальная ифнормация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      loggedIn: !!localStorage.getItem('jwt'),
      loginErr: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Авторизация пользователя
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */
  async login({ login, password }) {
    this.setState({
      ...this.getState(),
      loginErr: '',
      waiting: true,
    });

    const response = await fetch(
      `/api/v1/users/sign`,
      {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();

    if (json.result?.token) {
      // Пользователь успешно авторизовался
      localStorage.setItem(
        'jwt',
        json.result.token
      );
      this.setState(
        {
          data: json.result.user,
          loggedIn: true,
          loginErr: '',
          waiting: false,
        },
        'Пользователь успешно авторизовался'
      );
    } else if (json.error) {
      // Ошибка при авторизации
      this.setState({
        data: {},
        loggedIn: false,
        loginErr:
          json.error.data?.issues[0].message ||
          json.error.message,
        waiting: false,
      });
    }
  }

  /**
   * Выход - отмена авториазции пользователя
   * @return {Promise<void>}
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const jwt = localStorage.getItem('jwt');
    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': jwt,
      },
    });
    localStorage.removeItem('jwt');

    this.setState(
      {
        data: {},
        loggedIn: false,
        loginErr: '',
        waiting: false,
      },
      'Пользователь вышел из системы'
    );
  }

  /**
   * Получение данных текущего пользователя
   * @return {Promise<void>}
   */
  async getCurrentUser() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const jwt = localStorage.getItem('jwt');

    try {
      const response = await fetch(
        `/api/v1/users/self`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': jwt,
          },
        }
      );
      const json = await response.json();

      if (json.result) {
        // Данные пользователя успешно загружены
        this.setState(
          {
            data: json.result,
            loggedIn: true,
            loginErr: '',
            waiting: false,
          },
          'Данные пользователя загружены из АПИ'
        );
      } else if (json.error) {
        // Ошибка
        this.setState({
          data: {},
          loggedIn: false,
          loginErr: '',
          waiting: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserState;
