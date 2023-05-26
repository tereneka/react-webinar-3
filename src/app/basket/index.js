import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from 'react-router';
import useLocale from '../../hooks/use-locale';

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const translator = useLocale();

  const navigate = useNavigate();

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) =>
        store.actions.basket.removeFromBasket(
          _id
        ),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(
      () => store.actions.modals.close(),
      [store]
    ),
    // Открытие страницы товара
    openArticlePage: useCallback((id) => {
      navigate(`/article/${id}`);
      callbacks.closeModal();
    }, []),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            openArticle={
              callbacks.openArticlePage
            }
          />
        );
      },
      [
        callbacks.removeFromBasket,
        callbacks.openArticlePage,
      ]
    ),
  };

  return (
    <ModalLayout
      title={translator('basketTitle')}
      onClose={callbacks.closeModal}>
      <List
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
