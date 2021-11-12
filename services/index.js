import { graphql } from 'graphql'
import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
              author {
                id
                name
                biography
                picture {
                  url
                }
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query);

    return result.postConnection.edges;
}
