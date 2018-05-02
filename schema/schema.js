const graphql = require('graphql')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt, 
    GraphQLSchema,
    GraphQLList,
    GraphQLID } = graphql

 const books = [
     { name: 'Clean Code', id: '1', authorId: '2'},
     { name: 'Nodejs Parther Design ', id: '4', authorId: '2'},
     { name: 'Programing JavaScript Application', id: '2', authorId: '1'},
     { name: 'Nodejs, The right way', id: '3', authorId: '3'}
 ]

 const authors = [
    { name: 'Jhon Steve', age: 39, id: '1'},
    { name: 'Michael Dommie', age: 43, id: '2'},
    { name: 'Daniel Rich', age: 49, id: '3'}
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        gerne: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve: ({ id }, args) => {
                return books.filter(book => book.authorId === id )
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args) => {
                return books.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args ) => {
                return authors.find(author => author.id = args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})