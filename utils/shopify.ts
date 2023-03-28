export async function storefront(query: any, variables = {}) {
  if (!process.env.TOKEN) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  const res = await fetch(
    "https://olswelthatendswell.myshopify.com/admin/api/2023-01/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  return res.json();
}
