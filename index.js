import express from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from './routes/index.js';
import connectdb from './config/database.js';


const app = express()
app.use(cors())
app.use(express.json())
app.use(session({
    secret: 'melody hensley is my spirit animal',
    resave: true,
    saveUninitialized: true
  }));

app.use('/api', routes);

const PORT = process.env.PORT || 5000

connectdb()




app.listen(PORT, () => console.log(`AI server started on ${PORT}`))
