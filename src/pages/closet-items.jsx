import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import { Layout } from '../components/layout';
import * as s from './closet-items.module.less';

const ClosetPage = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  console.log(typeof (data.allDatoCmsUnusedClothing.edges[0].node.products[0].product));

  const items = data.allDatoCmsUnusedClothing.edges;

  return (
    <Layout>
      <div className="-mt-20">
        <GatsbyImage
          image={data.datoCmsClosetItemsPage.headerImage.gatsbyImageData}
          className="opacity-80"
        />
        <div className={s.wrapper}>
          <ul className={s.itemList}>
            {items.map(({ node }, idx) => (
              <li onClick={() => { setSelectedItem(idx); }}>
                <GatsbyImage image={node.image.gatsbyImageData} />
                {node.title}
              </li>
            ))}
          </ul>
          <div>
            {items.map(({ node }, idx) => (
              <>
                <div className={cn({ hidden: !(idx === selectedItem) })}>
                  {node.products.map(({ image }) => (
                    <>
                      <GatsbyImage image={image.gatsbyImageData} />
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
              product
                image {
                    gatsbyImageData (layout: CONSTRAINED)
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
