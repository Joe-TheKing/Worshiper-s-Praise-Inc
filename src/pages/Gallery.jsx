import { useState, useMemo, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';
import { galleryImages } from '../data/galleryData';

const IMAGES_PER_PAGE = 24;

const GalleryPage = () => {
    const [selectedAlbum, setSelectedAlbum] = useState('All');
    const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    // Dynamic albums based on data
    const albums = useMemo(() => {
        const uniqueAlbums = [...new Set(galleryImages.map(img => img.album))].sort();
        return ['All', ...uniqueAlbums];
    }, []);

    // Filtered images
    const filteredImages = useMemo(() => {
        const filtered = selectedAlbum === 'All'
            ? galleryImages
            : galleryImages.filter(img => img.album === selectedAlbum);
        return filtered;
    }, [selectedAlbum]);

    // Reset pagination when album changes
    useEffect(() => {
        setVisibleCount(IMAGES_PER_PAGE);
    }, [selectedAlbum]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + IMAGES_PER_PAGE);
    };

    const openLightbox = (image, index) => {
        setLightboxImage(image);
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxIndex(-1);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (lightboxIndex + 1) % filteredImages.length;
        setLightboxImage(filteredImages[nextIdx]);
        setLightboxIndex(nextIdx);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
        setLightboxImage(filteredImages[prevIdx]);
        setLightboxIndex(prevIdx);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Our Ministry Gallery"
                description="Capturing moments of worship, fellowship, and the powerful move of God through our various ministry events."
                image="/Assets/Pictures/Gallery Cover.png"
            />

            {/* Filter Bar */}
            <section className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                        {albums.map((album) => (
                            <button
                                key={album}
                                onClick={() => setSelectedAlbum(album)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedAlbum === album
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {album}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {filteredImages.slice(0, visibleCount).map((image, index) => (
                            <ScrollReveal key={image.id}>
                                <div
                                    className="relative group overflow-hidden rounded-xl cursor-pointer bg-gray-100"
                                    onClick={() => openLightbox(image, index)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.album}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-white text-center p-4">
                                            <Maximize2 className="mx-auto mb-2" size={24} />
                                            <p className="text-sm font-medium">{image.album}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {visibleCount < filteredImages.length && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Load More Memories
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center transition-all duration-300"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                        onClick={closeLightbox}
                    >
                        <X size={40} />
                    </button>

                    <button
                        className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
                        onClick={nextImage}
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="max-w-[90vw] max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
                        <img
                            src={lightboxImage.src}
                            alt={lightboxImage.album}
                            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                        />
                        <div className="absolute -bottom-10 left-0 right-0 text-center text-white/80 text-sm font-medium">
                            {lightboxImage.album} — {lightboxIndex + 1} of {filteredImages.length}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default GalleryPage;
