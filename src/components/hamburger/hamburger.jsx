import React from 'react';
import cn from 'classnames';

import * as s from './hamburger.module.less';

const Hamburger = (props) => (
  <button className={cn(s.container)} type="button" {...props}>
    <span />
    <span />
  </button>
);

export default Hamburger;
