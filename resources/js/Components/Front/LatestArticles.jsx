import React from 'react';
import { Link } from '@inertiajs/react';
import { IconArrowRight, IconCalendarEvent } from '@tabler/icons-react';

export default function LatestArticles({ hideHeader = false }) {
    return (
        <section className="w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 dark:bg-surface-base transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {!hideHeader && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-8 h-0.5 bg-accent-orange"></div>
                                <span className="text-accent-orange font-bold text-xs tracking-widest uppercase">Kabar Terkini</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-text-primary leading-tight">
                                Artikel <br />
                                Terbaru
                            </h2>
                        </div>
                        <Link href="/artikel" className="flex items-center gap-2 text-accent-orange font-bold text-sm tracking-wider uppercase mt-6 md:mt-0 hover:text-accent-orange/80 transition-colors">
                            Artikel Selengkapnya
                            <IconArrowRight size={16} stroke={2.5} />
                        </Link>
                    </div>
                )}

                {/* Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Featured Article (Left) */}
                    <div className="relative rounded-[2rem] overflow-hidden shadow-lg group h-[400px] lg:h-auto min-h-[500px]">
                        <img 
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000" 
                            alt="Featured Article" 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/40 to-transparent"></div>
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="self-start px-4 py-1.5 bg-accent-primary text-surface-base text-xs font-bold rounded-full">
                                ARTIKEL
                            </div>
                            
                            <div className="text-white relative z-10">
                                <div className="flex items-center gap-2 text-neutral-300 text-xs mb-3 font-medium">
                                    <IconCalendarEvent size={16} />
                                    18 Desember 2025 • Kamis
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-extrabold text-accent-orange leading-snug mb-4 drop-shadow-sm line-clamp-3">
                                    Pembangunan Desa dan Kelestarian Lingkungan Mewujudkan Desa...
                                </h3>
                                <p className="text-sm text-neutral-200 line-clamp-2 leading-relaxed font-medium">
                                    Pembangunan desa merupakan bagian penting dari upaya meningkatkan kesejahteraan masyarakat desa secara menyeluruh. Undang-Undang Nomor 6 Tahun 2014 tentang...
                                </p>
                                <div className="mt-4 w-12 h-1 bg-accent-orange"></div>
                            </div>
                        </div>
                    </div>

                    {/* Article List (Right) */}
                    <div className="flex flex-col gap-4">
                        {[
                            {
                                badge: 'ARTIKEL',
                                title: 'UU Desa Tidak Boleh Dibengkokkan: Pentingnya Rekognisi Negara dan...',
                                desc: 'Undang-Undang Nomor 6 Tahun 2014 tentang Desa memberikan dasar hukum bagi desa untuk...',
                                image: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=400'
                            },
                            {
                                badge: 'ARTIKEL',
                                title: 'DWP DPMD Kabupaten Mojokerto Gelar Pertemuan Rutin dan Peringatan HUT...',
                                desc: 'Mojokerto – Dharma Wanita Persatuan (DWP) Dinas Pemberdayaan Masyarakat dan Desa...',
                                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400'
                            },
                            {
                                badge: 'ARTIKEL',
                                title: 'DPMD Mojokerto Sosialisasikan Panduan E-Office Desa untuk Perangk...',
                                desc: 'Mojokerto - Dinas Pemberdayaan Masyarakat dan Desa (DPMD) Kabupaten Mojokerto...',
                                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400'
                            },
                            {
                                badge: 'ARTIKEL',
                                title: 'DPMD Mojokerto Fasilitasi Klinik Lakon Penggoda untuk Pendampingan Dana...',
                                desc: 'Mojokerto - Dinas Pemberdayaan Masyarakat dan Desa (DPMD) Kabupaten Mojokerto memfasilitasi...',
                                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400'
                            }
                        ].map((item, idx) => (
                            <Link href="#" key={idx} className="flex gap-5 p-4 sm:p-5 bg-white dark:bg-surface-muted rounded-[1.5rem] border border-neutral-100 dark:border-surface-muted/50 shadow-sm hover:shadow-md transition-all group">
                                <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col justify-center flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-accent-orange font-extrabold text-[10px] sm:text-xs tracking-wider uppercase">
                                            {item.badge}
                                        </span>
                                        <span className="text-neutral-400 text-[10px] sm:text-xs font-medium">
                                            • 18 Des 2025
                                        </span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-text-primary leading-snug mb-2 line-clamp-2 group-hover:text-accent-orange transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-text-secondary line-clamp-2 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
