import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import {
  numberFormat,
  plural,
} from '../../utils';
import './style.css';
import useLocale from '../../hooks/use-locale';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const translator = useLocale();

  return (
    <div className={cn()}>
      <span className={cn('label')}>
        {translator('basketToolLabel')}
      </span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(
              amount,
              ...translator('basketPluralArgs')
            )} / ${numberFormat(sum)} ₽`
          : `${translator('empty')}`}
      </span>
      <button onClick={onOpen}>
        {translator('goToBtn')}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
