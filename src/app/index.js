import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import User from './user';
import Login from './login';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const select = useSelector((state) => ({
    loggedIn: state.auth.loggedIn,
    activeModal: state.modals.name,
  }));

  useInit(
    () => {
      store.actions.user.getCurrentUser();
    },
    [select.loggedIn],
    true
  );

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route
          path={'/articles/:id'}
          element={<Article />}
        />
        <Route
          path={'/login'}
          element={<Login />}
        />
        <Route
          path={'/user/:id'}
          element={
            select.loggedIn ? (
              <User />
            ) : (
              <Navigate
                to='/login'
                replace></Navigate>
            )
          }
        />
      </Routes>

      {select.activeModal === 'basket' && (
        <Basket />
      )}
    </>
  );
}

export default App;
