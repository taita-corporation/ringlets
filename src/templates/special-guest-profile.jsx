import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import ProductListing from '../components/product-listing';
import * as s from './special-guest-profile.module.less';

const ProfilePage = ({ data }) => (
  <Layout>
    <div className="flex flex-col items-center px-8 my-8">
      <GatsbyImage
        image={data.datoCmsSpecialGuest.profileImage.gatsbyImageData}
        className="rounded-full"
      />
      <h2>
        {data.datoCmsSpecialGuest.name}
      </h2>

      <div
        className={s.desc}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: data.datoCmsSpecialGuest.descriptionNode.childrenMarkdownRemark.html,
        }}
      />
    </div>
    <div className={s.heading}>
      <h2>
        Coordinate
      </h2>
      <div>コーディネート</div>
    </div>
    <ProductListing products={data.shopifyCollection.products} />
  </Layout>
);

export default ProfilePage;

export const query = graphql`
    query ($collection: String!, $instagram: String!) {
    shopifyCollection(handle: {eq: $collection }) {
        products {
          ...ProductCard
        }
      }
    datoCmsSpecialGuest (instagram: {eq: $instagram}) {
      name
      descriptionNode {
        childrenMarkdownRemark {
            html
          }
      }
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
