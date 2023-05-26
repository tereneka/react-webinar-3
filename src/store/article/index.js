import StoreModule from '../module';

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      data: {},
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        data: json.result,
      },
      'Загружено описание товара из АПИ'
    );
  }
}

export default Article;
