import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import {
  useDispatch,
  useSelector as useSelectorRedux,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import shallowequal from 'shallowequal';
import { useMemo } from 'react';
import commentsToTree from '../../utils/comments-to-tree';
import commentsActions from '../../store-redux/article-comments/actions';
import { memo } from 'react';
import Spinner from '../../components/spinner';
import Container from '../../components/container';
import CommentsList from '../../components/comments-list';
import ItemComments from '../../components/item-comment';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comment-form';

function ArticleComments() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      comments: state.articleComments.data,
      count: state.articleComments.count,
      currentForm:
        state.articleComments.currentForm,
      waiting: state.articleComments.waiting,
      newComment:
        state.articleComments.newComment,
    }),
    shallowequal
  );

  const exists = useSelector(
    (state) => state.session.exists
  );

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id, select.newComment]);

  const comments = useMemo(
    () =>
      commentsToTree(
        select.comments,
        select.article._id
      ),
    [select.comments]
  );

  const callbacks = {
    openForm: useCallback(
      (name) => {
        dispatch(commentsActions.open(name));
      },
      [store]
    ),
    onSubmit: useCallback(
      (e, parentId, type, text) => {
        e.preventDefault();
        dispatch(
          commentsActions.create(
            parentId,
            type,
            text
          )
        );
        dispatch(commentsActions.open('comment'));
      }
    ),
  };

  const renders = {
    itemComments: useCallback(
      (item) => (
        <ItemComments
          item={item}
          isFormOpen={
            select.currentForm === item._id
          }
          exists={exists}
          openForm={callbacks.openForm}
          onSubmit={callbacks.onSubmit}
        />
      ),
      [select.currentForm]
    ),
  };

  return (
    <Container padding='large'>
      <Spinner active={select.waiting}>
        <div
          style={{
            fontSize: 24,
            marginTop: 10,
          }}>{`Комментарии (${select.count})`}</div>
        <CommentsList
          list={comments}
          renderItem={renders.itemComments}
        />
        {select.currentForm === 'comment' && (
          <CommentForm
            isComment={true}
            label='Новый комментарий'
            exists={exists}
            onSubmit={(e, text) =>
              callbacks.onSubmit(
                e,
                select.article._id,
                'article',
                text
              )
            }
          />
        )}
      </Spinner>
    </Container>
  );
}

export default memo(ArticleComments);
