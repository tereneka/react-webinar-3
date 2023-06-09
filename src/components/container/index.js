import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Container({ children, padding }) {
  const cn = bem('Container');
  return (
    <div className={cn({ padding })}>
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

Container.defaultProps = {};

export default memo(Container);
