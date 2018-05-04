import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const getBookQuery = gql`
    {
        books{
            id
            name
            genre
        }
    }
`

const BookList = (props) => {
    const { data } = props
    if (data.loading) {
        return (<h1> Loading ...</h1>)
    } else {
        return (
            <div >
                <ul id="book-list">
                    {data.books.map((book) => <li key={book.id}>{book.name}</li>)}
                </ul>
            </div>
        )
    }
}



export default graphql(getBookQuery)(BookList)