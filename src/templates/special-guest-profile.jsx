import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';

const ProfilePage = ({ data }) => (
  <Layout>
    <div>
      {data.datoCmsSpecialGuest.name}
    </div>
    <GatsbyImage image={data.datoCmsSpecialGuest.profileImage.gatsbyImageData} className="rounded-full" />
    {data.shopifyCollection.products.map(({ handle }) => (
      <div>{handle}</div>
    ))}
  </Layout>
);

export default ProfilePage;

export const query = graphql`
    query ($collection: String!, $instagram: String!) {
    shopifyCollection(handle: {eq: $collection }) {
        products {
          handle
        }
      }
    datoCmsSpecialGuest (instagram: {eq: $instagram}) {
      name
      profileImage {
        gatsbyImageData (
          layout: CONSTRAINED,
          aspectRatio: 1,
          width: 150,
        )
      }
    }
  }
`;
