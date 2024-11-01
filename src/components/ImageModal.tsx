import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImageStore } from '../stores/imageStore';

interface ImageModalProps {
  onClose: () => void;
}

export default function ImageModal({ onClose }: ImageModalProps) {
  const { selectedImage, navigateImages } = useImageStore();

  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={() => navigateImages('prev')}
        className="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeft size={36} />
      </button>
      
      <img
        src={selectedImage.url}
        alt={selectedImage.name}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      
      <button
        onClick={() => navigateImages('next')}
        className="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}