import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconChevronLeft, IconShare, IconCalendarEvent, IconEye, IconTags, IconArrowUpRight, IconArrowRight, IconHome } from '@tabler/icons-react';

export default function ArtikelDetail({ post, relatedPosts = [] }) {

    const articleTitle = post.title;

    return (
        <FrontLayout title={articleTitle}>
            <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-surface-base text-slate-800 dark:text-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-8 mb-10">
                        <Link href="/" className="hover:text-accent-primary transition-colors flex items-center gap-1">
                            <IconHome size={16} />
                            Beranda
                        </Link>
                        <span>&gt;</span>
                        <Link href="/artikel" className="hover:text-accent-primary transition-colors">
                            Artikel
                        </Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                            {articleTitle}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            
                            {/* Action Bar */}
                            <div className="flex items-center justify-between mb-6 text-sm font-medium">
                                <Link href="/artikel" className="flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 transition-colors">
                                    <IconChevronLeft size={18} stroke={2.5} />
                                    Kembali
                                </Link>
                                <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: post.title,
                                            url: window.location.href
                                        });
                                    }
                                }}>
                                    <IconShare size={18} />
                                    Bagikan
                                </button>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <IconCalendarEvent size={16} />
                                    {new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • {new Date(post.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IconEye size={16} />
                                    {post.views_count} kali dibaca
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                {articleTitle}
                            </h1>
                            
                            {/* Blue Accent Line */}
                            <div className="w-12 h-1 bg-accent-primary mb-8"></div>

                            {/* Featured Image */}
                            {post.thumbnail_url && (
                                <div className="w-full aspect-[16/9] bg-gray-200 dark:bg-surface-muted rounded-2xl overflow-hidden mb-8 shadow-sm">
                                    <img 
                                        src={post.thumbnail_url} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed mb-12"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            {post.hashtags && post.hashtags.length > 0 && (
                                <div className="flex flex-col gap-3 py-6 border-t border-gray-100 dark:border-surface-muted/50">
                                    <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                                        <IconTags size={20} />
                                        Tags Berita:
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {post.hashtags.map((tag) => (
                                            <span key={tag.id} className="px-3 py-1 bg-blue-50 dark:bg-accent-primary/10 text-accent-primary text-sm font-semibold rounded-full">
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-gray-100 dark:border-surface-muted/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-5 bg-accent-primary rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                        BERITA TERKAIT
                                    </h3>
                                </div>
                                <Link href="/artikel" className="text-sm font-bold text-accent-primary hover:text-accent-primary/80 transition-colors flex items-center gap-1">
                                    Semua Berita <IconArrowRight size={16} />
                                </Link>
                            </div>

                            <div className="flex flex-col gap-4">
                                {relatedPosts.length > 0 ? relatedPosts.map((article) => (
                                    <Link href={`/artikel/${article.slug}`} key={article.id} className="bg-white dark:bg-surface-muted rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-surface-muted/50 hover:shadow-md transition-shadow flex flex-col group block">
                                        <div className="p-5 flex flex-col flex-1">
                                            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2">
                                                {article.title}
                                            </h4>
                                            
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                                                {article.excerpt || article.title}
                                            </p>
                                            
                                            {article.category && (
                                                <div className="mb-4">
                                                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-surface-base text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded-full">
                                                        {article.category.name}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-surface-base/50">
                                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                                    {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                                
                                                <button className="w-6 h-6 rounded-full border border-gray-200 dark:border-surface-base flex items-center justify-center text-slate-400 group-hover:border-accent-primary group-hover:text-accent-primary group-hover:bg-accent-primary/5 transition-all">
                                                    <IconArrowUpRight size={12} stroke={2} />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="text-sm text-slate-500">Tidak ada berita terkait.</div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FrontLayout>
    );
}
