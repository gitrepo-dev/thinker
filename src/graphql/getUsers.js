import {gql} from '@apollo/client'

export const GET_USERS = gql`
    query getAllUsers{
        getAllUsers{
            id
            name
            email
        }
    }
`;
