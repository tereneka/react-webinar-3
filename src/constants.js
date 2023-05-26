export const menuListRu = [
  { to: '/', linkText: 'Главная' },
];

export const menuListEn = [
  { to: '/', linkText: 'Main' },
];

export const langList = ['русский', 'english'];

export const locale = {
  русский: {
    mainHeadTitle: 'Магазин',
    menuList: menuListRu,
    goToBtn: 'Перейти',
    addBtn: 'Добавить',
    closeBtn: 'Закрыть',
    deleteBtn: 'Удалить',
    pcs: 'шт',
    total: 'Итого',
    empty: 'пусто',
    basketTitle: 'Корзина',
    basketToolLabel: 'В корзине:',
    basketPluralArgs: [
      {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      },
      'ru-RU',
    ],
    articleCountry: 'Страна производитель:',
    articleCategory: 'Категория:',
    articleDateCreate: 'Год выпуска:',
    articlePrice: 'Цена:',
  },

  english: {
    mainHeadTitle: 'Shop',
    menuList: menuListEn,
    goToBtn: 'Go',
    addBtn: 'Add',
    closeBtn: 'Close',
    deleteBtn: 'Delete',
    pcs: 'pcs',
    total: 'Total',
    empty: 'empty',
    basketTitle: 'Basket',
    basketToolLabel: 'In basket:',
    basketPluralArgs: [
      {
        one: 'goods',
        other: 'goods',
      },
      'en-EN',
    ],
    articleCountry: 'Producing country:',
    articleCategory: 'Category:',
    articleDateCreate: 'Release year:',
    articlePrice: 'Price:',
  },
};
