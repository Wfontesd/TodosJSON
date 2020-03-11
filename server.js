'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const PORT = 3001;
const HOST = '0.0.0.0';

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'lpdip01'
});
 
const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({todoAPP: 'APP TODOS'});
});

app.get('/todos', (req, res) => {
  connection.execute(
    'SELECT * FROM todos',
    function(err, results, fields) {
      res.json(results);
    });
});

app.post('/todos', (req, res) => {
  connection.execute(
    'INSERT INTO todos (label,isDone) VALUES (?,false)',
    [req.body.label],
    function(err, results, fields) {
      res.json(results);
    });
});

app.put('/todos/:id', (req, res) => {
  connection.execute(
    'UPDATE todos SET isDone = true WHERE id=?',
    [req.params.id],
    function(err, results, fields) {
      res.json(results);
    });
});

app.delete('/todos/:id', (req, res) => {
  connection.execute(
    'DELETE FROM todos WHERE `id` = ?',
    [req.params.id],
    function(err, results, fields) {
      res.json(results);
    });
});

app.listen(PORT, HOST);
