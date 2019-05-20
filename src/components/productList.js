import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

const ProductList = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allShopifyProduct {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `
  )

  console.log('ProductList Data:', data);

  return (
    <div>
      <h1>Product List</h1>
        {
          data.allShopifyProduct.edges.map(({node}) => ( 
            <ul key={node.id}>
              <li><b>id</b>: {node.id}</li>
              <li><b>title</b>: {node.title}</li>
              <li><b>handle</b>: {node.handle}</li>
              <li><b>meta</b>: {node.metafields ? JSON.stringify(node.metafields) : 'null'}</li>
            </ul>
          ))
        }
    </div>
  )
}

export default ProductList