const connectToMongo = require('./databse');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//middleware
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth.js'));
app.use('/notes', require('./routes/notes.js'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})