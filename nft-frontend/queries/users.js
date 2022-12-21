import gql from 'graphql-tag';

const GET_USER = gql`
  query user($address: String!) {
    user(address: $address) {
      id
      address
      name
    }
  }
`;

const GET_USERS = gql`
    query users {
        users {
        id,
        address,
        name
        }
    }
`;


const ADD_USER = gql`
    mutation addUser($address: String!, $name: String = "Unnamed") {
        addUser(address: $address, name: $name) {
        id
        address
        name
        }
    }
`;

export { GET_USER, GET_USERS, ADD_USER };