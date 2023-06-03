import StoreModule from '../module';

/**
 * Детальная ифнормация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
    };
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
            waiting: false,
          },
          'Данные пользователя загружены из АПИ'
        );
      } else if (json.error) {
        // Ошибка
        this.setState({
          data: {},
          waiting: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserState;
