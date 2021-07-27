import * as React from 'react';
import { Link } from 'gatsby';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { cartButton, badge } from './cart-button.module.css';

function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <HiOutlineShoppingBag size={24} />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  );
}

export default CartButton;
