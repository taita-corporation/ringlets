const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const specialGuestResult = await graphql(`
      query {
        allDatoCmsSpecialGuest {
            edges {
                node {
                  instagram
                  collection
                }
              }
            }
      }
    `);

  const specialGuestsList = specialGuestResult.data.allDatoCmsSpecialGuest.edges;

  specialGuestsList.forEach(({ node }) => {
    createPage({
      path: `/special-guests/${node.instagram}`,
      component: path.resolve('./src/templates/special-guest-profile.jsx'),
      context: {
        instagram: node.instagram,
        collection: node.collection,
      },
    });
  });
};
