import React from 'react';
import { getTimeWord } from '../utils.js';

export default function ListItem({
  item,
  store,
}) {
  return (
    <div className='List-item'>
      <div
        className={
          'Item' +
          (item.selected ? ' Item_selected' : '')
        }
        onClick={() =>
          store.selectItem(item.code)
        }>
        <div className='Item-code'>
          {item.code}
        </div>
        <div className='Item-title'>
          {item.title}
          {item.selectCounter > 0 &&
            ` | Выделяли ${
              item.selectCounter
            } ${getTimeWord(item.selectCounter)}`}
        </div>
        <div className='Item-actions'>
          <button
            className='Btn'
            onClick={() =>
              store.deleteItem(item.code)
            }>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
