import useSelector from '../store/use-selector';
import { locale } from '../constants';
import useStore from '../store/use-store';

/**
 * Хук для перевода на выбранный язык
 * @return {Function}
 */
export default function useLocale() {
  const store = useStore();

  const lang = useSelector(
    (state) => state.locale.lang
  );

  return function (key) {
    return locale[lang][key];
  };
}
