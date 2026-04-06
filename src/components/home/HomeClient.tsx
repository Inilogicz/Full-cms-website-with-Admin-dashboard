'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Award,
  Factory,
  Users,
  Heart,
  Star,
  ArrowRight,
} from 'lucide-react';

import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

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

const iconMap: Record<string, any> = {
  Shield: CraftedShield,
  Zap: CraftedZap,
  Globe: CraftedGlobe,
  Users: CraftedUsers,
  Award: Award,
  Factory: Factory,
  Heart: Heart,
  Star: Star,
};

const defaultStats = [
  { value: '25+', label: 'Years of Trust', icon: 'Shield', color: 'var(--gold)', desc: 'Consistent quality and reliability since 1999.' },
  { value: '150M+', label: 'Monthly Output', icon: 'Zap', color: 'var(--primary)', desc: 'High-speed production at our modern facility.' },
  { value: '12', label: 'West African Markets', icon: 'Globe', color: 'var(--accent)', desc: 'Expanding our reach across the ECOWAS region.' },
  { value: '10k+', label: 'Skilled Workforce', icon: 'Users', color: 'var(--success)', desc: 'Dedicated team committed to excellence.' },
];

const defaultFeatures = [
  {
    icon: 'Shield',
    title: 'NAFDAC Approved',
    description: 'All products meet stringent regulatory standards.',
  },
  {
    icon: 'Award',
    title: 'ISO Certified',
    description: 'Certified under international management standards.',
  },
  {
    icon: 'Factory',
    title: 'Modern Factory',
    description: 'Equipped with latest manufacturing technology.',
  },
  {
    icon: 'Heart',
    title: 'Community Impact',
    description: 'Promoting education across Nigeria.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface HomeClientProps {
  settings: any;
  products: any[];
}

export default function HomeClient({ settings, products }: HomeClientProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const statsToDisplay = settings?.stats?.length > 0 ? settings.stats : defaultStats;
  const featuresToDisplay = settings?.features?.length > 0 ? settings.features : defaultFeatures;

  return (
    <div className="homepage-wrapper">
      {/* Hero Section */}
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
        <FloatingProductBackground
          theme="light"
          intensity={60}
          images={[
            { url: '/product1.JPG', top: '12%', left: '4%', size: '130px', mobileSize: '70px', delay: 0.2, opacity: 0.25 },
            { url: '/product6.JPG', top: '75%', left: '6%', size: '160px', mobileSize: '90px', delay: 0.6, opacity: 0.3 },
            { url: '/product10.JPG', top: '15%', left: '88%', size: '145px', mobileSize: '80px', delay: 1.0, opacity: 0.25 },
            { url: '/product4.JPG', top: '80%', left: '85%', size: '170px', mobileSize: '95px', delay: 1.4, opacity: 0.3 },
          ]}
        />

        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(10, 77, 162, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }} />

          <div style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(5rem, 20vw, 12rem)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(10, 77, 162, 0.03)',
            whiteSpace: 'nowrap',
            zIndex: 0,
            pointerEvents: 'none',
            letterSpacing: '0.1em'
          }}>
            NIGER SANITARY INDUSTRY LIMITED
          </div>
        </div>

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
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'left' }}
              className="hero-text-content"
            >
              <h1 style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                fontWeight: 950,
                lineHeight: 1.1,
                marginBottom: '28px',
                color: 'var(--primary-dark)',
              }}>
                {settings?.heroTitle || (
                  <>
                    Nigeria&apos;s Leading Producer of <br />
                    <span className="text-primary">Sanitary Pads & Medical Consumables</span>
                  </>
                )}
              </h1>

              <p style={{
                color: 'var(--gray-600)',
                fontSize: 'clamp(1.125rem, 2vw, 1.3rem)',
                lineHeight: 1.7,
                marginBottom: '48px',
                maxWidth: '680px',
              }}>
                {settings?.heroSubtitle || "Quality, Affordable, and Trusted brands for Hospitals, Health Centres, and Households."}
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link href="/products" className="btn btn-lg" style={{ background: 'var(--primary)', color: 'white' }}>
                  Explore Collection
                </Link>
                <Link href="/about" className="btn btn-lg" style={{ background: 'white', border: '1px solid var(--primary-100)' }}>
                  Our Heritage
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div style={{
                borderRadius: '40px',
                overflow: 'hidden',
                aspectRatio: '0.85',
                boxShadow: '0 50px 100px -20px rgba(10, 77, 162, 0.25)',
                border: '12px solid white',
              }}>
                <img src={settings?.heroImage || "/product6.JPG"} alt="Healthcare Manufacturer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '0 0 80px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '-25px',
            zIndex: 20,
            position: 'relative'
          }}>
            {statsToDisplay.map((stat: any) => {
              const Icon = iconMap[stat.icon] || CraftedShield;
              return (
                <div key={stat.label} style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--gray-100)', textAlign: 'center' }}>
                  <div style={{ color: stat.color, marginBottom: '12px', display: 'flex', justifyContent: 'center' }}><Icon /></div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-500)' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>High-Performance Products</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {products.map((product) => (
              <div key={product.slug} style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--gray-100)' }}>
                <img src={product.images?.[0]?.cloudinaryUrl || '/product1.JPG'} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginTop: '20px' }}>{product.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '8px' }}>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <motion.div {...fadeInUp}>
              <span className="section-label">{settings?.aboutTitle || "Manufacturing Excellence"}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '24px' }}>{settings?.aboutSubtitle || "Sustainable Production"}</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '40px' }}>{settings?.aboutDescription || "Our ultra-modern facility in Niger State..."}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {featuresToDisplay.map((f: any) => {
                  const Icon = (iconMap[f.icon] as any) || Shield;
                  return (
                    <div key={f.title} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                      <div style={{ color: 'var(--gold)' }}><Icon size={24} /></div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{f.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{f.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <div style={{ borderRadius: '40px', overflow: 'hidden' }}>
              <img src={settings?.aboutImage || "/hero-bg.jpg"} alt="About" style={{ width: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
