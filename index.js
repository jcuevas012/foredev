const express = require('express')
const graphqlHTTP = require('express-graphql')
const chalk = require('chalk')
const schema = require('./schema/schema')

const app = express()
const port = process.env.PORT || 3000


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, (req, res) => {
    console.log(`${chalk.green('[started]')} app started on port ${port}`)
})