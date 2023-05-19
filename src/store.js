import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемого товара
      cart: this.state.cart.filter(
        (item) => item.code !== code
      ),
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItem(code) {
    this.setState({
      ...this.state,

      cart: this.state.cart.find(
        (item) => item.code === code
      )
        ? this.state.cart.map((item) => {
            if (item.code === code) {
              return {
                ...item,
                count: item.count + 1 || 1,
              };
            }
            return item;
          })
        : [
            ...this.state.cart,
            {
              ...this.state.list.find(
                (item) => item.code === code
              ),
              count: 1,
            },
          ],
    });
  }

  /**
   * Открытие/закрытие модального окна
   */
  togglePopup(bool) {
    this.setState({
      ...this.state,
      isPopupOpen: bool,
    });
  }
}

export default Store;
