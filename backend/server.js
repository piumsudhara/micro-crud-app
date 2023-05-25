const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/books', (req, res) => {
  connection.query('SELECT * FROM books', (error, results) => {
    if (error) {
      console.error('Error retrieving books: ', error);
      res.status(500).json({ error: 'Error retrieving books' });
    } else {
      res.json(results);
    }
  });
});

app.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  connection.query('INSERT INTO books (title, author, price) VALUES (?, ?, ?)', [title, author, price], (error) => {
    if (error) {
      console.error('Error adding book: ', error);
      res.status(500).json({ error: 'Error adding book' });
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/books/:id', (req, res) => {
  const { title, author, price } = req.body;
  const bookId = req.params.id;
  connection.query(
    'UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?',
    [title, author, price, bookId],
    (error) => {
      if (error) {
        console.error('Error updating book: ', error);
        res.status(500).json({ error: 'Error updating book' });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  connection.query('DELETE FROM books WHERE id = ?', [bookId], (error) => {
    if (error) {
      console.error('Error deleting book: ', error);
      res.status(500).json({ error: 'Error deleting book' });
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
