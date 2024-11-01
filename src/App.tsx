import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import ImageGallery from './components/ImageGallery';
import TrashPage from './components/TrashPage';
import { useImageStore } from './stores/imageStore';

function App() {
  const { deletedImages } = useImageStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold text-gray-900">
                Image Gallery
              </Link>
              <Link
                to="/trash"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <Trash2 size={20} />
                <span>Trash {deletedImages.length > 0 && `(${deletedImages.length})`}</span>
              </Link>
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ImageGallery />} />
            <Route path="/trash" element={<TrashPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;