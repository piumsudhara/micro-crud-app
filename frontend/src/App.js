import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post('http://localhost:5000/books', { title, author, price });
      fetchBooks();
      setTitle('');
      setAuthor('');
      setPrice('');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  const updateBook = async (id) => {
    try {
      await axios.put(`http://localhost:5000/books/${id}`, { title, author, price });
      fetchBooks();
      setTitle('');
      setAuthor('');
      setPrice('');
    } catch (error) {
      console.error('Error updating book: ', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book: ', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Bookshop
      </Typography>
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addBook}
          fullWidth
          disabled={!title || !author || !price}
        >
          Add Book
        </Button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Typography variant="h6">
              {book.title} by {book.author}
            </Typography>
            <Typography variant="subtitle1">Price: ${book.price}</Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => updateBook(book.id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => deleteBook(book.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default App;
