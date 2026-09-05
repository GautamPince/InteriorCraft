import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Wrench, FileText, PhoneCall, Mail, LogOut,
  Plus, Trash2, Edit3, Shield, Star, CheckCircle, Search, RefreshCw, X, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AdminDashboard() {
  const { user, logout, isAdmin, isEditorOrAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for New/Edit Project
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    description: '',
    location: '',
    city: 'Ahmedabad',
    property_type: 'Apartment',
    design_style: 'Modern',
    budget_min: 1500000,
    budget_max: 2200000,
    area_sqft: 1800,
    bedrooms: 3,
    featured: false,
    cover_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, projRes, servRes, blogRes, consultRes, msgRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/projects?limit=100'),
        api.get('/services'),
        api.get('/blog?limit=100'),
        api.get('/admin/consultations'),
        api.get('/admin/messages')
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (projRes.success) setProjects(projRes.data.items || []);
      if (servRes.success) setServices(servRes.data || []);
      if (blogRes.success) setBlogs(blogRes.data.items || []);
      if (consultRes.success) setConsultations(consultRes.data || []);
      if (msgRes.success) setMessages(msgRes.data || []);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/projects', projectForm);
      if (res.success) {
        setIsProjectModalOpen(false);
        fetchDashboardData();
      }
    } catch (err) {
      alert(err.message || "Failed to create project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await api.delete(`/admin/projects/${id}`);
      if (res.success) {
        fetchDashboardData();
      }
    } catch (err) {
      alert(err.message || "Failed to delete project");
    }
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-charcoal text-cream p-6 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-elevated">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-gold flex items-center justify-center text-gold font-bold font-serif">
              A
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold">CasaCraft Studio Portal</h1>
              <p className="text-xs text-cream/70">Logged in as <span className="text-gold font-semibold">{user.full_name}</span> ({user.role})</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboardData}
              className="p-2 border border-charcoal-lighter hover:border-gold hover:text-gold transition-colors text-xs flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="bg-gold text-charcoal px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-cream transition-colors flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-beige overflow-x-auto space-x-2 mb-8 scrollbar-none">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'projects', name: 'Projects', icon: FolderKanban, count: projects.length },
            { id: 'services', name: 'Services', icon: Wrench, count: services.length },
            { id: 'blog', name: 'Design Journal', icon: FileText, count: blogs.length },
            { id: 'consultations', name: 'Consultation Leads', icon: PhoneCall, count: consultations.length },
            { id: 'messages', name: 'Contact Messages', icon: Mail, count: messages.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'border-gold text-charcoal bg-beige/30'
                    : 'border-transparent text-soft-brown hover:text-charcoal'
                }`}
              >
                <Icon className="w-4 h-4 text-gold" />
                <span>{tab.name}</span>
                {tab.count !== undefined && (
                  <span className="ml-1 bg-charcoal text-cream text-[10px] px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto mb-2" />
            <p className="font-serif text-sm text-charcoal">Fetching records...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  
                  <div className="bg-cream-light border border-beige p-5 text-center space-y-1 shadow-subtle">
                    <p className="text-[10px] font-bold uppercase text-soft-brown">Total Projects</p>
                    <p className="font-serif text-3xl font-bold text-charcoal">{stats.total_projects}</p>
                  </div>

                  <div className="bg-cream-light border border-beige p-5 text-center space-y-1 shadow-subtle">
                    <p className="text-[10px] font-bold uppercase text-soft-brown">Featured Homes</p>
                    <p className="font-serif text-3xl font-bold text-gold">{stats.featured_projects}</p>
                  </div>

                  <div className="bg-cream-light border border-beige p-5 text-center space-y-1 shadow-subtle">
                    <p className="text-[10px] font-bold uppercase text-soft-brown">Consultation Leads</p>
                    <p className="font-serif text-3xl font-bold text-emerald-700">{stats.consultation_leads}</p>
                  </div>

                  <div className="bg-cream-light border border-beige p-5 text-center space-y-1 shadow-subtle">
                    <p className="text-[10px] font-bold uppercase text-soft-brown">Unread Messages</p>
                    <p className="font-serif text-3xl font-bold text-rose-700">{stats.unread_messages}</p>
                  </div>

                  <div className="bg-cream-light border border-beige p-5 text-center space-y-1 shadow-subtle">
                    <p className="text-[10px] font-bold uppercase text-soft-brown">Blog Articles</p>
                    <p className="font-serif text-3xl font-bold text-charcoal">{stats.blog_posts}</p>
                  </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Latest Consultation Leads */}
                  <div className="bg-cream-light border border-beige p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
                      <PhoneCall className="w-4 h-4 text-gold" />
                      <span>Recent Consultation Enquiries</span>
                    </h3>
                    
                    <div className="space-y-3">
                      {consultations.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="p-3 bg-cream border border-beige flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-charcoal">{lead.name} ({lead.city})</p>
                            <p className="text-[11px] text-soft-brown">{lead.bedrooms} {lead.property_type} • {lead.budget}</p>
                          </div>
                          <span className="bg-gold/20 text-charcoal font-semibold text-[10px] px-2 py-0.5 uppercase">
                            {lead.preferred_contact_method}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Project Summary */}
                  <div className="bg-cream-light border border-beige p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
                      <FolderKanban className="w-4 h-4 text-gold" />
                      <span>Portfolio Overview</span>
                    </h3>

                    <div className="space-y-3">
                      {projects.slice(0, 5).map((proj) => (
                        <div key={proj.id} className="p-3 bg-cream border border-beige flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-charcoal">{proj.title}</p>
                            <p className="text-[11px] text-soft-brown">{proj.location} • {proj.design_style}</p>
                          </div>
                          <span className="font-serif font-bold text-gold">{formatINR(proj.budget_min)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-charcoal">Project Management</h3>
                  {isEditorOrAdmin && (
                    <button
                      onClick={() => setIsProjectModalOpen(true)}
                      className="bg-charcoal text-cream px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  )}
                </div>

                <div className="bg-cream-light border border-beige overflow-x-auto shadow-subtle">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-charcoal text-cream font-serif uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Location & City</th>
                        <th className="p-3">Style & Type</th>
                        <th className="p-3">Budget Range</th>
                        <th className="p-3">Featured</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige text-charcoal">
                      {projects.map((p) => (
                        <tr key={p.id} className="hover:bg-beige/40">
                          <td className="p-3 font-semibold">{p.title}</td>
                          <td className="p-3">{p.location} ({p.city})</td>
                          <td className="p-3">{p.design_style} / {p.property_type}</td>
                          <td className="p-3 font-serif">{formatINR(p.budget_min)} - {formatINR(p.budget_max)}</td>
                          <td className="p-3">
                            {p.featured ? (
                              <span className="bg-gold text-charcoal font-bold text-[9px] px-2 py-0.5 uppercase">Featured</span>
                            ) : (
                              <span className="text-soft-brown text-[10px]">Standard</span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            {isAdmin && (
                              <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="p-1 text-rose-600 hover:text-rose-800"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-charcoal">Service Offerings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {services.map((s) => (
                    <div key={s.id} className="bg-cream-light border border-beige p-5 space-y-2">
                      <span className="text-[10px] font-bold text-gold uppercase">Starting at {formatINR(s.starting_price)}</span>
                      <h4 className="font-serif text-base font-bold text-charcoal">{s.name}</h4>
                      <p className="text-xs text-charcoal/70 line-clamp-2">{s.short_description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONSULTATION LEADS TAB */}
            {activeTab === 'consultations' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-charcoal">Consultation Enquiries</h3>
                <div className="bg-cream-light border border-beige overflow-x-auto shadow-subtle">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-charcoal text-cream font-serif uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">City & Type</th>
                        <th className="p-3">Budget</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige text-charcoal">
                      {consultations.map((c) => (
                        <tr key={c.id} className="hover:bg-beige/40">
                          <td className="p-3 font-semibold">{c.name}</td>
                          <td className="p-3">{c.phone} <br/><span className="text-[10px] text-soft-brown">{c.email}</span></td>
                          <td className="p-3">{c.city} • {c.bedrooms} {c.property_type}</td>
                          <td className="p-3 font-bold text-gold">{c.budget}</td>
                          <td className="p-3 uppercase text-[10px] font-semibold">{c.preferred_contact_method}</td>
                          <td className="p-3 text-[10px] text-soft-brown">{new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-charcoal">Contact Messages</h3>
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-cream-light border border-beige p-5 space-y-2 shadow-subtle">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-charcoal">{m.name} ({m.email} • {m.phone})</span>
                        <span className="text-[10px] text-soft-brown">{new Date(m.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="font-serif text-sm font-bold text-gold">{m.subject}</p>
                      <p className="text-xs text-charcoal/80 font-light">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal for Creating New Project */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-cream border border-beige p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-elevated">
              <div className="flex items-center justify-between pb-3 border-b border-beige">
                <h3 className="font-serif text-xl font-bold text-charcoal">Create New Project</h3>
                <button onClick={() => setIsProjectModalOpen(false)} className="text-charcoal hover:text-gold">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({
                      ...projectForm,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                    })}
                    className="w-full bg-cream-light border border-beige p-2 focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Slug</label>
                    <input
                      type="text"
                      required
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({...projectForm, slug: e.target.value})}
                      className="w-full bg-cream-light border border-beige p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={projectForm.city}
                      onChange={(e) => setProjectForm({...projectForm, city: e.target.value})}
                      className="w-full bg-cream-light border border-beige p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                      className="w-full bg-cream-light border border-beige p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Design Style</label>
                    <select
                      value={projectForm.design_style}
                      onChange={(e) => setProjectForm({...projectForm, design_style: e.target.value})}
                      className="w-full bg-cream-light border border-beige p-2"
                    >
                      <option value="Modern">Modern</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Minimal">Minimal</option>
                      <option value="Scandinavian">Scandinavian</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full bg-cream-light border border-beige p-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal text-cream py-3 font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
                >
                  Save & Publish Project
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
