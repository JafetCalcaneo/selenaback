import express, { Request, Response } from 'express';
import 'dotenv/config';
import user from './router/user.router';
import {User} from './models/user.model';

const app = express();

// Middlewares
app.use(express.text());
app.use(express.json());

//Routes
app.use('/user', user);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(Object.keys(User));
console.log(User.rawAttributes.name.allowNull);
// console.log(User.);

export default app;