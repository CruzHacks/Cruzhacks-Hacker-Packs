const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();

// Setup express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get env variables
const port = process.env.PORT || 3000;
const perPage = process.env.PAGE_SIZE || 10;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://mlh-localhost:uSI0Ir6tQg5qtj4Ao485wmlrCFDHmkMTqcrkhLuD9mRHkfj6NIkdB9Q0iZf5xXDzkmeWamyfmf89DW2a1fGC4g==@mlh-localhost.documents.azure.com:10255/mlh-localhost?ssl=true&replicaSet=globaldb';
const defaultPassword = process.env.HACKERLOG_PASSWORD || 'P@ssw0rd!';

// Create post schema
const updateSchema = mongoose.Schema({
  name: { type: String, required: true },
  update: { type: String, required: true }
}, {
  timestamps: true
});
const Update = mongoose.model('update', updateSchema);

// Routes
app.get('/', (req, res) => {
  const page = Math.max(0, req.query.page);
  const wrongPassword = req.query.wrongPassword;
  Update.find().limit(perPage).skip(perPage * page).sort({ createdAt: 'desc' }).exec().then((updates) => {
    Update.count().exec().then((count) => {
      const pages = count / perPage;
      res.render('index', { title: 'HackerLog', updates, wrongPassword, page, pages, moment });
    }).catch(() => {
      res.redirect('/error');
    });
  }).catch(() => {
    res.redirect('/error');
  });
});

// Posting update
app.post('/update', (req, res) => {
  const { body: { name, update, password } } = req;
  if (!name || !update) {
    res.redirect('/error');
  } else if (password === defaultPassword) {
    const userUpdate = new Update({ name, update });
    userUpdate.save().then(() => {
      res.redirect("/");
    }).catch(() => {
      res.redirect("/error");
    });
  } else {
    res.redirect("/?wrongPassword=true");
  }
});

// Some debug messages
console.log("Starting app..");
console.log("Waiting for connection to MongoDB");

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  console.log("Connected to MongoDB!");
  console.log("Starting webserver..");
  app.listen(port, '0.0.0.0', () => console.log(`HackerLog app listening on port ${port}!`));
}).catch(() => {
  console.log("Could not connect to MongoDB server! Shutting down...");
  process.exit(1);
});
