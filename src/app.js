import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Popup from './components/popup';
import CatalogItem from './components/catalogItem';
import CartItem from './components/cartItem';
import CartTotal from './components/cartTotal';

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

    onTogglePopup: useCallback(
      (bool) => {
        store.togglePopup(bool);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        cart={cart}
        cartSum={cartSum}
        openCartPopup={callbacks.onTogglePopup}
      />
      <List
        list={list}
        item={CatalogItem}
        onAdd={callbacks.onAddItem}
      />
      <Popup
        isOpen={isPopupOpen}
        title='Корзина'
        content={
          <List
            list={cart}
            item={CartItem}
            onDelete={callbacks.onDeleteItem}
          />
        }
        footer={<CartTotal sum={cartSum} />}
        closePopup={callbacks.onTogglePopup}
      />
    </PageLayout>
  );
}

export default App;
