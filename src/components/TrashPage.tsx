import React from 'react';
import { useImageStore } from '../stores/imageStore';
import DeletedImageGrid from './DeletedImageGrid';

export default function TrashPage() {
  const { deletedImages } = useImageStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Recently Deleted Images</h2>
      {deletedImages.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No deleted images</p>
      ) : (
        <DeletedImageGrid />
      )}
    </div>
  );
}