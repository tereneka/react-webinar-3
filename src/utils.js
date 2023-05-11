const propNames = new Set([
  'id',
  'className',
  'textContent',
  'onclick',
]);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(
  name,
  props = {},
  ...children
) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Определяем написание раз или раза в зависимости от числа
 * @param num {Number} Число в фразе
 * @returns {Sting}
 */
export function getTimeWord(num) {
  const lastDigit = +num.toString().slice(-1);
  const isEnding =
    (num >= 2 && num < 5) ||
    (num > 21 && lastDigit >= 2 && lastDigit < 5);

  return isEnding ? 'раза' : 'раз';
}
