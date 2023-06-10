const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');
const cookieParser = require('cookie-parser');
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//start server-serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/speciesList', (req, res) => {
  console.log('species list requested!')
  res.sendFile(path.join(__dirname, './speciesList.json'));
});

// route for API handling
app.use('/api', apiRouter);

//local error handler
app.use((req, res) => {
  res.status(404).send('error: 404');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', errorObj.log);
  const errorStatus = err.status || 500;
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
