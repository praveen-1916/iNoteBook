const connectToMongo = require('./databse');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth.js'));
app.use('/notes', require('./routes/notes.js'));

// app.get('/login', (req, res) => {
//     res.send('Hello Login World!')
// })145236
// app.get('/signup', (req, res) => {
//     res.send('Hello signup World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})