import React from 'react';
import { graphql } from 'gatsby';

const SpecialGuestsPage = ({ data }) => (
  <div>special guests</div>
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
