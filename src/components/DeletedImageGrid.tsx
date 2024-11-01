import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useImageStore } from '../stores/imageStore';

export default function DeletedImageGrid() {
  const { deletedImages, handleRestore } = useImageStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {deletedImages.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-64 object-cover rounded-lg opacity-50"
          />
          <button
            onClick={() => handleRestore(image)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <RotateCcw size={20} className="text-blue-500" />
              <span>Restore</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}