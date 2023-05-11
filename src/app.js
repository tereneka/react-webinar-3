import React from 'react';
import './styles.css';
import ListItem from './components/ListItem.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list } = store.getState();

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button
          className='Btn'
          onClick={() => store.addItem()}>
          Добавить
        </button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map((item) => (
            <ListItem
              item={item}
              store={store}
              key={item.code}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
