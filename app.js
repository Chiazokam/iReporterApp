const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

/* Initialize users array */
const usersArray = [];

/* Create the user class */
class Users {
  constructor(userId, firstname, lastname, othername, email, phone, username, registered, isAdmin) {
    this.userId = userId;
    this.firstname = firstname;
    this.othername = othername;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.registered = registered;
    this.isAdmin = isAdmin;
  }
}

/* HomePage Endpoint */
app.get('/api/v1', (req, res) => res.status(200).send({ data: [] }));

/* About Page Endpoint */
app.get('/api/v1/about', (req, res) => res.status(200).send({ data: [] }));

/* SignUp Page Endpoint */
app.get('/api/v1/users/new', (req, res) => res.status(200).send({ data: [] }));

/* Create a user */
app.post('/api/v1/users', (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.othernam
     || !req.body.email || !req.body.phone || !req.body.username || !req.body.password) {
    return res.status(400).send({ error: 'Incomplete data' });
  }
  const user = new Users(uuidv4(), req.body.firstname, req.body.lastname,
    req.body.othername, req.body.email, req.body.phone, req.body.username, req.body.password,
    req.body.registered, req.body.isAdmin);
  usersArray.push(user);
  return res.status(200).send({ data: [user] });
});

module.exports = app;
/* ************************************************************** */
const port = process.env.PORT || 3000;
app.listen(port);
