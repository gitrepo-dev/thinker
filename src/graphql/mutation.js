import {gql} from '@apollo/client'



export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!, $image: String, $postedby: String!){
        createPost(title: $title, description: $description image: $image, postedby: $postedby){
            id,
            title,
            description,
            image,
            postedby,
            timestamp
        }
    }
`;