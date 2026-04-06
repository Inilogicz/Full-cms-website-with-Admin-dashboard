'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Layout, Type, MapPin, Layers, Image as ImageIcon, X, Move, BarChart3, Info, Share2, Phone, Search, Check, Shield, Zap, Globe, Users, Award, Factory, Heart, Star } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

// Icon Map for display
const iconList = [
    { name: 'Shield', icon: Shield },
    { name: 'Zap', icon: Zap },
    { name: 'Globe', icon: Globe },
    { name: 'Users', icon: Users },
    { name: 'Award', icon: Award },
    { name: 'Factory', icon: Factory },
    { name: 'Heart', icon: Heart },
    { name: 'Star', icon: Star },
];

interface StatItem {
    label: string;
    value: string;
    icon: string;
    desc: string;
    color: string;
}

interface MediaItem {
    id: string;
    cloudinaryUrl: string;
    altText?: string;
}

interface SiteSettings {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription?: string;
    heroImage?: string; // Main hero image
    stats: StatItem[];
    aboutTitle: string;
    aboutSubtitle: string;
    aboutDescription: string;
    aboutImage: string;
    aboutEstablishedText: string;
    aboutVision: string;
    aboutMission: string;
    aboutQuote: string;
    aboutHeritageStats: StatItem[];
    aboutLadySeptFeatures: string[];
    aboutFutureText: string;
    aboutStatBadgeValue: string;
    aboutStatBadgeLabel: string;
    aboutHeritageImages: any;
    aboutSupportTitle: string;
    aboutSupportDescription: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        whatsapp: string;
    };
    contactInfo: {
        email: string;
        phone: string;
        address: string;
        workingHours: string;
    };
}

const defaultStats: StatItem[] = [
    { value: '25+', label: 'Years of Trust', icon: 'Shield', color: 'var(--gold)', desc: 'Consistent quality and reliability since 1999.' },
    { value: '150M+', label: 'Monthly Output', icon: 'Zap', color: 'var(--primary)', desc: 'High-speed production at our modern facility.' },
    { value: '12', label: 'West African Markets', icon: 'Globe', color: 'var(--accent)', desc: 'Expanding our reach across the ECOWAS region.' },
    { value: '10k+', label: 'Skilled Workforce', icon: 'Users', color: 'var(--success)', desc: 'Dedicated team committed to excellence.' },
];

