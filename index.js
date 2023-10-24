const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./route/auth.routes');
const userRoute = require('./route/user.routes');
const hotelRoute = require('./route/hotel.routes');
const roomRoute = require('./route/room.routes');

const app = express();
dotenv.config();

// config
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.PASSWORD
);

// database connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res) => {
  //console.log(res.connection)
  console.log('successfully connected to database')
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
  });

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/room', roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal server error';
  res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log( `Server is running on port ${process.env.PORT}`);
});
