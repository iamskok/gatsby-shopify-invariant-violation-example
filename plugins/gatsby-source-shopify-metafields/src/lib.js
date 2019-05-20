import { GraphQLClient } from 'graphql-request'

async function main() {
	// https://{apikey}:{password}@{hostname}/admin/api/{version}/{resource}.json
  const endpoint = `https://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX@shop-name.myshopify.com/admin/api/2019-07/graphql.json`

  const graphQLClient = new GraphQLClient(endpoint)

  const updateMetafieldStorefrontVisibility = `
    mutation($input: MetafieldStorefrontVisibilityInput!) {
      metafieldStorefrontVisibilityCreate(input: $input) {
        metafieldStorefrontVisibility {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const updateMeta = await graphQLClient.request(updateMetafieldStorefrontVisibility, {
    "input": {
      "namespace": "global",
      "key": "shipping_time",
      "ownerType": "PRODUCT"
    }
  })
  // On first query - updateMeta: {"metafieldStorefrontVisibilityCreate":{"metafieldStorefrontVisibility":{"id":"gid://shopify/MetafieldStorefrontVisibility/98355"},"userErrors":[]}}
  // When metafieldStorefrontVisibility was already added - updateMeta: {"metafieldStorefrontVisibilityCreate":{"metafieldStorefrontVisibility":null,"userErrors":[{"field":["input","key"],"message":"Key must be unique within this namespace on this resource"}]}}
  console.log('updateMeta:', JSON.stringify(updateMeta));
}

main().catch(error => console.error(error))
