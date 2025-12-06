import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import { Navbar } from './components/Navbar';
import { LibraryPage } from './pages/LibraryPage';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <BooksProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BooksProvider>
  );
}

export default App;
