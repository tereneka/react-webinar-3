import React, {
  memo,
  useCallback,
  useEffect,
} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Container from '../../components/container';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticleContent from '../../components/articleContent';
import { useLocation } from 'react-router';
import Locale from '../../components/locale';
import useLocale from '../../hooks/use-locale';

function Article() {
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const translator = useLocale();

  const location = useLocation();
  const id = location.pathname.replace(
    '/article/',
    ''
  );

  useEffect(() => {
    store.actions.article.load(id);
  }, [id]);

  const articleData = {
    id: select.article?._id || '',
    description:
      select.article?.description || '',
    country: `${
      select.article?.madeIn?.title || ''
    } (${select.article?.madeIn?.code || ''})`,
    category:
      select.article?.category?.title || '',
    dateCreate:
      new Date(
        select.article?.dateCreate
      ).getFullYear() || 0,
    price: select.article?.price || 0,
  };

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
    // Изменение языка
    changeLang: useCallback(
      (lang) =>
        store.actions.locale.changeLang(lang),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.article?.title}>
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
      <ArticleContent
        data={articleData}
        onAdd={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(Article);
