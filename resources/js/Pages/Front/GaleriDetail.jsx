import React, { useState } from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome, IconCalendarEvent, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function GaleriDetail({ slug }) {
    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);

    // Dummy photos for the album
    const photos = [
        {
            id: 1,
            title: 'Closing Ceremony PORPROV VII Jawa Timur 2023 - di Std Gajah Mada',
            date: '18 SEP 2026 • 00.00',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
            aspect: 'aspect-[4/3]' // landscape
        },
        {
            id: 2,
            title: 'Potret Keseruan Peserta',
            date: '18 SEP 2026 • 10.30',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
            aspect: 'aspect-[3/4]' // portrait
        },
        {
            id: 3,
            title: 'Suasana Pelatihan Kepemimpinan',
            date: '19 SEP 2026 • 13.00',
            image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1200',
            aspect: 'aspect-square' // square
        },
        {
            id: 4,
            title: 'Rapat Koordinasi Evaluasi',
            date: '20 SEP 2026 • 09.00',
            image: 'https://images.unsplash.com/photo-1556761175-5972d50c26c5?auto=format&fit=crop&q=80&w=1200',
            aspect: 'aspect-[16/9]' // wide
        },
        {
            id: 5,
            title: 'Persiapan Teknis Lapangan',
            date: '20 SEP 2026 • 14.00',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
            aspect: 'aspect-[3/4]' // portrait
        },
        {
            id: 6,
            title: 'Serah Terima Jabatan & Hadiah',
            date: '21 SEP 2026 • 16.00',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200',
            aspect: 'aspect-[4/3]' // landscape
        },
    ];

    // Dummy album info based on slug
    const albumTitle = slug === 'msad-masd' ? 'msad,masd' : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const albumDescription = 'Koleksi dokumentasi kegiatan yang meriah dan penuh semangat. Mengabadikan setiap momen kebersamaan dan aksi di lapangan.';

    return (
        <FrontLayout title={albumTitle}>
            <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-surface-base text-slate-800 dark:text-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-8 mb-10">
                        <Link href="/" className="hover:text-accent-primary transition-colors flex items-center gap-1">
                            <IconHome size={16} />
                            Beranda
                        </Link>
                        <span>&gt;</span>
                        <Link href="/galeri" className="hover:text-accent-primary transition-colors">
                            Galeri
                        </Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                            {albumTitle}
                        </span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            {albumTitle}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
                            {albumDescription}
                        </p>
                    </div>

                    {/* Photos Masonry Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {photos.map((photo) => (
                            <div 
                                key={photo.id} 
                                onClick={() => setSelectedImage(photo)}
                                className={`group relative bg-black rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-muted/50 break-inside-avoid ${photo.aspect}`}
                            >
                                <img 
                                    src={photo.image} 
                                    alt={photo.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Photo Meta Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-2 text-blue-200 text-sm font-semibold mb-2">
                                        <IconCalendarEvent size={18} />
                                        {photo.date}
                                    </div>
                                    <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 leading-tight">
                                        {photo.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <IconX size={24} />
                        </button>

                        {/* Lightbox Content */}
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="max-w-5xl w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking on image
                        >
                            <img 
                                src={selectedImage.image} 
                                alt={selectedImage.title}
                                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
                            />
                            
                            <div className="mt-6 text-center max-w-3xl">
                                <h3 className="text-white text-2xl font-bold mb-3">
                                    {selectedImage.title}
                                </h3>
                                <div className="flex items-center justify-center gap-2 text-blue-300 font-medium">
                                    <IconCalendarEvent size={18} />
                                    {selectedImage.date}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </FrontLayout>
    );
}
