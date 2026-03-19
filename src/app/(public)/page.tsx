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
      {/* Hero Section - Lightened */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
        overflow: 'hidden',
      }}>
        {/* Background layer with lower opacity for "airy" feel */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
           
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // opacity: 0.75, 
            y: y1,
          }}
        />

        {/* Lighter overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%)',
          zIndex: 1,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: '40px',
            alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--gold-50)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 16px',
                  marginBottom: '24px',
                  color: 'var(--gold-dark)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                Premium Healthcare Leader
              </motion.div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '20px',
                color: 'var(--primary-dark)',
              }}>
                Redefining <br />
                <span className="text-gradient-gold">Standard of Care</span>
              </h1>

              <p style={{
                color: 'var(--gray-600)',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                marginBottom: '40px',
                maxWidth: '560px',
              }}>
                Manufacturing excellence that empowers millions. Quality solutions delivered with integrity and local commitment.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/products" className="btn btn-lg" style={{
                  background: 'var(--gradient-gold)',
                  color: 'white',
                  padding: '16px 40px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 24px var(--gold-glow)'
                }}>
                  Explore Catalogue
                </Link>
                <Link href="/about" className="btn btn-lg btn-secondary" style={{
                  borderRadius: 'var(--radius-full)',
                  background: 'transparent',
                  border: '1.5px solid var(--gray-200)',
                  color: 'var(--gray-700)'
                }}>
                  Our Heritage
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-media-container"
            >
              <div style={{ position: 'relative', padding: '10px' }}>
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  boxShadow: '0 40px 100px -20px rgba(10, 77, 162, 0.15)',
                  border: '8px solid white',
                  background: 'white'
                }}>
                  <img src="/hero.png" alt="Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Floating Badge - Sleeker */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    background: 'white',
                    padding: '16px 24px',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    border: '1px solid var(--gray-50)'
                  }}
                >
                  <div style={{ color: 'var(--gold-dark)', fontWeight: 900, fontSize: '1.5rem' }}>100M+</div>
                  <div style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gray-400)', letterSpacing: '0.1em' }}>Units Yearly</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

      {/* Refined Content Sections */}
      <section className="section" style={{ background: 'white', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <motion.div {...fadeInUp}>
              <span className="section-label">Manufacturing</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>Precision Engineering <br /><span className="text-gold">Sustainable Production</span></h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '32px', fontSize: '1rem' }}>Our ultra-modern facility in Niger State utilizes automated systems to ensure every product meets pharmaceutical-grade hygiene standards.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--gold)', padding: '4px' }}><f.icon size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>{f.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', lineHeight: 1.3 }}>{f.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-premium"
              style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '4/3' }}
            >
              <img src="/hero-bg.jpg" alt="Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,77,162,0.4), transparent)' }} />
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
