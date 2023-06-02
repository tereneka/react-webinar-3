/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(
  value,
  variants = {},
  locale = 'ru-RU'
) {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(
    value
  );
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(
  value,
  locale = 'ru-RU',
  options = {}
) {
  return new Intl.NumberFormat(
    locale,
    options
  ).format(value);
}

/**
 * Создание дерева категорий товаров
 * @param data {Array}
 * @returns {Array}
 */
export function createCategoriesTree(data) {
  const obj = Object.fromEntries(
    data.map((item) => [
      item._id,
      {
        ...item,
        children: [],
      },
    ])
  );

  const tree = Object.values(obj).filter(
    (item) =>
      !obj[item.parent?._id]?.children.push(item)
  );

  function recursion(arr, result, nesting = 0) {
    arr.forEach((category) => {
      result.push({
        value: category._id,
        title: `${'-'.repeat(nesting)} ${
          category.title
        }`,
      });
      if (category.children.length > 0) {
        recursion(
          category.children,
          result,
          nesting + 1
        );
      }
    });
    return result;
  }

  const result = [{ value: '', title: 'Все' }];

  return recursion(tree, result);
}
