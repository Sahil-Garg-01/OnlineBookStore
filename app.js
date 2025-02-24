const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require("./routes/auth-routes")
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const checkauth=require("./middlewares/checkauth")
// const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// app.use(session({
//   secret:'key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // set to true if using https
// }));
// app.use(flash());


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkauth)
// app.use(methodOverride('_method'));
// app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Route registration
app.get('/',(req,res)=>{
  return res.render('layouts/main')
})



app.use('/', authRoutes);
app.use('/books', bookRoutes);
// app.use('/orders', orderRoutes);
// app.use('/cart', cartRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;