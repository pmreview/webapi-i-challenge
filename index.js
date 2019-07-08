const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server Alive')
});

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "The user information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    db
    .findById(userID)
    .then(user => {
        if(user){
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const body = req.body
    db
    .insert(body)
    .then(user => {
        if(body.name && body.bio){
            res.status(201).json(user)
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database." })
    })
})

server.put('/api/users/:id', (req, res) => {
    const userID = req.params.id
    const body = req.body
    db
    .update(userID, body)
    .then(user => {
        if(user && body.name && body.bio){
            res.status(200).json(body)
        } else if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(500).json({ error: "The user information could not be modified." })
        }
    })
})

server.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id
    db
    .remove(userID)
    .then(user => {
        if(user) {
            res.status(200).json({ message: "Deleted user." })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
    })
})

server.listen(4000, () => {
    console.log('\n*** Running on port 4k ***\n')
})