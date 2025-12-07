import { useBooks } from '../context/BooksContext';
import { BookList } from '../components/BookList';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export function LibraryPage() {
  const { books, moveBook, removeBook } = useBooks();

  const planBooks = books.filter((b) => b.status === 'plan');
  const readingBooks = books.filter((b) => b.status === 'reading');
  const readBooks = books.filter((b) => b.status === 'read');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          My Collection
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal reading sanctuary. Track your progress and organize your literary journey.
        </p>
      </header>

      {books.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your library is empty</h3>
          <p className="text-gray-500 mb-8">Start building your collection by adding some books.</p>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            Find Books to Add
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BookList
            title="Plan to Read"
            books={planBooks}
            onMove={moveBook}
            onRemove={removeBook}
          />
          <BookList
            title="Currently Reading"
            books={readingBooks}
            onMove={moveBook}
            onRemove={removeBook}
          />
          <BookList
            title="Read"
            books={readBooks}
            onMove={moveBook}
            onRemove={removeBook}
          />
        </div>
      )}
    </motion.div>
  );
}
