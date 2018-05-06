import React, { Component } from 'react'
import { getBookQuery } from '../queries'
import { graphql } from 'react-apollo'

class BookDetails extends Component {

    render() {
        const { book } = this.props.data

        return (
            <div id="book-details">
                { book ? (<div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books writen by the author</p>
                    <ul className="other-books">
                        {book.author.books.map(book => (<li key={book.id}>{book.name}</li>))}
                    </ul>
                </div>) : 
                (<h1> Not book selected </h1>)}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
