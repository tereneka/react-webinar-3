import {
  memo,
  useCallback,
  useMemo,
} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import { createCategoriesTree } from '../../utils';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    filter: state.catalog.params.category,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) =>
        store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Фильтрация по категории
    onFilter: useCallback(
      (category) =>
        store.actions.catalog.setParams({
          category,
          page: 1,
        }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) =>
        store.actions.catalog.setParams({
          query,
          page: 1,
        }),
      [store]
    ),
    // Сброс
    onReset: useCallback(
      () => store.actions.catalog.resetParams(),
      [store]
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        {
          value: 'title.ru',
          title: 'По именованию',
        },
        {
          value: '-price',
          title: 'Сначала дорогие',
        },
        { value: 'edition', title: 'Древние' },
      ],
      []
    ),
    filter: useMemo(
      () =>
        createCategoriesTree(select.categories),
      [select.categories]
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select
        options={options.filter}
        value={select.filter}
        onChange={callbacks.onFilter}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>
        {t('filter.reset')}
      </button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
