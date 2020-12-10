const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


// IMPORT ROUTES
const indexRouter = require('./routes/index');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
// const ordersRouteNew = require('./routes/orders');

// USE ROUTES
app.use('/', indexRouter);
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
// app.use('/api/orders/new', ordersRouteNew);

app.use((req,res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

// app.use(cors({
//   allowedHeaders: 'Content-type, Authorization, Origin, X-Requested-With, Accept',
//   origin: "*",
//   methods:['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
// }));



// app.use((req, res, next) =>{
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // res.header('Access-Control-Allow-Origin','*'),
//   // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ),
//   // res.header('Acess-Control-Allow-Headers', 'X-Requested-With, content-type'),
//   // res.header('Access-Control-Allow-Credentials', true)
//   next();

//   app.options('*', (req, res)=>{
//     res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    
//     res.send();
//   });
// });

// app.use(cors(
//   response.setHeader('Access-Control-Allow-Origin','*'),
//   response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ),
//   response.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With, content-type'),
//   response.setHeader('Access-Control-Allow-Credentials', true)
// ));

// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
