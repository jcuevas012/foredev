import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { getBooksQuery } from '../queries'
import { DIRECTIVE } from 'graphql/language/kinds';
import BookDetails from './BookDetails';


export class BookList extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selected: null         
      }
    }
    

    getBookList = (books ) =>{
        return (
            <ul>
                {books && books.length && books.map(book => (<li onClick={(e) => this.setState({ selected: book.id})} key={book.id}>{ book.name}</li>))}
            </ul>
        )
    }
    
  render() {
    const { books, loading, error } = this.props.data

    if (error) return <h1>Ops!, something went wrong</h1>
    if (loading && !books) return <h1>Loading ....</h1>

    return (
        <div id="book-list">
            {this.getBookList(books)}
            <BookDetails bookId={this.state.selected}/>
        </div>
    )
  }

}


export default graphql(getBooksQuery)(BookList)




