import express, { request, response } from 'express';
import Routes from './routes'
const app = express();

app.use(express.json())
app.use(Routes)

app.listen(3333)