'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="hero" style={{ padding: '140px 0 60px', minHeight: 'auto' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '720px' }}
        >
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            <span className="dot" />
            {eyebrow}
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', marginBottom: 16 }}>{title}</h1>
          <p className="hero-sub">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
