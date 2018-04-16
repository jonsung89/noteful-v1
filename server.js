'use strict';

const express = require('express');

// Simple In-Memory Database
const data = require('./db/notes');

// Create an Express application
const app = express();

// Create a static webserver
app.use(express.static('public'));

// Get All (and search by query)
app.get('/api/notes', (req, res) => {

  // Basic JSON response (data is an array of objects)
  // res.json(data);

  /**
   * Implement Search
   * Below are 2 solutions: verbose and terse. They are functionally identical but use different syntax
   *
   * Destructure the query string property in to `searchTerm` constant
   * If searchTerm exists...
   * then `filter` the data array where title `includes` the searchTerm value
   * otherwise return `data` unfiltered
   */

  /**
   * Verbose solution
   */
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }

  /**
   * Terse solution
   */
  // const { searchTerm } = req.query;
  // res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);

});

// Get a single item
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;

  /**
   * Verbose solution
   */
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);

  /**
   * Terse solution
   */
  // res.json(data.find(item => item.id === Number(id)));

});

// Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});