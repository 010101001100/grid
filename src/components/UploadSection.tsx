import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useImageStore } from '../stores/imageStore';

export default function UploadSection() {
  const { handleFileUpload, handleUrlAdd, handleDrop } = useImageStore();

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleDrop(e);
  }, [handleDrop]);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
          <Upload size={20} />
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        
        <form onSubmit={handleUrlAdd} className="flex gap-2">
          <input
            type="url"
            name="url"
            placeholder="Enter image URL"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add URL
          </button>
        </form>
      </div>
      
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      >
        <p className="text-gray-500">Drag and drop images here</p>
      </div>
    </div>
  );
}