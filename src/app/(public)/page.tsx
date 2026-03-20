'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Award,
  Factory,
  Users,
  Heart,
  ChevronRight,
  Star,
  TrendingUp,
  CheckCircle,
  Play,
  Globe,
  Truck,
  Zap,
} from 'lucide-react';

// Custom Crafted Icons
const CraftedShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12L11 14L15 10" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CraftedZap = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#zapGradient)" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <defs>
      <linearGradient id="zapGradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--gold)" />
        <stop offset="1" stopColor="var(--gold-dark)" />
      </linearGradient>
    </defs>
  </svg>
);

const CraftedGlobe = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M12 2C14.501 4.501 16 8.163 16 12C16 15.837 14.501 19.499 12 22C9.499 19.499 8 15.837 8 12C8 8.163 9.499 4.501 12 2Z" stroke="var(--gold)" strokeWidth="1.5" />
  </svg>
);

const CraftedUsers = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2524 22.1614 16.5523C21.6184 15.8522 20.8581 15.3516 20 15.13" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25393 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75607 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: { cloudinaryUrl: string }[];
}

const stats = [
  { value: '25+', label: 'Years of Trust', icon: CraftedShield, color: 'var(--gold)', desc: 'Consistent quality and reliability since 1999.' },
  { value: '150M+', label: 'Monthly Output', icon: CraftedZap, color: 'var(--primary)', desc: 'High-speed production at our modern facility.' },
  { value: '12', label: 'West African Markets', icon: CraftedGlobe, color: 'var(--accent)', desc: 'Expanding our reach across the ECOWAS region.' },
  { value: '10k+', label: 'Skilled Workforce', icon: CraftedUsers, color: 'var(--success)', desc: 'Dedicated team committed to excellence.' },
];

const features = [
  {
    icon: Shield,
    title: 'NAFDAC Approved',
    description: 'All products meet stringent regulatory standards.',
  },
  {
    icon: Award,
    title: 'ISO Certified',
    description: 'Certified under international management standards.',
  },
  {
    icon: Factory,
    title: 'Modern Factory',
    description: 'Equipped with latest manufacturing technology.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Promoting education across Nigeria.',
  },
];

