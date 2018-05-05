import { gql } from 'apollo-boost'

const getAuthorQuey = gql`
    {
        authors{
            id
            name
            age
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId:  $authorId) {
            id
            name
            genre
        }
    }
`


const getBookQuery = gql`
    query {
        books{
            id
           name
           genre
         }
    }
`

export  {
    getAuthorQuey,
    getBookQuery,
    addBookMutation
}