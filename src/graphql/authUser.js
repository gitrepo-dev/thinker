import {gql} from '@apollo/client'

//  login user
export const LOGIN_USER = gql`
    query LoginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            name,
            email,
            token,
            response {
                status,
                message
            }    
        }
    }
`;

//  create user
export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!){        
        createUser(name: $name, email: $email, password: $password){
            name,
            email,
            token,
            response {
                status,
                message
            }           
        }
    }
`;