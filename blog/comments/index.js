const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const app = express()

app.use(bodyParser.json())
const commentsByPostId = {}


app.get('/posts/:id/comments' ,  (req , res) => {
     res.send(commentsByPostId[req.params.id] || []) 
})

app.post('/posts/:id/comments',  (req , res) => {
     const commentId = randomBytes(4).toString('hex') // ID
     const { content } =  req.body // CONTENT

     const comments = commentsByPostId[req.params.id]  || [] // IF DONT HAVE COMMENT YET ==> [] else ==> COMMENT[ID]
     comments.push({id : commentId, content}) // push to Comment
     commentsByPostId[req.params.id] = comments // Comment by post id == comment id + content
     res.status(201).send(comments)
})

app.listen(4001 , ()=> {
     console.log('listen on port 4001')
}) 