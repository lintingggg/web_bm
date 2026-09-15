import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome } from '@tabler/icons-react';

export default function StrukturOrganisasi({ page, structure }) {
    const pageTitle = structure?.title || page?.title || 'Struktur Organisasi';

    return (
        <FrontLayout title={pageTitle}>
            <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-surface-base text-slate-800 dark:text-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-8 mb-10">
                        <Link href="/" className="hover:text-accent-primary transition-colors flex items-center gap-1">
                            <IconHome size={16} />
                            Beranda
                        </Link>
                        <span>&gt;</span>
                        <span>Profil UKM</span>
                        <span>&gt;</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{pageTitle}</span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-10 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            {pageTitle}
                        </h1>
                        {structure?.periode && (
                            <div className="inline-block bg-accent-orange/10 text-accent-orange dark:bg-accent-orange/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                                {structure.periode}
                            </div>
                        )}
                        {structure?.description && (
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                                {structure.description}
                            </p>
                        )}
                    </div>

                    {/* Image Section */}
                    {structure?.image_url && (
                        <div className="bg-white dark:bg-surface-muted rounded-2xl border border-gray-200 dark:border-surface-muted/50 p-4 shadow-sm mb-12 flex justify-center">
                            <img 
                                src={structure.image_url} 
                                alt={pageTitle} 
                                className="w-full max-w-5xl h-auto rounded-xl"
                            />
                        </div>
                    )}

                    {/* Additional Content from Page Module (if any) */}
                    {page && page.content && (
                        <div className="bg-white dark:bg-surface-muted rounded-2xl border border-gray-200 dark:border-surface-muted/50 p-8 md:p-12 shadow-sm">
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: page.content }}
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {!page?.content && !structure && (
                        <div className="py-20 flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                Belum ada data struktur organisasi.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </FrontLayout>
    );
}
