import React from 'react';
import { motion } from 'framer-motion';
import { TikTokEmbed, InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed';

export default function SocialMediaEmbed({ posts = [] }) {
    if (!posts || posts.length === 0) {
        return null;
    }

    const renderEmbed = (post) => {
        switch (post.platform) {
            case 'tiktok':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <TikTokEmbed url={post.url} width="100%" />
                    </div>
                );
            case 'instagram':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <InstagramEmbed url={post.url} width="100%" />
                    </div>
                );
            case 'youtube':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <YouTubeEmbed url={post.url} width="100%" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-surface-base">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Sosial Media Kami
                        </h2>
                        <div className="w-24 h-1 bg-accent-primary mx-auto mb-6 rounded-full"></div>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Ikuti berbagai aktivitas, keseruan, dan pembaruan terbaru dari kami melalui sosial media resmi Blue Murder.
                        </p>
                    </motion.div>
                </div>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-gray-50 dark:bg-surface-muted rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            <div className="p-4 flex-grow flex items-center justify-center min-h-[400px]">
                                {renderEmbed(post)}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
