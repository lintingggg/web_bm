import React, { useState, useEffect } from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome, IconArrowUpRight } from '@tabler/icons-react';

export default function Artikel({ posts }) {

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
                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.data.map((article) => (
                                <Link href={`/artikel/${article.slug}`} key={article.id} className="bg-white dark:bg-surface-muted rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-surface-muted/50 hover:shadow-md transition-shadow flex flex-col group block">
                                    {/* Image */}
                                    <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100 dark:bg-surface-base">
                                        <img 
                                            src={article.thumbnail_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"} 
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
                                            {article.excerpt || article.title}
                                        </p>
                                        
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {article.category && (
                                                <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-semibold rounded-full uppercase">
                                                    {article.category.name}
                                                </span>
                                            )}
                                            {article.hashtags?.slice(0, 2).map((tag) => (
                                                <span key={tag.id} className="inline-block px-3 py-1 bg-slate-100 dark:bg-surface-base text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full">
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-surface-base/50">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                            
                                            <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-surface-base flex items-center justify-center text-slate-400 group-hover:border-accent-primary group-hover:text-accent-primary group-hover:bg-accent-primary/5 transition-all">
                                                <IconArrowUpRight size={16} stroke={2} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            Belum ada artikel yang dipublikasikan.
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex flex-wrap gap-2">
                                {posts.links.map((link, k) => (
                                    link.url ? (
                                        <Link
                                            key={k}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-accent-primary text-white'
                                                    : 'bg-white dark:bg-surface-muted text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-base border border-slate-200 dark:border-surface-muted/50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={k}
                                            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-50 dark:bg-surface-base text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-surface-muted/50 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </nav>
                        </div>
                    )}
                </div>


            </div>
        </FrontLayout>
    );
}
