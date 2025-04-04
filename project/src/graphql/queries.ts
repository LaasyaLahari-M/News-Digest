import { gql } from '@apollo/client';

export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences {
    user_preferences {
      id
      categories
      saved_articles
      read_articles
    }
  }
`;

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences(
    $id: String!
    $categories: [String!]
    $savedArticles: [Int!]
    $readArticles: [Int!]
  ) {
    update_user_preferences(
      where: { id: { _eq: $id } }
      _set: {
        categories: $categories
        saved_articles: $savedArticles
        read_articles: $readArticles
      }
    ) {
      affected_rows
    }
  }
`;