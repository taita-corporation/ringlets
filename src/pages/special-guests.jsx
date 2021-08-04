import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import * as s from './special-guests.module.less';

const SpecialGuestsPage = ({ data }) => (
  <Layout>
    <div className="-mt-20">
      <GatsbyImage
        image={data.datoCmsSpecialGuestPage.headerImage.gatsbyImageData}
        className="opacity-80"
      />
      <div className={s.wrapper}>
        <h1>スペシャルゲスト</h1>

        {data.allDatoCmsSpecialGuest.edges.map(({ node }) => (
          <div key={node.id} className="grid grid-cols-2 my-8">
            <Link to={`/special-guests/${node.instagram}`}>
              <GatsbyImage image={node.thumbImage.gatsbyImageData} className="rounded-md" />
              <div className="font-semibold text-xl">{node.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export const query = graphql`
    query {
      datoCmsSpecialGuestPage {
        headerImage {
          gatsbyImageData(aspectRatio: 3)
        }
      }
     allDatoCmsSpecialGuest {
        edges {
          node {
            id
            thumbImage {
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
