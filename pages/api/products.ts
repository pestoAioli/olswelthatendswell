import { StorefrontClient } from "@shopify/shopify-api/lib/clients/graphql/storefront_client";

// Load the access token as per instructions above
const storefrontAccessToken = "731d345d8a7b419adbf9789b27311a7b";
// Shop from which we're fetching data
const shop = "olswelthatendswell.myshopify.com";

// StorefrontClient takes in the shop url and the Storefront Access Token for that shop.
const storefrontClient = new StorefrontClient({
  domain: shop,
  storefrontAccessToken,
});

// Use client.query and pass your query as `data`
const products = await storefrontClient.query({
  data: `{
    products (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`,
});
