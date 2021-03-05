import express, { Request, Response } from 'express';
import { IMeal } from './models/IMeal';
import { IUser } from './models/IUser';
const cors = require('cors');
const dotenv = require('dotenv');
const DbService = require('./dbService');

const app = express();

// loads .env config into process.env
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req: Request, res: Response) => {
    res.send('bran plan')
});

app.get('/login', (req: Request, res: Response) => {
  const db = DbService.getDbServiceInstance();
  const fromDb = db.getUsers();

  fromDb.then((data: IUser) => {
    console.log('data??!!?', data)

    return res.json({data});
  }).catch((err: Error) => console.log(err));

});

app.get('/meals', (req: Request, res: Response) => {
  const db = DbService.getDbServiceInstance();
  const fromDb = db.getMeals();

  fromDb.then((data: IMeal) => {
    console.log('data??!!?', data)

    return res.json({data});
  }).catch((err: Error) => console.log(err));

});

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});