export default function AdminSettingsPage() {
    const { showToast } = useToast();
    const [settings, setSettings] = useState<any>(null);
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'about' | 'social'>('hero');
    
    // Media Picker State
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [pickingFor, setPickingFor] = useState<'hero' | 'about' | 'heritage' | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sRes, mRes] = await Promise.all([
                    fetch('/api/settings'),
                    fetch('/api/media')
                ]);
                const sData = await sRes.json();
                const mData = await mRes.json();

                if (sData && !sData.error) {
                    setSettings({
                        ...sData,
                        stats: sData.stats || defaultStats,
                        aboutHeritageStats: sData.aboutHeritageStats || [],
                        aboutLadySeptFeatures: sData.aboutLadySeptFeatures || [],
                        aboutVision: sData.aboutVision || '',
                        aboutMission: sData.aboutMission || '',
                        aboutEstablishedText: sData.aboutEstablishedText || '',
                        aboutQuote: sData.aboutQuote || '',
                        aboutFutureText: sData.aboutFutureText || '',
                        aboutStatBadgeValue: sData.aboutStatBadgeValue || '25+',
                        aboutStatBadgeLabel: sData.aboutStatBadgeLabel || 'Years of Excellence',
                        aboutHeritageImages: sData.aboutHeritageImages || [],
                        aboutSupportTitle: sData.aboutSupportTitle || '',
                        aboutSupportDescription: sData.aboutSupportDescription || '',
                        socialLinks: sData.socialLinks || { facebook: '', twitter: '', instagram: '', linkedin: '', whatsapp: '' },
                        contactInfo: sData.contactInfo || { email: '', phone: '', address: '', workingHours: '' }
                    });
                }
                if (Array.isArray(mData)) setMedia(mData);
            } catch (err) {
                showToast('Failed to fetch initial data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    async function handleSave() {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (!res.ok) throw new Error('Failed to update settings');
            showToast('Settings updated successfully', 'success');
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setSaving(false);
        }
    }

    const openMediaPicker = (field: 'hero' | 'about' | 'heritage') => {
        setPickingFor(field);
        setIsMediaPickerOpen(true);
    };

    const selectImage = (url: string) => {
        if (pickingFor === 'hero') setSettings({...settings, heroImage: url});
        if (pickingFor === 'about') setSettings({...settings, aboutImage: url});
        if (pickingFor === 'heritage') {
            const current = settings.aboutHeritageImages || [];
            if (!current.includes(url)) {
                setSettings({...settings, aboutHeritageImages: [...current, url]});
            }
        }
        setIsMediaPickerOpen(false);
        setPickingFor(null);
    };

    if (loading || !settings) return <div className="skeleton" style={{ height: '500px', borderRadius: '20px' }} />;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Homepage CMS</h1>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>Visual and content control for your landing page.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                    <Save size={18} />
                    <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="tabs-wrapper" style={{ display: 'flex', gap: '8px', background: 'var(--gray-100)', padding: '4px', borderRadius: 'var(--radius-lg)', width: 'fit-content', marginBottom: '32px' }}>
                {([
                    { id: 'hero', icon: ImageIcon, label: 'Hero Section' },
                    { id: 'stats', icon: BarChart3, label: 'Trust Stats' },
                    { id: 'about', icon: Info, label: 'About Section' },
                    { id: 'social', icon: Share2, label: 'Social & Contact' }
                ] as const).map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="card" style={{ padding: '32px' }}>
                {activeTab === 'hero' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                         <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Hero Main Title (Multiline)</label>
                                <textarea className="form-input" rows={4} value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} placeholder="Use newlines for better layout" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hero Subtitle</label>
                                <textarea className="form-input" rows={4} value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Main Image Display</label>
                            <div 
                                onClick={() => openMediaPicker('hero')}
                                style={{ 
                                    height: '240px', 
                                    borderRadius: '16px', 
                                    border: '2px dashed var(--gray-200)', 
                                    background: settings.heroImage ? `url(${settings.heroImage}) center/cover no-repeat` : 'var(--gray-50)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                                className="image-selector-hover"
                            >
                                {!settings.heroImage && (
                                    <div style={{ textAlign: 'center', color: 'var(--gray-400)' }}>
                                        <ImageIcon size={48} style={{ marginBottom: '12px' }} />
                                        <div style={{fontWeight: 700}}>Select Image from Media</div>
                                    </div>
                                )}
                                {settings.heroImage && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: '0.3s' }} className="image-overlay">
                                        <ImageIcon color="white" size={32} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Trust Metrics</h3>
                            <button className="btn btn-ghost" onClick={() => setSettings({...settings, stats: [...settings.stats, { label: 'New Metric', value: '0', icon: 'Shield', color: 'var(--primary)', desc: '' }]})}><Plus size={16} /> Add Metric</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {settings.stats.map((stat: any, i: number) => (
                                <div key={i} className="card" style={{ padding: '24px', background: 'var(--gray-50)', position: 'relative' }}>
                                    <div className="grid-4-cms" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 2fr 1fr auto', gap: '20px', alignItems: 'center' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label">Value</label>
                                            <input className="form-input" value={stat.value} onChange={e => {
                                                const ns = [...settings.stats]; ns[i].value = e.target.value; setSettings({...settings, stats: ns});
                                            }} />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label">Label</label>
                                            <input className="form-input" value={stat.label} onChange={e => {
                                                const ns = [...settings.stats]; ns[i].label = e.target.value; setSettings({...settings, stats: ns});
                                            }} />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label">Description</label>
                                            <input className="form-input" value={stat.desc} onChange={e => {
                                                const ns = [...settings.stats]; ns[i].desc = e.target.value; setSettings({...settings, stats: ns});
                                            }} />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label">Icon</label>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                                                {iconList.map(({ name, icon: Icon }) => (
                                                    <button
                                                        key={name}
                                                        onClick={() => {
                                                            const ns = [...settings.stats]; ns[i].icon = name; setSettings({...settings, stats: ns});
                                                        }}
                                                        style={{
                                                            padding: '8px',
                                                            borderRadius: '8px',
                                                            background: stat.icon === name ? 'var(--primary)' : 'white',
                                                            color: stat.icon === name ? 'white' : 'var(--gray-600)',
                                                            border: '1px solid var(--gray-200)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: '0.2s'
                                                        }}
                                                        title={name}
                                                    >
                                                        <Icon size={18} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSettings({...settings, stats: settings.stats.filter((_: any, idx: number) => idx !== i)})} 
                                            style={{ marginTop: '24px', color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {/* Section Header */}
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--gray-100)' }}>General About Info</h3>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">About Title</label>
                                    <input className="form-input" value={settings.aboutTitle} onChange={e => setSettings({...settings, aboutTitle: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">About Subtitle</label>
                                    <input className="form-input" value={settings.aboutSubtitle} onChange={e => setSettings({...settings, aboutSubtitle: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">About Description</label>
                                <textarea className="form-input" rows={6} value={settings.aboutDescription} onChange={e => setSettings({...settings, aboutDescription: e.target.value})} />
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Established Text</label>
                                    <input className="form-input" value={settings.aboutEstablishedText} onChange={e => setSettings({...settings, aboutEstablishedText: e.target.value})} placeholder="Established Since 1999" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Featured Image</label>
                                    <div 
                                        onClick={() => openMediaPicker('about')}
                                        style={{ 
                                            height: '120px', 
                                            borderRadius: '16px', 
                                            border: '2px dashed var(--gray-200)', 
                                            background: settings.aboutImage ? `url(${settings.aboutImage}) center/cover no-repeat` : 'var(--gray-50)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {!settings.aboutImage && <ImageIcon size={24} color="var(--gray-300)" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vision & Mission */}
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--gray-100)' }}>Vision & Mission</h3>
                            <div className="form-group">
                                <label className="form-label">Our Vision</label>
                                <textarea className="form-input" rows={3} value={settings.aboutVision} onChange={e => setSettings({...settings, aboutVision: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Our Mission</label>
                                <textarea className="form-input" rows={3} value={settings.aboutMission} onChange={e => setSettings({...settings, aboutMission: e.target.value})} />
                            </div>
                        </div>

                        {/* Heritage Stats & Images */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Heritage Stats (Personnel, ISO, etc.)</h3>
                                <button className="btn btn-ghost" onClick={() => setSettings({...settings, aboutHeritageStats: [...(settings.aboutHeritageStats || []), { label: 'New Metric', value: '0', icon: 'Shield', color: 'var(--primary)', desc: '' }]})}><Plus size={16} /> Add Stat</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                                {(settings.aboutHeritageStats || []).map((stat: any, i: number) => (
                                    <div key={i} className="card" style={{ padding: '16px', background: 'var(--gray-50)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                                            <button onClick={() => {
                                                const ns = [...settings.aboutHeritageStats]; ns.splice(i, 1); setSettings({...settings, aboutHeritageStats: ns});
                                            }} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                        <div className="grid-2">
                                            <input className="form-input" placeholder="Value (e.g. 5000+)" value={stat.value} onChange={e => {
                                                const ns = [...settings.aboutHeritageStats]; ns[i].value = e.target.value; setSettings({...settings, aboutHeritageStats: ns});
                                            }} />
                                            <input className="form-input" placeholder="Label" value={stat.label} onChange={e => {
                                                const ns = [...settings.aboutHeritageStats]; ns[i].label = e.target.value; setSettings({...settings, aboutHeritageStats: ns});
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Heritage Slideshow Images</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                                {(settings.aboutHeritageImages || []).map((url: string, i: number) => (
                                    <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button 
                                            onClick={() => {
                                                const ni = [...settings.aboutHeritageImages]; ni.splice(i, 1); setSettings({...settings, aboutHeritageImages: ni});
                                            }}
                                            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => { setPickingFor('heritage'); setIsMediaPickerOpen(true); }}
                                    style={{ aspectRatio: '1', border: '2px dashed var(--gray-200)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--gray-400)', background: 'none', cursor: 'pointer' }}
                                >
                                    <Plus size={24} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Add Image</span>
                                </button>
                            </div>
                        </div>

                        {/* Floating Badge (25+ Years of Excellence) */}
                        <div style={{ padding: '24px', background: 'var(--gray-50)', borderRadius: '24px', border: '1px solid var(--gray-100)' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '20px' }}>Floating Stat Badge (Golden Badge)</h3>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Badge Value (e.g. 25+)</label>
                                    <input className="form-input" value={settings.aboutStatBadgeValue} onChange={e => setSettings({...settings, aboutStatBadgeValue: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Badge Label (e.g. Years of Excellence)</label>
                                    <input className="form-input" value={settings.aboutStatBadgeLabel} onChange={e => setSettings({...settings, aboutStatBadgeLabel: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Product Highlights & Quote */}
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--gray-100)' }}>Product Highlight & Quote</h3>
                            <div className="form-group">
                                <label className="form-label">Endorsement Quote</label>
                                <textarea className="form-input" rows={2} value={settings.aboutQuote} onChange={e => setSettings({...settings, aboutQuote: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LadySept Key Features (One per line)</label>
                                <textarea 
                                    className="form-input" 
                                    rows={5} 
                                    value={(settings.aboutLadySeptFeatures || []).join('\n')} 
                                    onChange={e => setSettings({...settings, aboutLadySeptFeatures: e.target.value.split('\n')})} 
                                />
                            </div>
                        </div>

                        {/* Future & Support */}
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--gray-100)' }}>Future Optimism & Support</h3>
                            <div className="form-group">
                                <label className="form-label">Future Optimism Text</label>
                                <textarea className="form-input" rows={4} value={settings.aboutFutureText} onChange={e => setSettings({...settings, aboutFutureText: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Support Title</label>
                                <input className="form-input" value={settings.aboutSupportTitle} onChange={e => setSettings({...settings, aboutSupportTitle: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Support Description</label>
                                <textarea className="form-input" rows={4} value={settings.aboutSupportDescription} onChange={e => setSettings({...settings, aboutSupportDescription: e.target.value})} />
                            </div>
                        </div>
                    </div>
                )}

                 {activeTab === 'social' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>Social Profiles</h3>
                            {['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp'].map(key => (
                                <div key={key} className="form-group">
                                    <label className="form-label" style={{ textTransform: 'capitalize' }}>{key}</label>
                                    <input className="form-input" value={(settings.socialLinks as any)[key]} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, [key]: e.target.value}})} placeholder="https://..." />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>Contact Information</h3>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" value={settings.contactInfo.email} onChange={e => setSettings({...settings, contactInfo: {...settings.contactInfo, email: e.target.value}})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" value={settings.contactInfo.phone} onChange={e => setSettings({...settings, contactInfo: {...settings.contactInfo, phone: e.target.value}})} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <textarea className="form-input" rows={3} value={settings.contactInfo.address} onChange={e => setSettings({...settings, contactInfo: {...settings.contactInfo, address: e.target.value}})} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Media Picker Modal */}
            {isMediaPickerOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '900px',
                        height: '85vh',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Select From Media Library</h2>
                            <button onClick={() => setIsMediaPickerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                                {media.map(item => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => selectImage(item.cloudinaryUrl)}
                                        style={{ 
                                            aspectRatio: '1', 
                                            borderRadius: '12px', 
                                            overflow: 'hidden', 
                                            border: settings.heroImage === item.cloudinaryUrl || settings.aboutImage === item.cloudinaryUrl ? '3px solid var(--primary)' : '1px solid var(--gray-100)',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        <img src={item.cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {(settings.heroImage === item.cloudinaryUrl || settings.aboutImage === item.cloudinaryUrl) && (
                                            <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px' }}><Check size={14} /></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .tab-btn {
                    padding: 10px 20px;
                    border-radius: var(--radius-md);
                    border: none;
                    background: transparent;
                    font-weight: 700;
                    font-size: 0.875rem;
                    color: var(--gray-500);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    alignItems: center;
                    gap: 8px;
                }
                .tab-btn.active {
                    background: white;
                    color: var(--primary);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .grid-2 { display: grid; gridTemplateColumns: 1fr 1fr; gap: 24px; }
                .image-selector-hover:hover .image-overlay { opacity: 1 !important; display: flex !important; align-items: center; justify-content: center; }
                @media (max-width: 768px) {
                    .grid-2 { gridTemplateColumns: 1fr; }
                    .tab-btn span { display: none; }
                }
                 @media (max-width: 1024px) {
                    .grid-4-cms { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>
        </div>
    );
}
