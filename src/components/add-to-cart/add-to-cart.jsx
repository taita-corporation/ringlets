import * as React from 'react';
import { StoreContext } from '../../context/store-context';
import { addToCart as addToCartStyle } from './add-to-cart.module.css';

function AddToCart({
  variantId, quantity, available, ...props
}) {
  const { addVariantToCart, loading } = React.useContext(StoreContext);

  function addToCart(e) {
    e.preventDefault();
    console.log('variantId', variantId);
    addVariantToCart(variantId, quantity);
  }

  return (
    <button
      type="submit"
      className={addToCartStyle}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? 'カートに入れる' : 'Sold Out'}
    </button>
  );
}

export default AddToCart;
