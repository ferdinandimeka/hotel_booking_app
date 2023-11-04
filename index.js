const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./route/auth.routes');
const userRoute = require('./route/user.routes');
const hotelRoute = require('./route/hotel.routes');
const roomRoute = require('./route/room.routes');
const bookingRoute = require('./route/book.routes');

const app = express();
dotenv.config();

// Security HTTP headers
app.use(helmet());

// date sanitizer against NoSQL query injection
app.use(mongoSanitizer());

// data sanitizer against site script XSS
app.use(xss());

// prevent parameter pollution
//app.use(hpp())

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

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
app.use(express.json({ limit: '15kb' }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/room', roomRoute);
app.use('/api/v1/booking', bookingRoute);

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
