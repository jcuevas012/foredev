import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './App.css';
import BookList from './components/BookList';
const uri = 'http://localhost:8080/graphql'

const client = new ApolloClient({
  uri 
})

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <div className="main">
          <h1>React app </h1>
          <BookList/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
