export const postToShopify = async ({ query, variables = {} }) => {
  try {
    if (process.env.SHOPIFY_API_ENDPOINT) {
      const result = await fetch("olswelthatendswell.myshopify.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "731d345d8a7b419adbf9789b27311a7b",
        },
        body: JSON.stringify({ query, variables }),
      }).then((res) => res.json());

      if (result.errors) {
        console.log({ errors: result.errors });
      } else if (!result || !result.data) {
        console.log({ result });
        return "No results found.";
      }
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};
