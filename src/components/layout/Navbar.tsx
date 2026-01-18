import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Zap className="h-6 w-6 text-primary-600" />
                            <span className="font-bold text-xl text-slate-800 tracking-tight">Freedom Collaborate</span>
                        </Link>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:gap-6">
                        <Link to="/projects" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Projects</Link>
                        <Link to="/team" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Find Team</Link>
                        {isAuthenticated && (
                            <Link to="/projects/1/workspace" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Workspace</Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Admin</Link>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Sign In</Link>
                                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-sm hover:shadow-md">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span>{user?.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white border-b border-slate-200">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        <Link to="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Projects</Link>
                        <Link to="/team" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Find Team</Link>
                        {isAuthenticated && (
                            <Link to="/projects/1/workspace" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Workspace</Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Admin</Link>
                        )}
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Sign In</Link>
                                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Get Started</Link>
                            </>
                        ) : (
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex items-center px-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-slate-900">{user?.name}</span>
                                </div>
                                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
