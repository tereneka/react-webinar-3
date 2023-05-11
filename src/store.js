/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list.map((item) => {
        // Установка дефолтного значения счётчика выделения записи
        item.selectCounter = 0;
        return item;
      }),
      /**
       * Установка дефолтного значения счётчика записей, включая удалённые
       * Значение счётчика необходимо для генерации уникального кода для новой записи
       */
      itemsCounter: initState.list.length,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(
        (item) => item !== listener
      );
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    console.log(this.state);
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners)
      listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    // Создание уникального кода для новой записи
    const code = this.state.itemsCounter + 1;

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code,
          title: 'Новая запись',
        },
      ],

      itemsCounter: code,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(
        (item) => item.code !== code
      ),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected;

          // Увеличение значения счётчика выделения записи
          if (item.selected) {
            item.selectCounter += 1;
          }
        } else {
          item.selected = false; // Сброс выделения записей
        }
        return item;
      }),
    });
  }
}

export default Store;
