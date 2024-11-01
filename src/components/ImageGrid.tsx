import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { useImageStore } from '../stores/imageStore';
import { Image } from '../types';

interface ImageGridProps {
  images: Image[];
  onSelect: (image: Image) => void;
}

export default function ImageGrid({ images, onSelect }: ImageGridProps) {
  const { handleDelete, handleDownload } = useImageStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={() => onSelect(image)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg">
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => handleDownload(image)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => handleDelete(image)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}