import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';
import Button from '../components/button';
import ProductListing from '../components/product-listing';
import * as s from './index.module.less';

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
    datoCmsTopPage { 
      heroImage {
        alt
        gatsbyImageData
      }
      introductionNode {
        childMarkdownRemark {
          html
        }
      }
      closetImage {
        gatsbyImageData
      }
      closetIntroNode {
        childMarkdownRemark {
          html
        }
      }
      peakImage {
        gatsbyImageData
      }
    }
    allDatoCmsSpecialGuest {
      nodes {
        name
        id
        thumbImage {
          gatsbyImageData
        }
      }
    }
  }
`;

export default function IndexPage({ data }) {
  return (
    <Layout>
      <GatsbyImage image={data.datoCmsTopPage.heroImage.gatsbyImageData} />
      <div className={s.wrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: data.datoCmsTopPage.introductionNode.childMarkdownRemark.html,
          }}
          className={s.introduction}
        />
        <section>
          <GatsbyImage image={data.datoCmsTopPage.closetImage.gatsbyImageData} className={s.closetImage} />
          <div
            dangerouslySetInnerHTML={{
              __html: data.datoCmsTopPage.closetIntroNode.childMarkdownRemark.html,
            }}
            className={s.introduction}
          />
          <Button to="/closet-items">Learn More</Button>
        </section>
      </div>
      <GatsbyImage image={data.datoCmsTopPage.peakImage.gatsbyImageData} />
      <div className={s.wrapper}>
        <section>
          <div className={s.heading}>
            <h2>Special Guests</h2>
            <div>スペシャルゲスト</div>
          </div>
          {data.allDatoCmsSpecialGuest.nodes.map(({ thumbImage, id }) => (
            <GatsbyImage id={id} image={thumbImage.gatsbyImageData} />
          ))}
        </section>
        <section>
          <ProductListing products={data?.shopifyCollection?.products} />
        </section>
      </div>
    </Layout>
  );
}
