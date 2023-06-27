const express = require('express')
const { PrismaClient } = require('@prisma/client')
var cors = require('cors')

const app = express()
const prisma = new PrismaClient()

app.use(express.json(), cors());

app.listen(5000, () => {
    console.log('Start server at port 5000.')
})

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.post('/register', async (req, res) => {
    /* try { */
    const userData = req.body
    const user = await prisma.user.create({ data: userData })
    console.log(user);
    res.json(user);
    res.status(201).end();

    /* } catch (error) {
        console.log("Error");
        res.status(500).end();
    } */
})

app.post('/login', async (req, res) => {
    try {
        const data = req.body
        const user = await user.findOne({ username: data.username, password: data.password })
        res.json(user);
    } catch (error) {
        console.log("Error");
        res.status(500).end();
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.json(user);
    } catch (error) {
        console.log("Error");
    }
})
