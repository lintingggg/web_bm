import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome } from '@tabler/icons-react';
import About from '@/Components/Front/About';

export default function TentangKami({ page, aboutSection }) {
    const pageTitle = page?.title || aboutSection?.title || 'Tentang Kami';
    
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

                    {/* About Section from Component */}
                    {aboutSection ? (
                        <div className="-mt-16">
                            <About 
                                title={aboutSection.title}
                                titleLine2={aboutSection.title_line2}
                                description={aboutSection.description}
                                primaryImage={aboutSection.primary_image_url || undefined}
                                secondaryImage={aboutSection.secondary_image_url || undefined}
                                secondaryCTA={{ ctaEnabled: false }}
                            />
                        </div>
                    ) : (
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                                {pageTitle}
                            </h1>
                        </div>
                    )}

                    {/* Additional Content from Page Module (if any) */}
                    {page && page.content && (
                        <div className="bg-white dark:bg-surface-muted rounded-2xl border border-gray-200 dark:border-surface-muted/50 p-8 md:p-12 shadow-sm mt-8">
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: page.content }}
                            />
                        </div>
                    )}

                    {/* If both are empty */}
                    {!page?.content && !aboutSection && (
                        <div className="py-20 flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                {/* Kosong */}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </FrontLayout>
    );
}
