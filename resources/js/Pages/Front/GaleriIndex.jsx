import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome, IconPhoto } from '@tabler/icons-react';

export default function GaleriIndex({ galleries }) {

    return (
        <FrontLayout title="Galeri Kegiatan">
            <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-surface-base text-slate-800 dark:text-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-8 mb-10">
                        <Link href="/" className="hover:text-accent-primary transition-colors flex items-center gap-1">
                            <IconHome size={16} />
                            Beranda
                        </Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Galeri</span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Galeri Kegiatan
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
                            Dokumentasi dan potret berbagai aktivitas, program kerja, serta acara resmi Dinas Pemberdayaan Masyarakat dan Desa Kabupaten Bangkalan.
                        </p>
                    </div>

                    {/* Albums Grid */}
                    {galleries && galleries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {galleries.map((album) => (
                                <Link href={`/galeri/${album.slug}`} key={album.id} className="group block">
                                    <div className="bg-gray-200 dark:bg-surface-muted rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative mb-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg shadow-sm border border-gray-100 dark:border-surface-muted/50">
                                        {album.cover_image_url ? (
                                            <img 
                                                src={album.cover_image_url} 
                                                alt={album.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                                <IconPhoto size={48} stroke={1.5} className="mb-2" />
                                                <span className="text-sm font-medium">Gambar tidak tersedia</span>
                                            </div>
                                        )}
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                    </div>
                                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 group-hover:text-accent-primary transition-colors line-clamp-2">
                                        {album.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            Belum ada album galeri yang dipublikasikan.
                        </div>
                    )}

                </div>
            </div>
        </FrontLayout>
    );
}
