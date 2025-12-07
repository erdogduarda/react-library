import { useState } from 'react';
import { useBooks } from '../context/BooksContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Check, Plus, Loader2 } from 'lucide-react';

function SearchResultItem({ book, onAdd, inLibrary, index }) {
  const [status, setStatus] = useState('plan');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 md:gap-6 hover:shadow-md transition-all duration-300"
    >
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          className="w-full sm:w-24 h-48 sm:h-36 object-cover rounded-lg shadow-md flex-shrink-0"
        />
      ) : (
        <div className="w-full sm:w-24 h-48 sm:h-36 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-2 flex-shrink-0">
          <Book className="w-8 h-8 opacity-50" />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{book.title}</h3>
          <p className="text-gray-600 font-medium mt-1">{book.author}</p>
          {book.year && (
            <p className="text-gray-400 text-sm mt-1">
              First published: {book.year}
            </p>
          )}
        </div>
        <div className="mt-4">
          {inLibrary ? (
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-100">
              <Check className="w-4 h-4 mr-2" />
              In Library
            </span>
          ) : (
            <div className="flex flex-wrap gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="py-2 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="plan">Plan to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
              <button
                onClick={() => onAdd(book, status)}
                className="flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-500/30 active:scale-95 text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SearchPage() {
  const { addBook, books } = useBooks();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Request specific fields to improve performance and reduce payload size
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year,isbn`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        const formattedResults = data.docs.map((doc) => ({
          isbn: doc.isbn ? doc.isbn[0] : doc.key,
          title: doc.title,
          author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
          cover: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : null,
          year: doc.first_publish_year,
        }));
        setResults(formattedResults);
      } else {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError(`Failed to fetch results: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const isBookInLibrary = (isbn) => {
    return books.some((b) => b.isbn === isbn);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Find Books</h1>
        <p className="text-base md:text-lg text-gray-600">Discover your next great read from millions of books</p>
      </header>

      <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-100/50 mb-10 border border-gray-100">
        <form onSubmit={searchBooks} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95 flex items-center gap-2 min-w-[140px] justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 text-red-500 text-center pb-2 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {results.map((book, index) => (
            <SearchResultItem
              key={book.isbn}
              book={book}
              onAdd={addBook}
              inLibrary={isBookInLibrary(book.isbn)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
