import gql from 'graphql-tag';

const GET_USER = gql`
  query user($address: String!) {
    user(address: $address) {
      address
      name
      backgroundUrl
      avatarUrl
    }
  }
`;

const GET_USERS = gql`
    query users {
        users {
        address,
        name,
        backgroundUrl,
        avatarUrl
        }
    }
`;

const CREATE_USER = gql`
  mutation CreateUser($address: String!, $name: String, $backgroundUrl: String, $avatarUrl: String) {
    createUser(
      address: $address,
      name: $name,
      backgroundUrl: $backgroundUrl,
      avatarUrl: $avatarUrl
    ) {
      address
      name
      backgroundUrl
      avatarUrl
    }
  }
`;

const ADD_BACKGROUND = gql`
  mutation updateImage($address: String!, $backgroundUrl: String) {
    updateImage(address: $address, backgroundUrl: $backgroundUrl) {
      backgroundUrl
    }
  }
`;

const ADD_AVATAR = gql`
  mutation UpdateImage($address: String!, $avatarUrl: String) {
    updateImage(address: $address, avatarUrl: $avatarUrl) {
      avatarUrl
    }
  }
`;

export { GET_USER, GET_USERS, CREATE_USER, ADD_BACKGROUND, ADD_AVATAR };