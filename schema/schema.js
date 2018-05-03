const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')


const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt, 
    GraphQLSchema,
    GraphQLList,
    GraphQLID } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return Author.findById(parent.authorId, (err, data) => {
                    return data
                })
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
                return Book.find({ authorId: id}, (err, data) => {
                    return data
                })
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
                return Book.findById(args.id, (err, result) => {
                    if (err) {
                        throw new Error(err)
                    }
                    return result
                })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args ) => {
                return Author.findById(args.id, (err, result) => {
                    if (err) {
                        throw new Error(err)
                    }

                    return result

                })
            }
        },

        books: {
            type: GraphQLList(BookType),
            resolve: (parent, args) => {
                return Book.find({}, (err, data) => {
                    return data
                })
            }
        },

        authors: {
            type: GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return Author.find({}, (err, data) => {
                    return data
                })
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve: (parent, args) => {

                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                return author.save()
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve: (parent, { name, genre, authorId }) => {
                let book = new Book({
                    name,
                    genre,
                    authorId
                })

                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})