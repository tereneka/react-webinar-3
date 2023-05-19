import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Popup from './components/popup';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isPopupOpen } =
    store.getState();

  const cartSum = cart
    .reduce(
      (accumulator, current) =>
        accumulator +
        current.price * current.count,
      0
    )
    .toLocaleString('ru-RU');

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addItem(code);
      },
      [store]
    ),

    getProductsListItemContent: function (item) {
      return (
        <span>{`${item.price.toLocaleString(
          'ru-RU'
        )} ₽`}</span>
      );
    },

    getCartListItemContent: function (item) {
      return (
        <>
          <span>{`${item.price.toLocaleString(
            'ru-RU'
          )} ₽`}</span>
          <span>{`${item.count} шт`}</span>
        </>
      );
    },

    onTogglePopup: useCallback(
      (bool) => {
        store.togglePopup(bool);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' />
      <Controls
        cart={cart}
        cartSum={cartSum}
        openCartPopup={callbacks.onTogglePopup}
      />
      <List
        list={list}
        itemBtnText='Добавить'
        onItemBtnClick={callbacks.onAddItem}
        getItemContent={
          callbacks.getProductsListItemContent
        }
      />
      <Popup
        isOpen={isPopupOpen}
        title='Корзина'
        closePopup={callbacks.onTogglePopup}>
        <List
          list={cart}
          itemBtnText='Удалить'
          onItemBtnClick={callbacks.onDeleteItem}
          getItemContent={
            callbacks.getCartListItemContent
          }
        />
        <div className='Popup-total'>
          <span>Итого</span>
          <span>{cartSum} ₽</span>
        </div>
      </Popup>
    </PageLayout>
  );
}

export default App;
