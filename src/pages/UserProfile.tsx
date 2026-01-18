/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Briefcase, MapPin, Calendar, CheckCircle2, MessageSquare, ShieldCheck, Award, TrendingUp, DollarSign } from 'lucide-react';
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
        projectsCompleted: 2,
        availability: 'Available for projects',
        location: 'London, UK (Remote)',
        reputation: 4.8,
        joinedDate: 'Jan 2024',
        recentProjects: [
            { id: '1', title: 'AI Task Manager', role: 'Lead Frontend' },
            { id: '4', title: 'E-commerce Redesign', role: 'UI Architect' }
        ],
        verifiedContributions: [
            {
                projectId: '1',
                projectTitle: 'AI Task Manager',
                role: 'Lead Frontend',
                milestones: 4,
                totalValue: 4500,
                revenueGenerated: null,
                date: 'Completed Feb 2024'
            },
            {
                projectId: '4',
                projectTitle: 'Blockchain Dashboard',
                role: 'UI Architect',
                milestones: 6,
                totalValue: 7500,
                revenueGenerated: null,
                date: 'Completed Jan 2024'
            }
        ]
    },
    'david-kim': {
        name: 'David Kim',
        avatar: 'DK',
        title: 'Full Stack Engineer',
        bio: 'Building the future of HealthTech. I love solving complex backend problems and creating efficient data pipelines.',
        skills: ['Node.js', 'React', 'PostgreSQL', 'Python', 'Docker'],
        projectsCompleted: 1,
        availability: 'Limited Availability',
        location: 'Nairobi, Kenya (Hybrid)',
        reputation: 4.9,
        joinedDate: 'March 2024',
        recentProjects: [
            { id: '2', title: 'Health monitoring system', role: 'API Developer' }
        ],
        verifiedContributions: [
            {
                projectId: '2',
                projectTitle: 'Health monitoring system',
                role: 'API Developer',
                milestones: 3,
                totalValue: 1200,
                revenueGenerated: null,
                date: 'Completed April 2024'
            }
        ]
    },
    'marcus-thorne': {
        name: 'Marcus Thorne',
        avatar: 'MT',
        title: 'Cybersecurity Analyst',
        bio: 'Protecting digital assets through rigorous security audits and strategic redundancy. Expert in zero-trust architecture.',
        skills: ['Penetration Testing', 'Network Security', 'ISO 27001', 'Encryption'],
        projectsCompleted: 0,
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
        projectsCompleted: 0,
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
        projectsCompleted: 0,
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
        projectsCompleted: 1,
        availability: 'Available for core roles',
        location: 'New York, USA (Remote)',
        reputation: 5.0,
        joinedDate: 'March 2024',
        recentProjects: [],
        verifiedContributions: [
            {
                projectId: '8',
                projectTitle: 'Global Artisan Collective',
                role: 'Growth Lead',
                milestones: 2,
                totalValue: 1500,
                revenueGenerated: 12400,
                date: 'Active Partnership'
            }
        ]
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

                        <Card className="border-none shadow-lg overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <ShieldCheck className="h-5 w-5 text-primary-400" />
                                            Verified Contribution History
                                        </CardTitle>
                                        <CardDescription className="text-slate-400">Permanently verified achievements on Freedom Collaborate</CardDescription>
                                    </div>
                                    <Badge className="bg-primary-500 text-white border-none">Proof of Work</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 bg-white">
                                {user.verifiedContributions && user.verifiedContributions.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {user.verifiedContributions.map((contribution: any, idx: number) => (
                                            <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-bold text-slate-900 text-lg">{contribution.projectTitle}</h4>
                                                            <div className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-green-100">
                                                                <ShieldCheck className="h-3 w-3" />
                                                                Verified
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-600 font-medium flex items-center gap-2">
                                                            <Briefcase className="h-4 w-4 text-slate-400" />
                                                            {contribution.role}
                                                        </p>
                                                    </div>
                                                    <div className="text-left md:text-right">
                                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{contribution.date}</p>
                                                        <div className="flex items-center gap-1 md:justify-end text-primary-600 font-bold text-xl mt-1">
                                                            <DollarSign className="h-5 w-5" />
                                                            {contribution.totalValue.toLocaleString()}
                                                            <span className="text-xs text-slate-400 font-normal ml-1">Earned</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Milestones</p>
                                                        <div className="flex items-center gap-1.5">
                                                            <Award className="h-4 w-4 text-primary-500" />
                                                            <span className="font-bold text-slate-900">{contribution.milestones} Completed</span>
                                                        </div>
                                                    </div>
                                                    {contribution.revenueGenerated && (
                                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Revenue Impact</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                                <span className="font-bold text-slate-900">${contribution.revenueGenerated.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="col-span-2 flex items-center gap-2">
                                                        <div className="flex -space-x-2">
                                                            {[1, 2, 3].map(i => (
                                                                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">
                                                                    ID
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 italic">Endorsed by 3 team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <Award className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-500 font-medium">Building a verified history of success</p>
                                        <p className="text-xs text-slate-400 mt-1 italic">Complete your first project milestone to earn proof of work</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Legacy Context</CardTitle>
                                <CardDescription>Previous external experience (Self-reported)</CardDescription>
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
                                                <Badge variant="outline">Legacy Portfolio</Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-sm text-slate-500">Fresh profile on Freedom Collaborate</p>
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
