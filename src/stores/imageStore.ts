import { create } from 'zustand';
import { Image } from '../types';

interface ImageStore {
  images: Image[];
  deletedImages: Image[];
  selectedImage: Image | null;
  setImages: (images: Image[]) => void;
  setSelectedImage: (image: Image | null) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDelete: (image: Image) => void;
  handleRestore: (image: Image) => void;
  handleDownload: (image: Image) => Promise<void>;
  navigateImages: (direction: 'prev' | 'next') => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', name: 'Mountain' },
    { id: '2', url: 'https://images.unsplash.com/photo-1682687221038-404670f09439', name: 'Ocean' },
  ],
  deletedImages: [],
  selectedImage: null,
  
  setImages: (images) => set({ images }),
  setSelectedImage: (image) => set({ selectedImage: image }),

  handleFileUpload: (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: Image = {
            id: Math.random().toString(36),
            url: e.target?.result as string,
            name: file.name
          };
          set(state => ({ images: [...state.images, newImage] }));
        };
        reader.readAsDataURL(file);
      });
    }
  },

  handleUrlAdd: (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const url = new FormData(form).get('url') as string;
    if (url) {
      const newImage: Image = {
        id: Math.random().toString(36),
        url,
        name: url.split('/').pop() || 'image'
      };
      set(state => ({ images: [...state.images, newImage] }));
      form.reset();
    }
  },

  handleDrop: (e) => {
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const newImage: Image = {
              id: Math.random().toString(36),
              url: e.target?.result as string,
              name: file.name
            };
            set(state => ({ images: [...state.images, newImage] }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  },

  handleDelete: (image) => {
    set(state => ({
      images: state.images.filter(img => img.id !== image.id),
      deletedImages: [image, ...state.deletedImages]
    }));
  },

  handleRestore: (image) => {
    set(state => ({
      deletedImages: state.deletedImages.filter(img => img.id !== image.id),
      images: [...state.images, image]
    }));
  },

  handleDownload: async (image) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  },

  navigateImages: (direction) => {
    const { images, selectedImage } = get();
    if (!selectedImage) return;
    
    const currentIdx = images.findIndex(img => img.id === selectedImage.id);
    let newIdx = direction === 'prev' ? currentIdx - 1 : currentIdx + 1;
    
    if (newIdx < 0) newIdx = images.length - 1;
    if (newIdx >= images.length) newIdx = 0;
    
    set({ selectedImage: images[newIdx] });
  },
}));