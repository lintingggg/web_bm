import * as React from "react";
import { ElasticGallery } from "@/Components/ui/elastic-gallery";

export default function Gallery({ galleries = [] }) {
  return (
    <section id="galeri" className="w-full self-start py-16 bg-white dark:bg-surface-base transition-colors duration-200 border-t border-neutral-100 dark:border-surface-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-text-primary sm:text-4xl">
                Galeri Foto
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-text-secondary">
                Dokumentasi momen dan karya terbaik kami.
            </p>
        </div>

        <ElasticGallery galleries={galleries} />
      </div>
    </section>
  );
}
