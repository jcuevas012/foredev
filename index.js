const express = require('express')
const graphqlHTTP = require('express-graphql')
const chalk = require('chalk')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { db } = require('./config')

const app = express()
const port = process.env.PORT || 3000

mongoose.Promise = global.Promise

mongoose.connection.once('open', () => {
    console.log('app connected')
})

mongoose.connect(`mongodb://${db.username}:${db.passport}@ds263619.mlab.com:63619/${db.name}`)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, (req, res) => {
    console.log(`${chalk.green('[started]')} app started on port ${port}`)
})