import * as React from 'react';
import { graphql, Link } from 'gatsby';
import isEqual from 'lodash.isequal';
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
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product;
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState({ ...initialVariant });
  const [quantity, setQuantity] = React.useState(1);

  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale,
  );

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result = fetchedProduct?.variants.filter(
          (variant) => variant.id === productVariant.storefrontId,
        ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product],
  );

  const handleOptionChange = (index, event) => {
    const { value } = event.target;

    if (value === '') {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((variant) => isEqual(currentOptions, variant.selectedOptions));

    setVariant({ ...selectedVariant });
  };

  React.useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price,
  );

  const hasVariants = variants.length > 1;
  const hasImages = images.length > 0;

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
              <label className="mr-2">
                数量
              </label>
              <select
                aria-label="数量"
                value={quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                className={s.quantityField}
              >
                <option>
                  1
                </option>
                <option>
                  2
                </option>
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
