class ImageGallery {
    constructor() {
        this.images = [
            { id: '1', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', name: 'Mountain' },
            { id: '2', url: 'https://images.unsplash.com/photo-1682687221038-404670f09439', name: 'Ocean' }
        ];
        this.deletedImages = [];
        this.selectedImage = null;
        this.currentImageIndex = -1;

        this.initializeElements();
        this.setupEventListeners();
        this.render();
    }

    initializeElements() {
        // Main elements
        this.imageGrid = document.getElementById('imageGrid');
        this.trashGrid = document.getElementById('trashGrid');
        this.trashBtn = document.getElementById('trashBtn');
        this.trashCount = document.getElementById('trashCount');
        this.dropZone = document.getElementById('dropZone');
        this.fileInput = document.getElementById('fileInput');
        this.urlForm = document.getElementById('urlForm');
        this.urlInput = document.getElementById('urlInput');

        // Modal elements
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeModal = document.getElementById('closeModal');
        this.prevButton = document.getElementById('prevImage');
        this.nextButton = document.getElementById('nextImage');
    }

    setupEventListeners() {
        // File upload
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // URL form
        this.urlForm.addEventListener('submit', (e) => this.handleUrlAdd(e));
        
        // Drag and drop
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('drag-over');
        });
        
        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('drag-over');
        });
        
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('drag-over');
            this.handleDrop(e);
        });

        // Trash view toggle
        this.trashBtn.addEventListener('click', () => this.toggleTrashView());

        // Modal controls
        this.closeModal.addEventListener('click', () => this.closeImageModal());
        this.prevButton.addEventListener('click', () => this.navigateImages('prev'));
        this.nextButton.addEventListener('click', () => this.navigateImages('next'));
    }

    render() {
        this.renderImageGrid();
        this.renderTrashGrid();
        this.updateTrashCount();
    }

    renderImageGrid() {
        this.imageGrid.innerHTML = this.images.map(image => this.createImageCard(image)).join('');
    }

    renderTrashGrid() {
        this.trashGrid.innerHTML = this.deletedImages.map(image => this.createTrashCard(image)).join('');
    }

    createImageCard(image) {
        return `
            <div class="image-card" data-id="${image.id}">
                <img src="${image.url}" alt="${image.name}" onclick="gallery.openImageModal('${image.id}')">
                <div class="image-actions">
                    <button class="action-btn" onclick="gallery.handleDownload('${image.id}')">⬇️</button>
                    <button class="action-btn" onclick="gallery.handleDelete('${image.id}')">🗑️</button>
                </div>
            </div>
        `;
    }

    createTrashCard(image) {
        return `
            <div class="image-card" data-id="${image.id}">
                <img src="${image.url}" alt="${image.name}">
                <div class="restore-btn">
                    <button onclick="gallery.handleRestore('${image.id}')">
                        🔄 Restore
                    </button>
                </div>
            </div>
        `;
    }

    updateTrashCount() {
        this.trashCount.textContent = this.deletedImages.length || '';
    }

    handleFileUpload(event) {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: Math.random().toString(36).substr(2, 9),
                        url: e.target.result,
                        name: file.name
                    };
                    this.images.push(newImage);
                    this.render();
                };
                reader.readAsDataURL(file);
            });
        }
    }

    handleUrlAdd(e) {
        e.preventDefault();
        const url = this.urlInput.value;
        if (url) {
            const newImage = {
                id: Math.random().toString(36).substr(2, 9),
                url,
                name: url.split('/').pop() || 'image'
            };
            this.images.push(newImage);
            this.render();
            this.urlInput.value = '';
        }
    }

    handleDrop(e) {
        const files = e.dataTransfer.files;
        if (files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const newImage = {
                            id: Math.random().toString(36).substr(2, 9),
                            url: e.target.result,
                            name: file.name
                        };
                        this.images.push(newImage);
                        this.render();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    handleDelete(id) {
        const image = this.images.find(img => img.id === id);
        if (image) {
            this.images = this.images.filter(img => img.id !== id);
            this.deletedImages.unshift(image);
            this.render();
        }
    }

    handleRestore(id) {
        const image = this.deletedImages.find(img => img.id === id);
        if (image) {
            this.deletedImages = this.deletedImages.filter(img => img.id !== id);
            this.images.push(image);
            this.render();
        }
    }

    async handleDownload(id) {
        const image = this.images.find(img => img.id === id);
        if (image) {
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
        }
    }

    toggleTrashView() {
        const isTrashVisible = !this.trashGrid.classList.contains('hidden');
        if (isTrashVisible) {
            this.trashGrid.classList.add('hidden');
            this.imageGrid.classList.remove('hidden');
        } else {
            this.trashGrid.classList.remove('hidden');
            this.imageGrid.classList.add('hidden');
        }
    }

    openImageModal(id) {
        const image = this.images.find(img => img.id === id);
        if (image) {
            this.selectedImage = image;
            this.currentImageIndex = this.images.findIndex(img => img.id === id);
            this.modalImage.src = image.url;
            this.modal.classList.remove('hidden');
        }
    }

    closeImageModal() {
        this.modal.classList.add('hidden');
        this.selectedImage = null;
        this.currentImageIndex = -1;
    }

    navigateImages(direction) {
        if (this.currentImageIndex === -1) return;
        
        let newIndex = direction === 'prev' 
            ? this.currentImageIndex - 1 
            : this.currentImageIndex + 1;
        
        if (newIndex < 0) newIndex = this.images.length - 1;
        if (newIndex >= this.images.length) newIndex = 0;
        
        this.currentImageIndex = newIndex;
        this.selectedImage = this.images[newIndex];
        this.modalImage.src = this.selectedImage.url;
    }
}

const gallery = new ImageGallery();