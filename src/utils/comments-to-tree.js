/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param articleId {String}
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function commentsToTree(
  list,
  articleId,
  key = '_id'
) {
  const trees = {};

  trees[articleId] = {
    children: [],
  };

  for (const item of list) {
    if (item[key]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];

      trees[item.parent[key]]?.children.push(
        trees[item[key]]
      );
    }
  }

  const result = trees[articleId].children;

  addLevel(result);

  return result;
}

/**
 * Добавляем уровень вложенности.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [level] {Number} Начальный уровень вложенности.
 * @returns {void}
 */
function addLevel(tree, level = 0) {
  for (const item of tree) {
    item.level = level;
    if (item.children?.length) {
      addLevel(item.children, level + 1);
    }
  }
}
