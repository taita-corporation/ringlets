import * as React from 'react';
import { Link } from 'gatsby';
import { FaInstagram } from 'react-icons/fa';
import * as s from './footer.module.less';

function Footer() {
  return (
    <footer className={s.footerStyle}>
      <nav className={s.links} aria-label="footer">
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
              <div>↓お問い合わせはインスタDMまで</div>
            </li>
          </ul>
          <div className="mt-4">
            <a href="https://instagram.com/ringlets0" className="inline-block">
              <FaInstagram size={18} className={s.icon} />
            </a>
          </div>
        </div>
      </nav>
      <div className={s.copyright}>
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        · All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
