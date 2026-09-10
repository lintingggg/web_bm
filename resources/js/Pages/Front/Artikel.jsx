import React, { useState, useEffect } from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome, IconArrowUpRight } from '@tabler/icons-react';

export default function Artikel() {



    // Dummy data for articles
    const articles = [
        {
            id: 1,
            title: 'Sertifikat Kelulusan Pelatihan AI Engineer pada Program IBM',
            slug: 'sertifikat-kelulusan-pelatihan-ai-engineer',
            excerpt: 'Dengan bangga diberikan kepada Muhammad Iqbal Faza telah berhasil menyelesaikan Pelatihan AI Engineer...',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
            hashtag: '#prestasi',
            author: 'Super Admin BM',
            date: '10 Sep 2026, 12.48'
        },
        {
            id: 2,
            title: 'Testing Implementasi Sistem Baru',
            slug: 'testing-implementasi-sistem-baru',
            excerpt: 'Proses pengujian sistem informasi terbaru untuk mendukung kegiatan administrasi organisasi mahasiswa...',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
            hashtag: '#Testing',
            author: 'Tim IT BM',
            date: '28 Agu 2026, 20.29'
        },
        {
            id: 3,
            title: 'Pelatihan Dasar Kepemimpinan 2026',
            slug: 'pelatihan-dasar-kepemimpinan-2026',
            excerpt: 'Meningkatkan jiwa kepemimpinan mahasiswa Fakultas Teknik melalui serangkaian kegiatan yang menantang dan edukatif.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
            hashtag: '#kegiatan',
            author: 'Humas BM',
            date: '15 Agu 2026, 09.00'
        },
        {
            id: 4,
            title: 'Lomba Desain Logo Anniversary UKM',
            slug: 'lomba-desain-logo-anniversary-ukm',
            excerpt: 'Dalam rangka merayakan hari jadi, kami mengadakan lomba desain logo dengan total hadiah jutaan rupiah...',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
            hashtag: '#lomba',
            author: 'Panitia Anniv',
            date: '01 Agu 2026, 14.30'
        },
    ];

    return (
        <FrontLayout title="Artikel">
            <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-surface-base text-slate-800 dark:text-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-8 mb-10">
                        <Link href="/" className="hover:text-accent-primary transition-colors flex items-center gap-1">
                            <IconHome size={16} />
                            Beranda
                        </Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Artikel</span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Artikel
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
                            Informasi terkini seputar program kerja, kegiatan mahasiswa, dan pengumuman resmi dari UKM Fakultas Teknik Blue Murder.
                        </p>
                    </div>



                    {/* Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map((article) => (
                            <Link href={`/artikel/${article.slug}`} key={article.id} className="bg-white dark:bg-surface-muted rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-surface-muted/50 hover:shadow-md transition-shadow flex flex-col group block">
                                {/* Image */}
                                <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100 dark:bg-surface-base">
                                    <img 
                                        src={article.image} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-3 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-surface-base text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full">
                                            {article.hashtag}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-surface-base/50">
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {article.date}
                                        </div>
                                        
                                        <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-surface-base flex items-center justify-center text-slate-400 group-hover:border-accent-primary group-hover:text-accent-primary group-hover:bg-accent-primary/5 transition-all">
                                            <IconArrowUpRight size={16} stroke={2} />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>
        </FrontLayout>
    );
}
