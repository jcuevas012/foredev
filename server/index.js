const express = require('express')
const graphqlHTTP = require('express-graphql')
const chalk = require('chalk')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const schema = require('./schema/schema')
const { db } = require('./config')

const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.static(path.join(__dirname, 'public')))

mongoose.Promise = global.Promise
mongoose.connection.once('open', () => {
    console.log('app connected')
})
mongoose.connect(`mongodb://${db.username}:${db.passport}@ds263619.mlab.com:63619/${db.name}`)


app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, (req, res) => {
    console.log(`${chalk.green('[started]')} app started on port ${port}`)
})