import React from 'react';
import { Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';
import { FaInstagram } from 'react-icons/fa';
import * as s from './menu.module.less';

const Menu = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen && (
    <RemoveScroll forwardProps>
      <motion.div
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={s.wrapper}>
          <ul className={s.nav}>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/closet-items">タンスの肥やしを解決します！</Link>
            </li>
            <li>
              <Link to="/special-guests">Special Guests</Link>
            </li>
          </ul>
          <ul className={s.navSmall}>
            <li>
              <Link to="/special-guests">Legal Terms</Link>
            </li>
            <li>
              <Link to="/special-guests">お問い合わせ</Link>
            </li>
          </ul>
          <div className="mt-8">
            <a href="https://instagram.com/ringlets0" className="inline-block">
              <FaInstagram size={24} className={s.icon} />
            </a>
          </div>
        </div>
      </motion.div>
    </RemoveScroll>
    )}
  </AnimatePresence>
);

export default Menu;
