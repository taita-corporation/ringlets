import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getSrc } from 'gatsby-plugin-image';
import { Layout } from '../../components/layout';
import { StoreContext } from '../../context/store-context';
import AddToCart from '../../components/add-to-cart';
import { formatPrice } from '../../utils/format-price';
import { Seo } from '../../components/seo';
import * as s from './product-page.module.less';
import ProductSlider from '../../components/product-slider/product-slider';

export default function Product({ data: { product } }) {
  const {
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product;
  const { client } = React.useContext(StoreContext);

  const [quantity, setQuantity] = React.useState(1);

  const variant = initialVariant;
  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale,
  );

  // check if selected variant is available
  const checkAvailablity = React.useCallback(
    async (productId) => {
      const fetchedProduct = await client.product.fetch(productId);
      const result = fetchedProduct?.variants.filter(
        (v) => v.id === productVariant.storefrontId,
      ) ?? [];
      console.log('result:', result);

      if (result.length > 0) {
        setAvailable(result[0].available);
      }
    },
    [productVariant.storefrontId, client.product],
  );

  React.useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price,
  );

  const hasImages = images.length > 0;

  console.log('images:', images);

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className={s.container}>
        <div className={s.productBox}>
          {hasImages && (
            <div className={s.productImageWrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul>
                  <ProductSlider>
                    {images.map((image, index) => (
                      <li
                        key={`product-image-${image.id}`}
                        className={s.productImageListItem}
                      >
                        <GatsbyImage
                          objectFit="contain"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                          image={image.gatsbyImageData}
                        />
                      </li>
                    ))}
                  </ProductSlider>
                </ul>
              </div>
            </div>
          )}

          {/* if product has no images */}
          {!hasImages && (
            <span className={s.noImagePreview}>No Preview image</span>
          )}

          <div>
            <h1 className={s.header}>{title}</h1>
            <p className={s.productDescription}>{description}</p>
            <h2 className={s.priceValue}>
              <span>{price}</span>
            </h2>
            <div className={s.quantityFieldWrapper}>
              {/* eslint-disable-next-line */}
              <label className="mr-2">
                数量
              </label>
              <select
                aria-label="数量"
                value={quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                className={s.quantityField}
              >
                {available
                  && Array.from({ length: variant.inventoryQuantity }, (v, i) => i + 1).map((i) => (
                    <option>{i}</option>
                  ))}
              </select>
            </div>
            <div className={s.addToCartStyle}>
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        inventoryQuantity
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
  }
`;
