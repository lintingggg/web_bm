import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Hero({ 
    title, 
    subtitle, 
    images = [] 
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Otomatis mengganti gambar setiap 5 detik
    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Slideshow */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="popLayout">
                    {images.length > 0 ? (
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`Hero Background ${currentIndex + 1}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-neutral-900" />
                    )}
                </AnimatePresence>
                {/* Overlay gelap agar teks tetap terbaca */}
                <div className="absolute inset-0 bg-black/50 z-0" />
            </div>

            {/* Teks Konten */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 max-w-5xl leading-tight drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl leading-relaxed drop-shadow-md"
                    >
                        {subtitle}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a 
                        href="#about"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-surface-base bg-accent-primary hover:bg-accent-primary/90 rounded-full transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
                    >
                        Jelajahi Karya Kami
                    </a>
                </motion.div>
            </div>

            {/* Indikator Titik (Dots) opsional */}
            {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
