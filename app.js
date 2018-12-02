const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

/* Initialize users array */
const users = [];

// Using a class kept on instantiating a new array

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => res.status(200).send({ data: [] }));

/* About Page Endpoint */
app.get('/api/v1/about', (req, res) => res.status(200).send({ data: [] }));

/* SignUp Page Endpoint */
app.get('/api/v1/users/new', (req, res) => {
  res.status(200).send({ data: [] });
});

/* Create a user */
app.post('/api/v1/users', (req, res) => {
  if (!req.body.fname || !req.body.lname || !req.body.othername
     || !req.body.email || !req.body.phone || !req.body.username || !req.body.password) {
    return res.status(400).send({ error: 'Incomplete data' });
  }
  const user = {
    userId: uuidv4(),
    fname: req.body.fname,
    lname: req.body.lname,
    othername: req.body.othername,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password,
    registered: true,
    isAdmin: req.body.admin,
  };

  users.push(user);
  console.log(users);
  return res.status(200).send({ data: [user] });
});

/* Sign In Page Endpoint */
app.get('/api/v1/signin', (req, res) => res.status(200).send({ data: [] }));

/* Authenticate credentials */
app.post('/api/v1/signin', (req, res) => {
  console.log(users);
  const emailExist = users.findIndex(user => user.email === req.body.email);
  const passwordExist = users.findIndex(user => user.password === req.body.password);
  if (emailExist !== -1 && passwordExist !== -1){
    res.status(200).send({data: []});
  } else {
    res.status(401).send({error: 'Unauthorized access. Please register first'});
  }

})
module.exports = app;
/* ************************************************************** */
const port = process.env.PORT || 3000;
app.listen(port);
