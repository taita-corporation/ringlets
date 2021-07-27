import React from 'react';
import { Link } from 'gatsby';
import * as s from './button.module.less';

const Button = ({ to, children }) => (
  <Link as="button" to={to} className={s.button}>
    {children}
  </Link>
);

export default Button;
