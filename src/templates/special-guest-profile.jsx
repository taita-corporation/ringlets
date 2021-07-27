import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';

const ProfilePage = ({ data, pageContext }) => (
  <Layout>
    {data.shopifyCollection.products.map(({ handle }) => (
      <div>{handle}</div>
    ))}
  </Layout>
);

export default ProfilePage;

export const query = graphql`
    query ($collection: String!) {
    shopifyCollection(handle: {eq: $collection }) {
        products {
          handle
        }
      }
    }
`;
