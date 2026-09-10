import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Front/Navbar';
import FrontFooter from '@/Components/Front/FrontFooter';

export default function FrontLayout({ children, title = 'Beranda' }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-surface-base transition-colors duration-200">
            <Head title={title} />
            
            {/* Navbar */}
            <Navbar forceVisible={title !== 'Beranda'} />

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <FrontFooter />
        </div>
    );
}
