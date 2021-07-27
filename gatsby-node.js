const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
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
    `);
  const specialGuestsList = result.data.allDatoCmsSpecialGuest.edges;

  specialGuestsList.forEach(({ node }) => {
    createPage({
      path: `/special-guests/${node.instagram}`,
      component: path.resolve('./src/templates/special-guest-profile.jsx'),
      context: {
        name: node.name,
        profileImage: node.profileImage,
        instagram: node.instagram,
        collection: node.collection,
      },
    });
  });
};
