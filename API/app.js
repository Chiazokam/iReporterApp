const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

let users = [];

/*HomePage Endpoint */
app.get('/api/v1', function(req, res){
  res.render('home.ejs');
})

/*About Page Endpoint */
app.get('/api/v1/about', function(req, res){
  res.render('about.ejs');
})

/*SignUp Page Endpoint */
app.get('/api/v1/users/new', function(req, res){
  res.render('signup.ejs');
});

/*SignUp Post */
app.post('/api/v1/users', function(req, res){
  let user = {
    userId: users.length + 1,
    firstname: req.body.fname,
    lastname: req.body.lname,
    othername: req.body.othername,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    registered: true,
    isAdmin: req.body.admin
  }
if(!user.firstname || !user.lastname || !user.othername || !user.email || !user.phone || !user.username){
  res.json({
    status: "400",
    error: "No user data captured"
  })
} else {
  res.json({
    status: "201",
    data: [user]
  });
  users.push(user);
};
})

/****************************************************************/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
