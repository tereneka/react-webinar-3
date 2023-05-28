import {
  memo,
  useCallback,
  useEffect,
} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Container from '../../components/container';
import Menu from '../../components/menu';
import Locale from '../../components/locale';
import useLocale from '../../hooks/use-locale';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    pageCount: state.catalog.pageCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const translator = useLocale();

  useEffect(() => {
    store.actions.catalog.load(
      (select.currentPage - 1) * 10
    );
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) =>
        store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
    // Переключение страницы
    switchPage: useCallback(
      (pageNumber) =>
        store.actions.catalog.switchPage(
          pageNumber
        ),
      [store]
    ),
    // Изменение языка
    changeLang: useCallback(
      (lang) =>
        store.actions.locale.changeLang(lang),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            url={`/article/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={translator('mainHeadTitle')}>
        <Locale
          lang={select.lang}
          changeLang={callbacks.changeLang}
        />
      </Head>
      <Container>
        <Menu linkList={translator('menuList')} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Container>
      <List
        list={select.list}
        renderItem={renders.item}
      />
      <Pagination
        currentPage={select.currentPage}
        pageCount={select.pageCount}
        switchPage={callbacks.switchPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
