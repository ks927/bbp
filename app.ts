const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// loads .env config into process.env
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbService = require('./dbService');

app.get('/', (req, res) => {
    res.send('bran plan')
});

app.get('/login', (req, res) => {
  const db = dbService.getDbServiceInstance();
  const toReturn = db.getUsers();
// console.log('toreturn RES', toReturn)
  toReturn.then(data => {
    console.log('data??!!?', data)

    return res.json({data: data});
  }).catch(err => console.log(err));

});

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});