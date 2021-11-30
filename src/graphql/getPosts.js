import {gql} from '@apollo/client'

export const GET_POSTS = gql`
    query getAllPosts{
        getAllPosts{
            id
            title
            description
            image
            timestamp
            postedby
        }
    }
`;


// get blog by user
export const GET_BLOG_BY_ID = gql`
    query GetBlogById($id: ID!){   
        getPostById(id: $id){
            id,
            title,
            description,
            image,
            timestamp,
            postedby
        }
    }
`;

