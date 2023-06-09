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
    trees[item[key]] = item;
    trees[item[key]].children = [];

    trees[item.parent[key]]?.children.push(
      trees[item[key]]
    );
  }
  return trees[articleId].children;
}
