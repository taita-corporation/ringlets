import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';

const SpecialGuestsPage = ({ data }) => (
  <Layout>
    {data.allDatoCmsSpecialGuest.edges.map(({ node }) => (
      <div>
        {node.name}
      </div>
    ))}
  </Layout>
);

export const query = graphql`
    query {
     allDatoCmsSpecialGuest {
        edges {
          node {
            profileImage {
              gatsbyImageData
            }
            name
            instagram
            collection
          }
        }
      }
    }
`;

export default SpecialGuestsPage;
