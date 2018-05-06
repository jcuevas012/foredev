import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorQuey, addBookMutation, getBooksQuery } from '../queries'



class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorId: 0,
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addBookMutation({
            variables: { ...this.state },
            refetchQueries: [ { query: getBooksQuery }]
        })
        this.setState({ name: '', genre: '', authorId: 0})
    }
    render() {
        const { authors, loading } = this.props.getAuthorQuey

        if (loading) return <h1>Loading ...</h1>
        return (
            <form id="add-book" onSubmit={this.onSubmit}>
                <div className="field">
                    <label>Book Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="id"
                    value={this.state.name}
                    onChange={({ target}) => this.setState({ name:  target.value})}
                    />
                </div>

                <div className="field">
                    <label>Genre</label>
                    <input 
                        type="text"
                        name="genre" 
                        id="genre"
                        value={this.state.genre}
                        onChange={({ target}) => this.setState({ genre:  target.value})}
                        />
                </div>

                <div className="field">
                    <label>Author</label>
                    <select 
                        name="author"
                        onChange={({ target}) => this.setState({ authorId:  target.value})} >
                        <option> --- Select --- </option>
                        {authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>)}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorQuey, { name: 'getAuthorQuey'}),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)