import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Book } from 'lucide-react';

export function BookList({ title, books, onMove, onRemove }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 flex-1 min-w-[300px]">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-100 pb-4 flex items-center justify-between">
        {title}
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {books.length}
        </span>
      </h2>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {books.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <Book className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 italic">No books in this list.</p>
            </motion.div>
          ) : (
            books.map((book) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={book.isbn}
                className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  />
                ) : (
                  <div className="w-20 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    <Book className="w-8 h-8 opacity-50" />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{book.author}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <select
                      value={book.status}
                      onChange={(e) => onMove(book.isbn, e.target.value)}
                      className="text-xs py-1.5 px-2 border-none bg-gray-50 rounded-md text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option value="plan">Plan to Read</option>
                      <option value="reading">Reading</option>
                      <option value="read">Read</option>
                    </select>
                    <button
                      onClick={() => onRemove(book.isbn)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                      title="Remove book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
