import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    };
  }

  async getCategories() {
    const response = await fetch(
      '/api/v1/categories?fields=_id,title,parent(_id)&limit=*'
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружен список категорий товаров из АПИ'
    );
  }
}

export default CategoriesState;
