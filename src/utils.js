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
 * Генератор массива страниц для пагинации
 * @param currentPage {Number}
 * @param pageCount {Number}
 * @returns {Array}
 */
export function pagesGenerator(
  currentPage = 1,
  pageCount = 1
) {
  let pageArr = [];

  if (pageCount < 5) {
    let n = 0;
    while (n < pageCount) {
      n += 1;
      pageArr.push(n);
    }
  } else if (currentPage <= 2) {
    pageArr = [1, 2, 3, '...', pageCount];
  } else if (currentPage === 3 && pageCount > 5) {
    pageArr = [1, 2, 3, 4, '...', pageCount];
  } else if (
    currentPage === 3 &&
    pageCount === 5
  ) {
    pageArr = [1, 2, 3, 4, pageCount];
  } else if (currentPage >= pageCount - 1) {
    pageArr = [
      1,
      '...',
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  } else if (currentPage === pageCount - 2) {
    pageArr = [
      1,
      '...',
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  } else {
    pageArr = [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      pageCount,
    ];
  }
  return pageArr;
}
