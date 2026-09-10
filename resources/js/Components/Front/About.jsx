import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Balancer from 'react-wrap-balancer';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { IconArrowUpRight } from '@tabler/icons-react';

// Subcomponents for Hero04
function Cta({ cta }) {
  if (!cta) return null;
  const isDefault = !cta.variant || cta.variant === 'default';
  const customClass = isDefault 
    ? "bg-accent-primary hover:bg-accent-primary/90 text-surface-base font-bold border-none" 
    : "border-accent-primary text-accent-primary hover:bg-accent-primary/10 dark:text-accent-primary dark:border-accent-primary dark:hover:bg-accent-primary/10";
    
  return (
    <Button variant={cta.variant || "default"} size={cta.size || "default"} className={customClass} asChild>
      <a href={cta.link || "#"}>{cta.text}</a>
    </Button>
  );
}

function ArtCollage({ primaryImage, secondaryImage, primaryAlt, secondaryAlt }) {
  return (
    <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full h-full flex">
        <div className="absolute top-4 right-4 w-[65%] h-[75%] rounded-3xl overflow-hidden shadow-2xl z-10 border border-neutral-200 dark:border-neutral-800">
            <img src={primaryImage} alt={primaryAlt} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-4 left-4 w-[55%] h-[60%] rounded-3xl overflow-hidden shadow-xl z-20 border border-neutral-200 dark:border-neutral-800">
            <img src={secondaryImage} alt={secondaryAlt} className="w-full h-full object-cover" />
        </div>
    </div>
  );
}

const variantStyles = {
  standard: {
    section: 'py-20 sm:py-28',
    title: 'text-3xl sm:text-4xl md:text-5xl font-extrabold',
    description: 'max-w-md text-base text-neutral-600 dark:text-text-secondary',
    header: 'gap-6',
    grid: 'gap-12 lg:gap-16',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-2xl sm:text-3xl md:text-4xl font-extrabold',
    description: 'max-w-sm text-sm text-neutral-600 dark:text-text-secondary',
    header: 'gap-4',
    grid: 'gap-10 lg:gap-12',
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mediaItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ active, variants, className, children }) {
  if (!active) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={variants || item} className={className}>
      {children}
    </motion.div>
  );
}

export default function About({
  title = "Tentang Kami",
  titleLine2 = "Karya & Karsa.",
  description = "UKM FT Blue Murder adalah wadah kreativitas dan persaudaraan mahasiswa Teknik. Kami mengeksplorasi seni, musik, dan kebersamaan di satu tempat.",
  washImage = "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000",
  primaryImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
  secondaryImage = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000",
  primaryAlt = "Kegiatan 1",
  secondaryAlt = "Kegiatan 2",
  animation = "subtle",
  primaryCTA = { ctaEnabled: false, text: "Bergabung Bersama Kami", variant: "default" },
  secondaryCTA = { ctaEnabled: true, text: "Lihat Karya Kami", link: "#galeri" },
  variant = "standard",
}) {
  const reduce = useReducedMotion();
  const animate = animation === 'subtle' && !reduce;
  const vs = variantStyles[variant];

  const backgroundElement = washImage && (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 aspect-[2/3] md:aspect-square lg:aspect-video opacity-30 dark:opacity-10 blur-[100px] [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
    >
      <img
        src={washImage}
        alt=""
        className="h-full w-full object-cover object-top"
      />
    </div>
  );

  return (
    <section id="about" className="w-full px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-surface-base transition-colors duration-200">
      <div className="relative isolate w-full max-w-7xl mx-auto overflow-hidden bg-white dark:bg-surface-muted rounded-[2rem] shadow-xl border border-neutral-100 dark:border-surface-muted/50">
        
        <motion.div
          className={cn(
            'relative z-10 grid grid-cols-1 items-center px-8 lg:px-12 lg:grid-cols-2',
            vs.section,
            vs.grid,
          )}
          variants={animate ? container : undefined}
          initial={animate ? 'hidden' : false}
          whileInView={animate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Reveal
            active={animate}
            className={cn('flex flex-col items-start', vs.header)}
          >
            <h2
              className={cn(
                'text-neutral-900 dark:text-white tracking-tight',
                vs.title,
              )}
            >
              <Balancer>{title}</Balancer>
              {titleLine2 && (
                <>
                  <br />
                  <span className="text-blue-600 dark:text-accent-primary">
                    <Balancer>{titleLine2}</Balancer>
                  </span>
                </>
              )}
            </h2>
            <p className={vs.description}>
              <Balancer>{description}</Balancer>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              {secondaryCTA?.ctaEnabled && (
                <a 
                  href={secondaryCTA.link || "#galeri"} 
                  className="flex items-center gap-2 text-accent-orange font-bold hover:text-accent-orange/80 transition-colors group"
                >
                  {secondaryCTA.text}
                  <IconArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal active={animate} variants={mediaItem} className="w-full">
            <ArtCollage
              primaryImage={primaryImage}
              secondaryImage={secondaryImage}
              primaryAlt={primaryAlt}
              secondaryAlt={secondaryAlt}
            />
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
