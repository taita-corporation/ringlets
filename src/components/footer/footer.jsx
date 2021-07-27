import * as React from 'react';
import * as s from './footer.module.less';

function Footer() {
  return (
    <footer className={s.footerStyle}>
      <nav className={s.links} aria-label="footer">
        <ul className={s.footerNavList}>
          <li className={s.footerNavListItem}>
            <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
              Source Code and Docs
            </a>
          </li>
          <li className={s.footerNavListItem}>
            <a href="https://www.gatsbyjs.com/cloud/">About Gatsby Cloud</a>
          </li>
        </ul>
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
