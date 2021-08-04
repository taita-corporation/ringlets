import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import { Layout } from '../components/layout';
import * as s from './closet-items.module.less';

const ClosetPage = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  console.log(typeof (data.allDatoCmsUnusedClothing.edges[0].node.products[0]?.product));

  const items = data.allDatoCmsUnusedClothing.edges;

  return (
    <Layout>
      <div className="-mt-20">
        <GatsbyImage
          image={data.datoCmsClosetItemsPage.headerImage.gatsbyImageData}
          className="opacity-80"
        />
        <div className={s.wrapper}>
          <h1>タンスの肥やしから選択</h1>
          <ul className={s.steps}>
            <li>
              <span>&#10102;</span>
              <span>Search</span>
              <p>あなたのクローゼットの中のお洋服と似ているものを探して選択しましょう</p>
            </li>
            <li>
              <span>&#10103;</span>
              <span>Select</span>
              <p>Ringletsがコーディネートをご提案します。気になるコーディネートをチェックしましょう</p>
            </li>
            <li>
              <span>&#10104;</span>
              <span>Buy</span>
              <p>コーディネートの使用アイテムが購入できます。タンスの肥やしの服の輝きを取り戻しましょう！</p>
            </li>
          </ul>
          <div className={s.heading}>
            <h2>Search</h2>
            <p>あなたのクローゼットの中にもこんな服はありませんか？</p>
          </div>
          <div className="relative h-60 -mx-8">
            <ul className={s.itemList}>
              {items.map(({ node }, idx) => (
                // eslint-disable-next-line
                <li onClick={() => { setSelectedItem(idx); }}>
                  <GatsbyImage
                    image={node.image.gatsbyImageData}
                    className={cn(s.closetItemImage, { [s.selected]: selectedItem === idx })}
                  />
                  <span>
                    {node.title}
                  </span>
                </li>
              ))}
            </ul>

          </div>
          <div>
            {items.map(({ node }, idx) => (
              <>
                <div className={cn({ hidden: !(idx === selectedItem) })}>
                  {node.products.map(({ id, product, image }) => (
                    <>
                      <div key={id} className="grid grid-cols-2">
                        <Link to={`/products/${product}`}>
                          <GatsbyImage image={image.gatsbyImageData} className="rounded-md" />
                          <div className="font-semibold text-xl" />
                        </Link>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
    query {
        datoCmsClosetItemsPage {
          headerImage {
            gatsbyImageData (aspectRatio: 3)
          }
        }
        allDatoCmsUnusedClothing {
        edges {
          node {
            products {
              id
              product
              image {
                  gatsbyImageData (layout: CONSTRAINED, aspectRatio: 1)
              }
            }
            title
            image {
                gatsbyImageData
            }
          }
        }
      }
    }
`;

export default ClosetPage;
