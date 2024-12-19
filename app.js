var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs= require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const {MongoClient}=require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017',{monitorCommands:true});
const db= client.db("myDB");


const session= require('express-session');

app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //next(createError(404));
//});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 // res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
//  res.render('error');
//});

app.listen(3000);


app.get('/',function(req,res){
  res.render('login', {message:""})
});


app.get('/login', (req, res) => {
  const message = req.query.message ;
  res.render('login', { message });
});

app.get('/registration', (req, res) => {
 
  const message = req.query.message ;
  res.render('registration', { message });
});


app.post('/login', async(req,res)=>{
  var u= req.body.username;
  var p = req.body.password;
  const check = await db.collection('myCollection').findOne({ username: u });
  if(!u ||!p){
    return res.redirect('/login?message=All fields are required.');
  }
  if (check){
    if (check.password === p) {
      req.session.username = u;
      res.redirect('/home');
    }
    else{
      //return res.status(400).send('<h3 style="color: red;">Invalid password.</h3>');
      return res.redirect('/login?message=Invalid password.');
    }  
  }
  else{
    return res.redirect('/login?message=Invalid username.');
    //return res.status(400).send('<h3 style="color: red;">Invalid username.</h3>');
  }
});



app.post('/register', async(req,res)=> {
  var u= req.body.username;
  var p = req.body.password;
  var ob = {
    username: u,
    password: p,
    dest: [] ,
    alldestination:[
      { name: 'Inca Trail Machu Picchu' },
      { name: 'Annapurna Circuit' },
      { name: 'Paris' },
      { name: 'Rome' },
      { name: 'Bali Island' },
      { name: 'Santorini Island' }
    ],
    searchres:[]
  };

  if (!u || !p) {
    
    return res.redirect('/registration?message=All fields are required.');
  }
  const result = await db.collection('myCollection').findOne({ username: u });
  if (result){
     //return res.status(400).send('<h3 style="color: red;">User already exists! Try a different username.</h3>');
     return res.redirect('/registration?message=User already exists! Try a different username');
  }
  else{
    db.collection('myCollection').insertOne(ob);
    return res.redirect('/login?message=Registration successful');
  }
});


// app.get('/login', (req, res) => {
//   const message = req.query.message; 
//   res.render('login', { message });
// });


app.get('/home',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
  res.render('home')

  }
});


app.get('/inca',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message; 
    res.render('inca', { message });
  }

});

app.get('/annapurna', (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message ; 
    res.render('annapurna', { message }); 
  }
 
 
});



app.get('/paris',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message; 
    res.render('paris', { message });
   
  }
 
});

app.get('/rome',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message; 
    res.render('rome', { message });  
  }
 
});

app.get('/bali',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message; 
    res.render('bali', { message });
    
  }
 
});


app.get('/santorini',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    const message = req.query.message; 
    res.render('santorini', { message }); 
  }
});

app.get('/hiking', function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  else{
    res.render('hiking');
  }
 
});

app.get('/cities',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('cities')
});

app.get('/islands',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('islands')
});

//
//homepost


app.post('/hiking', function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('hiking')
});

app.post('/cities',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('cities')
});

app.post('/islands',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('islands')
});

app.post('/inca',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('inca', {message:""})
});

app.post('/annapurna',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('annapurna', {message:""})
});


app.post('/paris',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('paris', {message:""})
});

app.post('/rome',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('rome', {message:""})
});

app.post('/bali',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('bali', {message:""})
});


app.post('/santorini',function(req,res){
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  res.render('santorini', {message:""})
});




app.post('/wanttogo',async(req,res)=>{
  const username = req.session.username;
  const dest = req.query.dest
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  const user = await db.collection('myCollection').findOne({ username: username });
 // console.log(user)
  const destinations = user.dest;
  if (destinations.includes(dest)){
    //return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
    // return res.redirect(dest+"?message=Already in your want to go list");
   // return res.redirect(`${encodeURIComponent(dest)}?message=${encodeURIComponent('Already in your want to go list')}`);
   return res.redirect(dest+"?message=Already in your want to go list")
  }
  else{
   db.collection('myCollection').updateOne(
      { username: username }, 
      { $push: { dest } } 
    );
  }
  res.redirect(dest+"?message=Successful")
});



app.get('/wanttogo',async(req,res)=>{
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  const user = await db.collection('myCollection').findOne({ username: username });
  const destinations = user.dest;
  res.render('wanttogo', { destinations });
});



