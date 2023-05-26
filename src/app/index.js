import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router';
import Article from './article';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(
    (state) => state.modals.name
  );

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/article/:id'
          element={<Article />}
        />
        <Route path='*' element={<Main />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
