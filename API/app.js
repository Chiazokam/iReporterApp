const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.render('home.ejs');
})



/****************************************************************/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
