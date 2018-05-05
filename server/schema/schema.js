const graphql = require('graphql')
const { Author, Book } = require('../models')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt, 
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: async ({ authorId }, args) => {
                const data = await Author.findById(authorId)
                return data
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
            resolve: async ({ id }, args) => {
                let data = await Book.find({ authorId: id})
                return data
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve: async (parent, args) => {
                const data = Book.findById(args.id)
                return data
            }
        },
        
        author: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve: async (parent, args ) => {
                const data = await Author.findById(args.id)
                return data
            }
        },

        books: {
            type: GraphQLList(BookType),
            resolve: async (parent, args) => {
               const data = await Book.find()
               return data
            }
        },

        authors: {
            type: GraphQLList(AuthorType),
            resolve: async (parent, args) => {
                const data = await Author.find()
                return data
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
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