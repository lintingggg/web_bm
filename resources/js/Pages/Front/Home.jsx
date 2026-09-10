import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/Components/Front/Hero';
import About from '@/Components/Front/About';
import LatestArticles from '@/Components/Front/LatestArticles';
import Agenda from '@/Components/Front/Agenda';
import Gallery from '@/Components/Front/Gallery';

export default function Home() {
    return (
        <FrontLayout title="Beranda">
            {/* Hero Section */}
            <Hero 
                title={<>Berkarya Tanpa Batas, <br/><span className="text-blue-400">Bersaudara Selamanya</span></>}
                subtitle="Unit Kegiatan Mahasiswa Fakultas Teknik Blue Murder. Wadah kreativitas, pengembangan diri, dan kebersamaan mahasiswa teknik."
                images={[
                    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000",
                    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000",
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000"
                ]}
            />

            {/* Tentang Kami Section */}
            <About />

            {/* Artikel Terkini Section */}
            <LatestArticles />

            {/* Agenda Section */}
            <Agenda />

            {/* Galeri Section */}
            <Gallery />
        </FrontLayout>
    );
}
