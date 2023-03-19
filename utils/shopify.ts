export async function storefront(query: any, variables = {}) {
  const res = await fetch(
    "https://olswelthatendswell.myshopify.com/admin/api/2023-01/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  return res.json();
}
