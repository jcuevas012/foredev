import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { getBookQuery } from '../queries'

function getBookList({ books }) {

    return (
        
        <ul>
            {books && books.map(book => (<li key={book.id}>{ book.name}</li>))}
        </ul>
    )
}

const BookList = (props) => 
     (<Query query={getBookQuery}>
        {({loading, error, data}) => {
            if (error) return <h1>Ops!, something went wrong</h1>
            if (loading && !data) return <h1>Loading ....</h1>
            
            return getBookList(data)
        }}
    </Query>)




export default BookList