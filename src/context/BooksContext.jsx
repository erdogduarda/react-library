import { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext();

const STORAGE_KEY = 'library-books';

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book, status = 'plan') => {
    setBooks((prev) => {
      // Check for duplicates by ISBN or ID
      if (prev.some((b) => b.isbn === book.isbn)) {
        return prev; 
      }
      return [...prev, { ...book, status, id: book.isbn }];
    });
  };

  const moveBook = (isbn, status) => {
    setBooks((prev) =>
      prev.map((book) => (book.isbn === isbn ? { ...book, status } : book))
    );
  };

  const removeBook = (isbn) => {
    setBooks((prev) => prev.filter((book) => book.isbn !== isbn));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, moveBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
