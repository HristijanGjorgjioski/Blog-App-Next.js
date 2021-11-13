import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                id
                name
                biography
                picture {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              coverImage {
                coverImagePost {
                  coverImage {
                    url
                  }
                }
              }
              categories
            }
          }
        }
      }
    `      

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        coverImage {
          coverImagePost {
            coverImage {
              url
            }
          }
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { cetegories_some: { slug_in: $categories }} }
        last: 3
      ) {
        title
        coverImage {
          coverImagePost {
            coverImage {
              url
            }
          }
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

// export const getCategories = async () => {
//   const query = gql`
//     query GetCategories {
//       edges {
//         node {
//           categories
//         }
//       }
//     }
//   `

//   const result = await request(graphqlAPI, query);

//   return result.categories;
// }