export default function HomePage() {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Limit to 4 products for homepage
        if (Array.isArray(data)) {
          setFetchedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* Hero Section - Redesigned for Visual Excellence */}
      <section
        className="hero-section-refined"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
          paddingBottom: '80px',
          background: 'var(--gray-50)',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic Background Elements */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          {/* Animated Mesh/Grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(10, 77, 162, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }} />

          {/* Large Background Decorative Text (Visible on Mobile for depth) */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(5rem, 20vw, 12rem)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(10, 77, 162, 0.05)',
            whiteSpace: 'nowrap',
            zIndex: 0,
            pointerEvents: 'none',
            letterSpacing: '0.1em'
          }}>
            NIGER SANITARY
          </div>

          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(5rem, 20vw, 12rem)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(212, 175, 55, 0.05)',
            whiteSpace: 'nowrap',
            zIndex: 0,
            pointerEvents: 'none',
            letterSpacing: '0.1em'
          }}>
            EXCELLENCE
          </div>

          {/* Morphing Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(10, 77, 162, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              borderRadius: '50%',
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -120, 0],
              y: [0, 80, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute',
              bottom: '-15%',
              right: '-5%',
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
              filter: 'blur(100px)',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Floating Icons (Mobile & Desktop) */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '25%', left: '5%', color: 'var(--primary)', opacity: 0.15, zIndex: 1 }}
        >
          <Shield size={64} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', bottom: '25%', right: '8%', color: 'var(--gold)', opacity: 0.15, zIndex: 1 }}
        >
          <Star size={48} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', top: '40%', right: '5%', color: 'var(--accent)', opacity: 0.1, zIndex: 1 }}
        >
          <Heart size={80} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="responsive-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '60px',
            alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ textAlign: 'left' }}
              className="hero-text-content"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 20px',
                  marginBottom: '32px',
                  color: 'var(--primary-dark)',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  boxShadow: '0 4px 20px rgba(10, 77, 162, 0.08)',
                  border: '1px solid var(--gray-100)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />
                Premium Manufacturing Leader
              </motion.div>

              <h1 style={{
                fontSize: 'clamp(2.75rem, 8vw, 4.8rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                color: 'var(--primary-dark)',
              }}>
                Redefining <br />
                <span className="text-gradient-gold" style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.2))' }}>Standard of Care</span> <br />
                <span style={{ fontSize: '0.4em', verticalAlign: 'middle', opacity: 0.5, fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginTop: '12px' }}>Empowering Millions Since 1999</span>
              </h1>

              <p style={{
                color: 'var(--gray-600)',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                marginBottom: '48px',
                maxWidth: '600px',
                fontWeight: 500,
              }}>
                Precision engineering meets clinical trust. We deliver cutting-edge healthcare manufacturing solutions across the West African region.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }} className="hero-button-group">
                <Link href="/products" className="btn btn-lg" style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  padding: '18px 44px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 12px 30px rgba(10, 77, 162, 0.25)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>Explore Our Products</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: '-50%',
                      background: 'conic-gradient(from 0deg, transparent 0% 80%, rgba(255,255,255,0.2) 100%)',
                      zIndex: 0,
                    }}
                  />
                </Link>
                <Link href="/about" className="btn btn-lg" style={{
                  borderRadius: 'var(--radius-full)',
                  background: 'white',
                  border: '1.5px solid var(--gray-200)',
                  color: 'var(--gray-700)',
                  padding: '18px 44px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}>
                  Our Heritage
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="hero-media-container"
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'relative', padding: '20px' }}>
                {/* Main Image Container with Premium Border */}
                <div style={{
                  borderRadius: '40px',
                  overflow: 'hidden',
                  aspectRatio: '0.85',
                  // boxShadow: '0 50px 100px -20px rgba(10, 77, 162, 0.2)',
                  border: '12px solid white',
                  background: 'white',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  <img src="/hero.png" alt="State of the art facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 77, 162, 0.2), transparent)',
                    mixBlendMode: 'multiply'
                  }} />
                </div>

                {/* Decorative Back Shape */}
                <div style={{
                  position: 'absolute',
                  inset: '0 -20px -20px 20px',
                  background: 'var(--gradient-gold)',
                  zIndex: 1,
                  opacity: 0.15,
                }} />

                {/* Floating Metrics Badge */}
                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '5%',
                    right: '-8%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: '24px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ color: 'var(--gold-dark)', fontWeight: 900, fontSize: '2rem', lineHeight: 1 }}>150M+</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gray-500)', letterSpacing: '0.1em', marginTop: '4px' }}>Units Monthly</div>
                  <div style={{
                    marginTop: '12px',
                    height: '4px',
                    background: 'var(--gray-100)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      animate={{ width: ['0%', '85%', '85%'] }}
                      transition={{ duration: 2, delay: 1 }}
                      style={{ height: '100%', background: 'var(--gold)', borderRadius: '2px' }}
                    />
                  </div>
                </motion.div>

                {/* Quality Badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-10%',
                    background: 'var(--primary-dark)',
                    color: 'white',
                    padding: '16px 20px',
                    borderRadius: '20px',
                    boxShadow: '0 15px 30px rgba(10, 77, 162, 0.2)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    // borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>ISO 9001:2015</div>
                    <div style={{ fontSize: '0.625rem', opacity: 0.7, textTransform: 'uppercase' }}>Certified Quality</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curved Divider */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 5,
          color: 'var(--white)'
        }}>
          <svg viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
            <path d="M0 120L60 110C120 100 240 80 360 73.3C480 66.7 600 73.3 720 80C840 86.7 960 93.3 1080 86.7C1200 80 1320 60 1380 50L1440 40V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" />
          </svg>
        </div>
      </section>

      {/* Stats Cards - Sleeker & More Compact */}
      <section style={{ padding: '0 0 80px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginTop: '-25px',
            position: 'relative',
            zIndex: 20
          }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="perspective-1000 group" style={{ height: '180px' }}>
                <motion.div
                  className="preserve-3d relative w-full h-full duration-700 transition-transform"
                  whileHover={{ rotateY: 180 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Side */}
                  <div className="backface-hidden absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="stat-card-refined" style={{
                      background: 'white',
                      height: '100%',
                      padding: '28px 20px',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                      border: '1px solid var(--gray-100)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      ['--accent-color' as string]: stat.color
                    } as any}>
                      <div style={{
                        color: stat.color,
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'center'
                      }} className="stat-icon-box">
                        {(() => {
                          const Icon = stat.icon;
                          return <Icon />;
                        })()}
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '4px' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', letterSpacing: '0.05em' }}>{stat.label}</div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <div style={{
                      background: 'var(--primary-dark)',
                      height: '100%',
                      borderRadius: 'var(--radius-xl)',
                      padding: '24px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <p style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>{stat.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - With Flip Animation */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">Our Range</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>High-Performance Products</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {loading ? (
              // Skeleton Loader
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-card" style={{ height: '360px', borderRadius: 'var(--radius-xl)', background: 'var(--gray-100)' }} />
              ))
            ) : fetchedProducts.map((product, i) => (
              <div key={product.slug} className="perspective-1000 group" style={{ height: '360px' }}>
                <motion.div
                  className="preserve-3d relative w-full h-full duration-700 transition-transform"
                  whileHover={{ rotateY: 180 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Side */}
                  <div className="backface-hidden absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                    <div style={{
                      background: 'white',
                      height: '100%',
                      borderRadius: 'var(--radius-xl)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid var(--gray-100)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{
                        background: 'var(--gray-50)',
                        borderRadius: 'var(--radius-lg)',
                        height: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        overflow: 'hidden'
                      }}>
                        {product.images?.[0]?.cloudinaryUrl ? (
                          <img
                            src={product.images[0].cloudinaryUrl}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
                          />
                        ) : (
                          <div style={{ fontSize: '48px', opacity: 0.2 }}>📦</div>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>{product.name}</h3>
                      <p style={{
                        fontSize: '0.8125rem',
                        color: 'var(--gray-500)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>{product.description}</p>
                      <div style={{ marginTop: 'auto', textAlign: 'right', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>Flip for spec <ArrowRight size={14} style={{ display: 'inline' }} /></div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <div style={{
                      background: 'var(--primary-dark)',
                      height: '100%',
                      borderRadius: 'var(--radius-xl)',
                      padding: '32px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: 'var(--gold)' }}>Quick Specs</h3>
                      <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', marginBottom: '24px' }}>
                        <li style={{ marginBottom: '8px', opacity: 0.8 }}>• ISO Certified Production</li>
                        <li style={{ marginBottom: '8px', opacity: 0.8 }}>• 100% Skin Friendly</li>
                        <li style={{ marginBottom: '8px', opacity: 0.8 }}>• High Absorbency Core</li>
                      </ul>
                      <Link href={`/products/${product.slug}`} className="btn btn-sm" style={{ background: 'var(--gold)', color: 'white', alignSelf: 'center' }}>
                        View Detail
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing & Features - Premium Responsive Section */}
      <section className="section section-manufacturing" style={{ background: 'white', padding: '100px 0', borderTop: '1px solid var(--gray-50)' }}>
        <div className="container">
          <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <motion.div {...fadeInUp}>
              <div style={{ marginBottom: '32px' }}>
                <span className="section-label">Manufacturing Excellence</span>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>
                  Precision Engineering <br />
                  <span className="text-gradient-gold">Sustainable Production</span>
                </h2>
                <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '540px' }}>
                  Our ultra-modern facility in Niger State utilizes automated systems to ensure every product meets pharmaceutical-grade hygiene standards.
                </p>
              </div>

              <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '20px',
                      background: 'var(--gray-50)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--gray-100)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      color: 'var(--gold)',
                      padding: '10px',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <f.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9375rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>{f.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', lineHeight: 1.4 }}>{f.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '0 40px 80px -20px rgba(10, 77, 162, 0.15)',
                border: '1px solid var(--gray-100)'
              }}>
                <img src="/hero-bg.jpg" alt="Niger Sanitary Modern Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 77, 162, 0.3), transparent)' }} />
              </div>

              {/* Decorative Accent on Image */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'var(--gold)',
                borderRadius: '50%',
                opacity: 0.1,
                filter: 'blur(30px)',
                zIndex: -1
              }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - More Sleek */}
      <section style={{ padding: '100px 0', background: 'var(--primary-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--gold), transparent)', opacity: 0.05 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Ready to partner?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 40px' }}>Join our growing network of distributors across West Africa and bring quality healthcare to your community.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/distributor" className="btn btn-lg" style={{ background: 'var(--gold)', color: 'white' }}>Become a Partner</Link>
            <Link href="/contact" className="btn btn-lg" style={{ border: '2.5px solid rgba(255,255,255,0.1)', color: 'white' }}>Contact Sales</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
