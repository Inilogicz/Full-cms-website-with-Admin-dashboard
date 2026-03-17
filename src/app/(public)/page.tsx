'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const products = [
  {
    name: 'LadySept Sanitary Towels',
    description: 'Premium quality sanitary pads for maximum comfort and protection.',
    category: 'Feminine Care',
    slug: 'ladysept-sanitary-towels',
    color: '#E3F2FD',
    icon: '🩹',
  },
  {
    name: 'Damson Serviette',
    description: 'Soft, absorbent serviettes for everyday hygiene needs.',
    category: 'Hygiene',
    slug: 'damson-serviette',
    color: '#F0F7FF',
    icon: '🧻',
  },
  {
    name: 'Absorbent Cotton Wool',
    description: 'Medical-grade cotton wool for healthcare and personal care.',
    category: 'Medical',
    slug: 'absorbent-cotton-wool',
    color: '#E8F5E9',
    icon: '🏥',
  },
  {
    name: 'Damson Underpad',
    description: 'High-absorbency underpads for patient care and hygiene.',
    category: 'Medical',
    slug: 'damson-underpad',
    color: '#FFF3E0',
    icon: '🛏️',
  },
];

const stats = [
  { value: '20+', label: 'Years of Excellence', icon: TrendingUp },
  { value: '100M+', label: 'Products Manufactured', icon: Factory },
  { value: '5,000+', label: 'Distribution Points', icon: Users },
  { value: '100%', label: 'Quality Certified', icon: Award },
];

const features = [
  {
    icon: Shield,
    title: 'NAFDAC Approved',
    description: 'All products meet stringent regulatory standards and carry NAFDAC registration.',
  },
  {
    icon: Award,
    title: 'ISO Certified',
    description: 'Manufacturing processes certified under international quality management standards.',
  },
  {
    icon: Factory,
    title: 'State-of-the-Art Factory',
    description: 'Modern production lines equipped with latest manufacturing technology.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Active CSR programs promoting menstrual health education across Nigeria.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        background: 'var(--white)',
        overflow: 'hidden',
      }}>
        {/* Background Visuals */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          zIndex: 1,
        }} className="hero-image-container">
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-hero)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--white) 0%, transparent 20%, transparent 80%, rgba(10, 77, 162, 0.1) 100%)',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
            alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary-50)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 16px',
                marginBottom: '24px',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                <Star size={14} fill="var(--primary)" />
                Nigeria&apos;s Healthcare Manufacturing Leader
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: '24px',
                letterSpacing: '-0.03em',
                color: 'var(--gray-900)',
              }}>
                Excellence in <br />
                <span style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Hygiene & Care
                </span>
              </h1>

              <p style={{
                color: 'var(--gray-600)',
                fontSize: '1.1875rem',
                lineHeight: 1.6,
                marginBottom: '40px',
                maxWidth: '540px',
              }}>
                Niger Sanitary Industry Limited manufactures premium quality sanitary towels, medical consumables, and hygiene products trusted by millions across West Africa.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/products" className="btn btn-lg btn-primary" style={{ minWidth: '200px' }}>
                  Our Products
                  <ArrowRight size={18} />
                </Link>
                <Link href="/distributor" className="btn btn-lg btn-secondary" style={{ minWidth: '200px' }}>
                  Distributor Portal
                </Link>
              </div>

              {/* Trust Indicators */}
              <div style={{
                marginTop: '56px',
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                opacity: 0.7,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                  <Shield size={20} className="text-primary" /> NAFDAC Certified
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                  <CheckCircle size={20} className="text-primary" /> ISO Compliant
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-card-container"
            >
              <div className="glass" style={{
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                maxWidth: '380px',
                marginLeft: 'auto',
                boxShadow: 'var(--shadow-xl)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--primary)',
                }}>
                  <Factory size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--gray-900)' }}>Modern Facility</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', marginBottom: '0' }}>
                  Our state-of-the-art production lines in Niger State utilize the latest technology to ensure international quality standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 1024px) {
            section { min-height: auto !important; padding: 140px 0 80px !important; }
            .hero-image-container { width: 100% !important; opacity: 0.15 !important; }
            section > .container > div { grid-template-columns: 1fr !important; }
            .hero-card-container { display: none !important; }
          }
          @media (min-width: 1025px) {
            .hero-image-container { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%); }
          }
        `}</style>
      </section>


      {/* Stats Bar */}
      <section style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-100)',
        padding: '0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--gray-100)',
            margin: '0 -24px',
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  background: 'var(--white)',
                }}
              >
                <stat.icon size={24} style={{ color: 'var(--primary)', marginBottom: '8px' }} />
                <div style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: 'var(--gray-900)',
                  marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <span className="section-label">Our Products</span>
            <h2 className="section-title">Quality You Can Trust</h2>
            <p className="section-subtitle">
              From sanitary pads to medical consumables, every product is crafted with precision and care in our state-of-the-art facility.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {products.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/products/${product.slug}`} style={{ display: 'block' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <div style={{
                      background: product.color,
                      padding: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '64px',
                    }}>
                      {product.icon}
                    </div>
                    <div className="card-body">
                      <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                        {product.category}
                      </span>
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '16px' }}>
                        {product.description}
                      </p>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}>
                        Learn More <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/products" className="btn btn-primary">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            <motion.div {...fadeInUp}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  fontSize: '120px',
                  opacity: 0.3,
                }}>
                  🏭
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  color: 'white',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '4px' }}>
                    Manufacturing Excellence
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    Modern production facility in Niger State, Nigeria
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <span className="section-label">About Us</span>
              <h2 style={{ marginBottom: '20px' }}>
                Pioneering Healthcare Manufacturing in Nigeria
              </h2>
              <p style={{
                color: 'var(--gray-600)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}>
                Niger Sanitary Industry Limited is at the forefront of sanitary product manufacturing
                in West Africa. With decades of experience and a commitment to quality, we produce
                essential healthcare products that improve the lives of millions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {[
                  'NAFDAC approved manufacturing facility',
                  'ISO certified quality management',
                  'State-of-the-art production technology',
                  'Commitment to women\'s health education',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--gray-700)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            section > .container > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Manufacturing Excellence</h2>
            <p className="section-subtitle">
              We combine international standards with local expertise to deliver products you can trust.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="card" style={{ height: '100%' }}>
                  <div className="card-body" style={{ padding: '32px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--primary-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}>
                      <feature.icon size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '10px' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor CTA */}
      <section style={{
        background: 'var(--gradient-primary)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div {...fadeInUp}>
            <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>
              Become a Distribution Partner
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.125rem',
              maxWidth: '560px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}>
              Join our growing network of distributors across Nigeria and West Africa.
              Partner with a trusted brand that delivers quality and value.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/distributor" className="btn btn-lg" style={{
                background: 'var(--white)',
                color: 'var(--primary)',
                fontWeight: 700,
              }}>
                Apply Now <ArrowRight size={18} />
              </Link>
              <Link href="/products" className="btn btn-lg" style={{
                background: 'transparent',
                color: 'var(--white)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section">
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <motion.div {...fadeInUp}>
            <span className="section-label">Stay Updated</span>
            <h2 className="section-title">Subscribe to Our Newsletter</h2>
            <p className="section-subtitle">
              Get the latest updates on our products, events, and health education resources.
            </p>
            <form style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '480px',
              margin: '0 auto',
            }}
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                try {
                  await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  alert('Thank you for subscribing!');
                  form.reset();
                } catch {
                  alert('Something went wrong. Please try again.');
                }
              }}
            >
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="form-input"
                required
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
