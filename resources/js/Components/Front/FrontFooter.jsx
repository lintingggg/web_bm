import React from 'react';
import { 
    IconBrandInstagram, 
    IconBrandYoutube, 
    IconBrandTiktok,
} from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export default function FrontFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 bg-gray-50 dark:bg-surface-base mt-12 transition-colors duration-200">
            <div className="max-w-7xl mx-auto bg-surface-muted rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                
                {/* Top Section */}
                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
                    
                    {/* Left Column: Brand & Socials */}
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            Blue Murder
                        </h2>
                        <p className="text-slate-200 text-sm mb-8 leading-relaxed max-w-sm">
                            Wadah kreativitas dan kebersamaan Unit Kegiatan Mahasiswa Fakultas Teknik. Berkarya tanpa batas, bersaudara selamanya.
                        </p>
                        
                        <div className="flex items-center gap-4 text-slate-200">
                            <a href="#" className="hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">
                                <IconBrandInstagram stroke={1.5} size={28} />
                            </a>
                            <a href="#" className="hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">
                                <IconBrandYoutube stroke={1.5} size={28} />
                            </a>
                            <a href="#" className="hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">
                                <IconBrandTiktok stroke={1.5} size={28} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Links */}
                    <div className="lg:w-2/3 grid grid-cols-2 gap-8 text-sm md:text-base">
                        {/* Menu Utama */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-white font-bold mb-2">Menu Utama</h3>
                            <Link href="/" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Beranda</Link>
                            <Link href="/artikel" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Artikel</Link>
                            <Link href="/galeri" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Galeri</Link>
                        </div>

                        {/* Profil */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-white font-bold mb-2">Profil</h3>
                            <Link href="/profil/tentang-kami" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Tentang Kami</Link>
                            <Link href="/profil/struktur-organisasi" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Struktur Organisasi</Link>
                            <Link href="/profil/logo-bm" className="text-slate-300 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none transition-colors">Logo BM</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Watermark / Copyright */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-between items-end px-8 pb-4 pointer-events-none select-none opacity-10">
                    <span className="text-[12vw] font-black leading-[0.75] text-white tracking-tighter">
                        blue murder.
                    </span>
                    <span className="text-[10vw] font-black leading-[0.75] text-white tracking-tighter">
                        ©{currentYear}
                    </span>
                </div>
                
            </div>
        </footer>
    );
}
