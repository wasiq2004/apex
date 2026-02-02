import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    LogOut,
    Plus,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    Menu,
    X,
    Save,
    XCircle
} from 'lucide-react';

const API_URL = 'http://localhost:5000'; // Hardcoded backend URL

interface Course {
    id: number;
    title: string;
    description: string;
    price: number | null;
    status: 'visible' | 'hidden';
    created_at: string;
    updated_at: string;
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [courseForm, setCourseForm] = useState({
        title: '',
        description: '',
        price: '',
        status: 'visible' as 'visible' | 'hidden'
    });

    const username = localStorage.getItem('adminUsername') || 'Admin';

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/courses/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUsername');
                    navigate('/admin');
                    return;
                }
                throw new Error('Failed to fetch courses');
            }

            const data = await response.json();
            setCourses(data.data || []);
        } catch (error: any) {
            console.error('Failed to fetch courses:', error);
            setError(error.message || 'Failed to load courses');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        navigate('/admin');
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const token = localStorage.getItem('adminToken');

        try {
            const url = editingCourse
                ? `${API_URL}/api/courses/${editingCourse.id}`
                : `${API_URL}/api/courses`;

            const method = editingCourse ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...courseForm,
                    price: courseForm.price ? parseFloat(courseForm.price) : null
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({ error: 'Server error' }));
                throw new Error(data.error || 'Failed to save course');
            }

            await fetchCourses();
            resetForm();
        } catch (error: any) {
            console.error('Failed to save course:', error);
            setError(error.message || 'Failed to save course');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        setIsLoading(true);
        const token = localStorage.getItem('adminToken');

        try {
            const response = await fetch(`${API_URL}/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            await fetchCourses();
        } catch (error: any) {
            console.error('Failed to delete course:', error);
            setError(error.message || 'Failed to delete course');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleVisibility = async (id: number) => {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');

        try {
            const response = await fetch(`${API_URL}/api/courses/${id}/toggle-visibility`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to toggle visibility');
            }

            await fetchCourses();
        } catch (error: any) {
            console.error('Failed to toggle visibility:', error);
            setError(error.message || 'Failed to toggle visibility');
        } finally {
            setIsLoading(false);
        }
    };

    const startEdit = (course: Course) => {
        setEditingCourse(course);
        setCourseForm({
            title: course.title,
            description: course.description,
            price: course.price?.toString() || '',
            status: course.status
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingCourse(null);
        setCourseForm({ title: '', description: '', price: '', status: 'visible' });
        setError('');
    };

    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className="bg-zinc-900/50 border-r border-white/10 backdrop-blur-xl flex flex-col relative z-20"
            >
                {/* Logo/Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h2 className="text-xl font-black text-white tracking-tight">
                                    Apex Admin
                                </h2>
                                <p className="text-xs text-white/60 mt-1 font-bold uppercase tracking-wider">
                                    Control Panel
                                </p>
                            </motion.div>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard'
                            ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span className="font-bold text-sm">Dashboard</span>}
                    </button>

                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'courses'
                            ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <BookOpen className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span className="font-bold text-sm">Courses</span>}
                    </button>
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-white/10">
                    {sidebarOpen && (
                        <div className="mb-3 px-4 py-3 bg-white/5 rounded-lg">
                            <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">
                                Logged in as
                            </p>
                            <p className="text-white font-bold text-sm">{username}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span className="font-bold text-sm">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Dashboard View */}
                    {activeTab === 'dashboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
                            <p className="text-white/60 mb-8">Welcome back, {username}!</p>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-zinc-900/40 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">{courses.length}</h3>
                                    <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Total Courses</p>
                                </div>

                                <div className="bg-zinc-900/40 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <Eye className="w-6 h-6 text-green-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {courses.filter(c => c.status === 'visible').length}
                                    </h3>
                                    <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Visible Courses</p>
                                </div>

                                <div className="bg-zinc-900/40 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-zinc-500/20 rounded-lg flex items-center justify-center">
                                            <EyeOff className="w-6 h-6 text-zinc-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {courses.filter(c => c.status === 'hidden').length}
                                    </h3>
                                    <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Hidden Courses</p>
                                </div>
                            </div>

                            <div className="bg-zinc-900/40 border border-white/10 rounded-lg p-6">
                                <h2 className="text-xl font-black text-white mb-4">Quick Actions</h2>
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className="px-6 py-3 bg-[#D4AF37] text-black font-black text-sm tracking-wider uppercase rounded-lg shadow-gold-glow hover:scale-[1.02] transition-all"
                                >
                                    Manage Courses
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Courses View */}
                    {activeTab === 'courses' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-4xl font-black text-white mb-2">Course Management</h1>
                                    <p className="text-white/60">Create, edit, and manage your courses</p>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-red-400 text-sm mb-6"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Course Form */}
                            <div className="bg-zinc-900/40 border border-white/10 rounded-lg p-8 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-black text-white">
                                        {isEditing ? 'Edit Course' : 'Add New Course'}
                                    </h2>
                                    {isEditing && (
                                        <button
                                            onClick={resetForm}
                                            className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            <span className="text-sm font-bold">Cancel</span>
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-white/80 tracking-wider uppercase">
                                                Course Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={courseForm.title}
                                                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all font-medium rounded-lg"
                                                required
                                                placeholder="e.g., Full Stack Web Development"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-white/80 tracking-wider uppercase">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={courseForm.price}
                                                onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all font-medium rounded-lg"
                                                placeholder="Leave empty for free"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-white/80 tracking-wider uppercase">
                                            Description *
                                        </label>
                                        <textarea
                                            value={courseForm.description}
                                            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all font-medium rounded-lg min-h-[120px] resize-none"
                                            required
                                            placeholder="Describe the course..."
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-white/80 tracking-wider uppercase">
                                            Status
                                        </label>
                                        <select
                                            value={courseForm.status}
                                            onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as 'visible' | 'hidden' })}
                                            className="w-full bg-black/40 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all font-medium rounded-lg"
                                        >
                                            <option value="visible">Visible (Public)</option>
                                            <option value="hidden">Hidden (Draft)</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F9E076] text-black font-black text-sm tracking-wider uppercase rounded-lg shadow-gold-glow hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>{isLoading ? 'Saving...' : (isEditing ? 'Update Course' : 'Create Course')}</span>
                                    </button>
                                </form>
                            </div>

                            {/* Courses List */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black text-white mb-6">
                                    All Courses ({courses.length})
                                </h2>

                                {isLoading && courses.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37] mx-auto"></div>
                                        <p className="text-white/60 mt-4">Loading courses...</p>
                                    </div>
                                ) : courses.length === 0 ? (
                                    <div className="text-center py-20 bg-zinc-900/40 border border-white/10 rounded-lg">
                                        <Plus className="w-16 h-16 mx-auto mb-4 text-white/20" />
                                        <p className="text-white/60 font-medium">No courses yet. Create your first course above.</p>
                                    </div>
                                ) : (
                                    courses.map((course) => (
                                        <motion.div
                                            key={course.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-zinc-900/40 border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-all"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-grow">
                                                    <div className="flex items-center space-x-4 mb-3">
                                                        <h3 className="text-xl font-black text-white">{course.title}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${course.status === 'visible'
                                                            ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                                                            : 'bg-zinc-800 text-white/60 border border-zinc-700'
                                                            }`}>
                                                            {course.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-white/70 text-sm mb-3 leading-relaxed">{course.description}</p>
                                                    {course.price && (
                                                        <p className="text-[#D4AF37] font-black text-lg">₹{course.price.toFixed(2)}</p>
                                                    )}
                                                </div>

                                                <div className="flex items-center space-x-2 ml-6">
                                                    <button
                                                        onClick={() => handleToggleVisibility(course.id)}
                                                        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white/60 hover:text-white transition-all"
                                                        title={course.status === 'visible' ? 'Hide' : 'Show'}
                                                    >
                                                        {course.status === 'visible' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(course)}
                                                        className="p-3 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded-lg text-white/60 transition-all"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(course.id)}
                                                        className="p-3 bg-zinc-800 hover:bg-red-600 rounded-lg text-white/60 hover:text-white transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
