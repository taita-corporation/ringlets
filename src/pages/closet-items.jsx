import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import { Layout } from '../components/layout';

const ClosetPage = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  console.log(typeof (data.allDatoCmsUnusedClothing.edges[0].node.products[0].product));

  const items = data.allDatoCmsUnusedClothing.edges;

  return (
    <Layout>
      <div>
        {items.map(({ node }, idx) => (
          <>
            <div>
              <div onClick={() => { setSelectedItem(idx); }}>
                <GatsbyImage image={node.image.gatsbyImageData} />
                {node.title}
              </div>
            </div>
          </>
        ))}
      </div>
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
    </Layout>
  );
};

export const query = graphql`
    query {
        allDatoCmsUnusedClothing {
        edges {
          node {
            products {
              product
                image {
                    gatsbyImageData
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
