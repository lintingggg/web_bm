import React from 'react';
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { IconHome } from '@tabler/icons-react';

export default function StrukturOrganisasi() {
    return (
        <FrontLayout title="Struktur Organisasi">
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
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Struktur Organisasi</span>
                    </div>

                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Struktur Organisasi
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
                            Bagan dan susunan kepengurusan struktural Unit Kegiatan Mahasiswa Fakultas Teknik Blue Murder.
                        </p>
                    </div>

                    {/* Main Content Box */}
                    <div className="bg-white dark:bg-surface-muted rounded-2xl border border-gray-200 dark:border-surface-muted/50 p-8 md:p-12 shadow-sm min-h-[300px] flex items-center justify-center text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            (Data Struktur Organisasi Belum Tersedia)
                        </p>
                    </div>

                </div>
            </div>
        </FrontLayout>
    );
}
