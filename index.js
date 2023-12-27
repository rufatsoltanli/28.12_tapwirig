import mongoose, { Schema } from "mongoose";
import express from "express";


const app = express()
const port = 3000
app.use(express.json())

const usersSchema = new Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
    isMarried: Boolean,
});

const userModel = mongoose.model('users', usersSchema);

app.post('/', async (req, res) => {
    try {
        const { username, email, password, age, isMarried } = req.body
        const newUser = new userModel({ username, email, password, age, isMarried })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/', async (req, res) => {
    try {
        const user = await userModel.find({})
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }

})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { username, email, password, age, isMarried } = req.body
        const user = await userModel.findByIdAndUpdate(id, { username, email, password, age, isMarried })
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    res.send(user)
})

mongoose.connect("mongodb+srv://rufatsoltanly:862450rr@cluster0.ckefgjq.mongodb.net/")
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err.message))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})