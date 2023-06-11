// Начальное состояние
const initialState = {
  data: [],
  count: 0,
  currentForm: 'comment',
  waiting: false, // признак ожидания загрузки
  newComment: [],
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {
        ...state,
        data: [],
        count: 0,
        waiting: true,
      };

    case 'comments/load-success':
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        waiting: false,
      };

    case 'comments/load-error':
      return {
        ...state,
        data: [],
        count: 0,
        waiting: false,
      }; //@todo текст ошибки сохранить?

    case 'form/open':
      return {
        ...state,
        currentForm: action.payload.name,
      };

    case 'comments/create-success':
      return {
        ...state,
        newComment: [
          ...state.newComment,
          action.payload.data,
        ],
      };

    case 'comment/reset':
      return {
        ...state,
        newComment: [],
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
