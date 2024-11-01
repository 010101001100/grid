import React from 'react';
import { Upload } from 'lucide-react';
import UploadSection from './UploadSection';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';
import { useImageStore } from '../stores/imageStore';

export default function ImageGallery() {
  const { images, selectedImage, setSelectedImage } = useImageStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <UploadSection />
      <ImageGrid images={images} onSelect={setSelectedImage} />
      {selectedImage && (
        <ImageModal
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}