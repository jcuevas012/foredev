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
    query book($id: ID!) {
        book(id: $id){
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    id
                    name
                    genre
                }
            }
        }
    }
`

const getBooksQuery = gql`
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
    getBooksQuery,
    getBookQuery,
    addBookMutation
}