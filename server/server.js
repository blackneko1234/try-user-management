const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')
const User = require('./models/user');

app.use(express.json(), cors());

mongoose.connect("mongodb://nube:1234@banksss1.thddns.net:8844/test?authSource=admin", {
    useNewUrlParser: true,
})

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(5000, () => {
    console.log('Start server at port 5000.')
})

app.post('/register', async (req, res) => {
    try {
        const userData = req.body
        const user = new User(userData);
        await user.save()
        res.status(201).end();
    } catch (error) {
        console.log("Register Fail");
        res.status(500).end();
    }
})

app.post('/login', async (req, res) => {
    try {
        const data = req.body
        const user = await User.findOne({ username: data.username, password: data.password })
        res.json(user);
    } catch (error) {
        console.log("Error");
        res.status(500).end();
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select({ '_id': 0, 'name': 1, 'age': 1, 'birthdate': 1, 'address': 1, 'remark': 1 })
        res.json(user);
    } catch (error) {
        console.log("Error");
        res.json(null).end()
    }
})

app.get('/userRole/:id', async (req, res) => {
    try {
        const { id } = req.params
        const role = await User.findById(id).select({ '_id': 0, 'role': 1 })
        res.json(role);
    } catch (error) {
        console.log("Error");
        res.json(null).end()
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(200).end();
    } catch (error) {
        console.log("Error");
        res.status(500).end();
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndUpdate(id, req.body)
        res.status(200).end();
    } catch (error) {
        console.log("Error");
        res.status(500).end();
    }
})

app.get('/users', async (_, res) => {
    try {
        let user = await User.find({ 'role': 'user' }).select({ 'username': 0, 'password': 0, 'role': 0 })
        res.json(user);
        res.status(200).end();
    } catch (error) {
        console.log("Error");
        res.status(500).end();
    }
})