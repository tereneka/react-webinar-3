export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (
      dispatch,
      getState,
      services
    ) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1//comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: 'comments/load-success',
          payload: {
            data: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Открытие формы по названию
   * @param name
   */
  open: (name) => {
    return {
      type: 'form/open',
      payload: { name },
    };
  },

  /**
   * Добавление комментариев
   * @param parentId {String}
   * @param type {String}
   * @param text {String}
   * @return {Function}
   */
  create: (parentId, type, text) => {
    return async (
      dispatch,
      getState,
      services
    ) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          body: JSON.stringify({
            parent: {
              _id: parentId,
              _type: type,
            },
            text,
          }),
          method: 'POST',
        });

        dispatch({
          type: 'comments/create-success',
          payload: {
            data: res.data.result,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({
          type: 'comments/create-error',
        }); //@todo текст ошибки сохранить
      }
    };
  },

  /**
   * Сброс нового комментария
   */
  resetNewComment: () => {
    return {
      type: 'comment/reset',
    };
  },
};