//


app.post('/search', async (req, res) => {
  const searchTerm = req.body.Search.trim().toLowerCase(); 
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }
  const user = await db.collection('myCollection').findOne({ username: username });
  const matchedDestinations = user.alldestination.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm)
    );
  if (matchedDestinations.length === 0 || !searchTerm){
    db.collection('myCollection').updateOne(
      { username: username },
      { $set: { searchres: [] } }
      );
    return res.redirect('/searchresults?message=Destination not Found');
  }
 else{
   db.collection('myCollection').updateOne(
   { username: username },
   { $set: { searchres: matchedDestinations } }
   );
  return res.redirect('/searchresults');
  
    }  
  
   
});

app.get('/searchresults', async (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login?message=Please log in first.');
  }

  const user = await db.collection('myCollection').findOne({ username: username });
  const { message, searchres } = user;

  res.render('searchresults', { message, searchres });
});





// //yomna
// app.post('/search', async (req, res) => {
//   const searchTerm = req.body.Search;  // Capture the search term from the form
//   const searchQuery = searchTerm.toLowerCase();  // Convert search term to lowercase to make it case-insensitive
//   const username= req.session.username;
//  // try {
//   const results = await db.collection('myCollection').find({
//     alldestination: {
//       $elemMatch: {
//         name: { $regex: searchQuery, $options: 'i' } 
//       }
//     }
//   }).toArray();

//     if (results.length === 0) {
//       //return res.render('searchresults', { message: 'No destinations found matching your search' });
//       return res.redirect(searchresults+"?message=No destinations found matching your search")
//     }
//     else{
//       const matchedDestination = results[0].alldestination.find(searchres =>
//         new RegExp(searchQuery, 'i').test(searchres.name)
//       );
//       const result = await db.collection('myCollection').updateOne(
//         {username:username },
//         { $set: { searchres: [] } } 
//     );

//       await db.collection('myCollection').updateOne(
//         { username: username },
//         { $push: { searchres: matchedDestination } } 
//       );
//       // const matchedDestination = results[0].alldestination.find(searchres =>
//       //   new RegExp(searchQuery, 'i').test(searchres.name)
//       // );
//       // db.collection('myCollection').updateOne(
//       //   { username: username }, 
//       //   { $push: { searchres } } 
//       // );
//       return res.redirect(searchresults+"?message=''")
//     }
   
//   // } catch (error) {
//   //   console.error('Error during search:', error);
//   //  // res.status(500).send('Server error');
//   // }
// });

// app.get('/searchresults',async(req,res)=>{
//   const username = req.session.username;
//   if (!username) {
//     return res.redirect('/login?message=Please log in first.');
//   }
//   const message = req.query.message;
//   const results= username.searchres;
//   //const user = await db.collection('myCollection').findOne({ username: username });
//   res.render('searchresult', {message,results});
//  // res.render('searchresult', { result }, message);
// });







// app.post('/wanttogoann',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const annapurna = "Annapurna";
//   if (destinations.includes(annapurna)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: annapurna } } 
//     );
  
//   }
//   res.render('annapurna');
// });


// app.post('/wanttogobali',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const bali = "Bali";
//   if (destinations.includes(bali)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: bali } } 
//     );
  
//   }
//   res.render('bali');
// });



// app.post('/wanttogoinca',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const inca = "Inca";
//   if (destinations.includes(inca)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: inca } } 
//     );
  
//   }
//   res.render('inca');
// });

// app.post('/wanttogoparis',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const paris = "Paris";
//   if (destinations.includes(paris)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: paris } } 
//     );
  
//   }
//   res.render('paris');
// });


// app.post('/wanttogorome',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const rome = "Rome";
//   if (destinations.includes(rome)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: rome } } 
//     );
  
//   }
//   res.render('rome');
// });


// app.post('/wanttogosan',async(req,res)=>{
//   const username = req.session.username;
//   const user = await db.collection('myCollection').findOne({ username: username });
//   const destinations = user.dest;
//   const santorini = "Santorini";
//   if (destinations.includes(santorini)){
//     return res.status(400).send('<h3 style="color: red;">Already in your want to go list.</h3>');
//   }
//   else{
//    db.collection('myCollection').updateOne(
//       { username: username }, 
//       { $push: { dest: santorini } } 
//     );
  
//   }
//   res.render('santorini');
// });