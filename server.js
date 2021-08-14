const express = require('express')
const cors = require('cors');
const routes = require('./src/routes/api')
require('dotenv').config();
require('./src/db/db.connect')

const app = express()
const port = process.env.MONGO_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not founde.' });
});

// Start the server
app.listen(port, () => {
  console.log('')
  console.log('================================================================')
  console.log(`   Serveur démarré sur le port ${port}. Aller à http://localhost:${port}`);
  console.log('================================================================')
});
