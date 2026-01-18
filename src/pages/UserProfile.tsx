import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Briefcase, MapPin, Calendar, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockUsers: Record<string, any> = {
    'sarah-johnson': {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        title: 'Senior Frontend Developer',
        bio: 'Passionate about building intuitive user interfaces and scalable design systems. I specialize in React and TypeScript.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'GraphQL'],
        projectsCompleted: 12,
        availability: 'Available for projects',
        location: 'London, UK (Remote)',
        reputation: 4.8,
        joinedDate: 'Jan 2024',
        recentProjects: [
            { id: '1', title: 'AI Task Manager', role: 'Lead Frontend' },
            { id: '4', title: 'E-commerce Redesign', role: 'UI Architect' }
        ]
    },
    'david-kim': {
        name: 'David Kim',
        avatar: 'DK',
        title: 'Full Stack Engineer',
        bio: 'Building the future of HealthTech. I love solving complex backend problems and creating efficient data pipelines.',
        skills: ['Node.js', 'React', 'PostgreSQL', 'Python', 'Docker'],
        projectsCompleted: 5,
        availability: 'Limited Availability',
        location: 'Nairobi, Kenya (Hybrid)',
        reputation: 4.9,
        joinedDate: 'March 2024',
        recentProjects: [
            { id: '2', title: 'Health monitoring system', role: 'API Developer' }
        ]
    },
    'marcus-thorne': {
        name: 'Marcus Thorne',
        avatar: 'MT',
        title: 'Cybersecurity Analyst',
        bio: 'Protecting digital assets through rigorous security audits and strategic redundancy. Expert in zero-trust architecture.',
        skills: ['Penetration Testing', 'Network Security', 'ISO 27001', 'Encryption'],
        projectsCompleted: 24,
        availability: 'Available for projects',
        location: 'Berlin, Germany (Remote)',
        reputation: 4.9,
        joinedDate: 'Jan 2024',
        recentProjects: [
            { id: '5', title: 'Eco-Commerce Marketplace', role: 'Security Lead' }
        ]
    },
    'sofia-rodriguez': {
        name: 'Sofia Rodriguez',
        avatar: 'SR',
        title: 'Content Strategist',
        bio: 'Helping startups tell their story through high-impact content and narrative-driven growth.',
        skills: ['Brand Voice', 'Content Marketing', 'SEO', 'Creative Writing'],
        projectsCompleted: 31,
        availability: 'Limited Availability',
        location: 'Madrid, Spain (Remote)',
        reputation: 4.8,
        joinedDate: 'Dec 2023',
        recentProjects: [
            { id: '6', title: 'VR Language School', role: 'Content Lead' }
        ]
    },
    'kofi-mensah': {
        name: 'Kofi Mensah',
        avatar: 'KM',
        title: 'Cloud Architect',
        bio: 'Specialized in building resilient and scalable cloud-native architectures for DeFi projects.',
        skills: ['AWS', 'Kubernetes', 'Terraform', 'System Design'],
        projectsCompleted: 15,
        availability: 'Full Availability',
        location: 'Accra, Ghana (Hybrid)',
        reputation: 4.9,
        joinedDate: 'Feb 2024',
        recentProjects: [
            { id: '7', title: 'Micro-Credit DeFi Portal', role: 'Cloud Lead' }
        ]
    },
    'olivia-bennett': {
        name: 'Olivia Bennett',
        avatar: 'OB',
        title: 'Growth Marketing Lead',
        bio: 'Driving sustainable user acquisition through data-driven experiments and viral loops.',
        skills: ['PPC', 'Product-Led Growth', 'Funnel Optimization', 'Data Analytics'],
        projectsCompleted: 9,
        availability: 'Available for core roles',
        location: 'New York, USA (Remote)',
        reputation: 5.0,
        joinedDate: 'March 2024',
        recentProjects: []
    }
};

export function UserProfile() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fallback logic for user data - in a real app, this would be an API call
    const userId = id || '';
    const user = mockUsers[userId] || {
        name: userId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'User Profile',
        avatar: userId.split('-').map(word => word[0]).join('').toUpperCase().substring(0, 2) || 'UP',
        title: 'Collaborator',
        bio: 'Innovative creator focusing on high-impact projects and collaborative growth.',
        skills: ['Collaboration', 'Problem Solving', 'Strategy'],
        projectsCompleted: 3,
        availability: 'Available',
        location: 'Remote',
        reputation: 4.5,
        joinedDate: 'June 2024',
        recentProjects: []
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                {/* Profile Header */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-blue-600" />

                    <div className="relative pt-8 flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg ring-4 ring-white">
                            <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-900 border border-slate-100">
                                {user.avatar}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                                    <p className="text-lg text-slate-600 font-medium">{user.title}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Message
                                    </Button>
                                    <Button size="sm">Invite to Project</Button>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    {user.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    {user.reputation} Reputation
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    Joined {user.joinedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Projects Completed</p>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span className="text-xl font-bold text-slate-900">{user.projectsCompleted}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Availability</p>
                                    <Badge variant={user.availability.toLowerCase().includes('available') ? 'success' : 'warning'}>
                                        {user.availability}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Trust Score</p>
                                    <div className="w-full bg-slate-100 h-2 rounded-full mt-1">
                                        <div className="bg-primary-500 h-full rounded-full" style={{ width: '92%' }} />
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-1">Highly reliable collaborator</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill: string) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 leading-relaxed">
                                    {user.bio}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Experience & Projects</CardTitle>
                                <CardDescription>Key contributions on Freedom Collaborate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {user.recentProjects.length > 0 ? (
                                    <div className="space-y-4">
                                        {user.recentProjects.map((proj: any) => (
                                            <div key={proj.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-primary-200 transition-colors cursor-pointer" onClick={() => navigate(`/projects/${proj.id}`)}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                                                        <Briefcase className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{proj.title}</p>
                                                        <p className="text-sm text-slate-500">{proj.role}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">Completed</Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-sm text-slate-500">New member with high potential</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
