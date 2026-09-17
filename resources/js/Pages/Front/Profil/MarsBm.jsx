import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome } from '@tabler/icons-react';
import { Music } from 'lucide-react';
import MusicPlayer from '@/Components/Front/MusicPlayer';

export default function MarsBm({ marsBm }) {
    // Dummy lyrics fallback if database is empty
    const defaultLyrics = `
Dalam derap langkah yang pasti
Kami pemuda teknik berdiri
Bersatu padu membangun negeri
Dengan semangat yang takkan mati

Blue Murder, Blue Murder
Teknik tangguh dan pantang mundur
Blue Murder, Blue Murder
Jiwa korsa selalu lebur

Terus maju pantang menyerah
Meraih cita di ufuk merah
Kami lahir dari baja dan api
Untuk almamater yang kami abdi
    `.trim();

    const displayLyrics = marsBm?.lyrics || defaultLyrics;

    return (
        <FrontLayout title="Mars BM">
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
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Mars BM</span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            {marsBm?.title || 'Mars Blue Murder'}
                        </h1>
                        <div className="w-24 h-1 bg-accent-primary mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column: Lyrics (3/4 on large screens = col-span-8) */}
                        <div className="lg:col-span-8 lg:pr-8">
                            <div className="bg-white dark:bg-surface-muted rounded-2xl border border-gray-200 dark:border-surface-muted/50 p-8 md:p-12 shadow-sm text-left">
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-loose text-slate-700 dark:text-slate-300">
                                    {displayLyrics.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-6 last:mb-0">
                                            {paragraph.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i !== paragraph.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Music Player (1/4 on large screens = col-span-4) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 w-full pt-10 lg:pt-0">
                            <MusicPlayer marsBm={marsBm} />
                        </div>
                    </div>

                </div>
            </div>
        </FrontLayout>
    );
}
