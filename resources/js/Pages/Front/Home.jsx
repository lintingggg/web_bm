import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Hero from '@/Components/Front/Hero';
import About from '@/Components/Front/About';
import LatestArticles from '@/Components/Front/LatestArticles';
import Agenda from '@/Components/Front/Agenda';
import Gallery from '@/Components/Front/Gallery';

export default function Home({ latestPosts, latestGalleries, heroSections = [], aboutSection, agendas = {} }) {
    const { webSetting } = usePage().props;

    // Use heroSections if available, otherwise fallback to default
    const slides = heroSections.length > 0 
        ? heroSections.map(hero => ({
            image: hero.image_url,
            title: hero.title || "Berkarya Tanpa Batas, Bersaudara Selamanya",
            subtitle: hero.subtitle || webSetting?.short_description || webSetting?.slogan || "Unit Kegiatan Mahasiswa Fakultas Teknik Blue Murder. Wadah kreativitas, pengembangan diri, dan kebersamaan mahasiswa teknik."
        }))
        : [
            {
                image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000",
                title: "Berkarya Tanpa Batas, Bersaudara Selamanya",
                subtitle: webSetting?.short_description || webSetting?.slogan || "Unit Kegiatan Mahasiswa Fakultas Teknik Blue Murder. Wadah kreativitas, pengembangan diri, dan kebersamaan mahasiswa teknik."
            },
            {
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000",
                title: "Berkarya Tanpa Batas, Bersaudara Selamanya",
                subtitle: webSetting?.short_description || webSetting?.slogan || "Unit Kegiatan Mahasiswa Fakultas Teknik Blue Murder. Wadah kreativitas, pengembangan diri, dan kebersamaan mahasiswa teknik."
            }
          ];

    return (
        <FrontLayout title="Beranda">
            {/* Hero Section */}
            <Hero slides={slides} />

            {/* Tentang Kami Section */}
            <About 
                title={aboutSection?.title || undefined}
                titleLine2={aboutSection?.title_line2 || undefined}
                description={aboutSection?.description || undefined}
                primaryImage={aboutSection?.primary_image_url || undefined}
                secondaryImage={aboutSection?.secondary_image_url || undefined}
            />

            {/* Artikel Terkini Section */}
            <LatestArticles posts={latestPosts} />

            {/* Agenda Section */}
            <Agenda agendasProp={agendas} />

            {/* Galeri Section */}
            <Gallery galleries={latestGalleries} />
        </FrontLayout>
    );
}
