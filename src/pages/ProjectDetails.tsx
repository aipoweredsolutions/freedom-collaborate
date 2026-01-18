/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    DollarSign,
    Calendar,
    Users,
    MapPin,
    TrendingUp,
    CheckCircle,
    Clock,
    Lock,
    ShieldCheck,
    MessageCircle,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Role {
    title: string;
    split: number;
    filled: boolean;
    description: string;
    requirements: string[];
}

interface TimelinePhase {
    phase: string;
    duration: string;
    status: string;
    payout?: number;
}

interface Project {
    id: string;
    title: string;
    description: string;
    budget: number;
    isRevenueBased?: boolean;
    status: string;
    type: string;
    roles: Role[];
    deadline: string;
    applicants: number;
    category: string;
    location: string;
    createdBy: {
        name: string;
        avatar: string;
        reputation: number;
        projectsCompleted: number;
    };
    timeline: TimelinePhase[];
    duration?: {
        type: string;
        startDate: string;
        endDate: string;
    };
    revenueSharing?: {
        type: string;
        term: number;
    };
}

// Mock data - in a real app, this would come from an API
const mockProjectDetails: Record<string, Project> = {
    '1': {
        id: '1',
        title: 'AI-Powered Task Manager',
        description: 'Build a modern task management app with AI-powered suggestions and automation. This project aims to revolutionize how teams manage their work by integrating cutting-edge AI technology to predict task priorities, suggest optimal scheduling, and automate routine workflows.',
        budget: 15000,
        status: 'open',
        type: 'Startup',
        roles: [
            {
                title: 'Backend Developer',
                split: 30,
                filled: false,
                description: 'Develop RESTful APIs and integrate AI services. Node.js and Python experience required.',
                requirements: ['Node.js', 'Python', 'PostgreSQL', 'AI/ML basics']
            },
            {
                title: 'Product Designer',
                split: 20,
                filled: false,
                description: 'Create intuitive user interfaces and delightful user experiences with focus on AI feedback loops.',
                requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
            },
            {
                title: 'Growth & GTM Lead',
                split: 30,
                filled: false,
                description: 'Lead the Go-to-Market strategy, focus on initial user acquisition and startup scaling.',
                requirements: ['Marketing Strategy', 'Product-Led Growth', 'Analytics', 'Copywriting']
            },
            {
                title: 'Sales Associate',
                split: 20,
                filled: true,
                description: 'Build relationships with early adopters and manage the B2B sales pipeline.',
                requirements: ['B2B Sales', 'CRM Management', 'Communication', 'Lead Gen']
            }
        ],
        deadline: '2026-03-15',
        applicants: 12,
        category: 'SaaS',
        location: 'Remote',
        createdBy: {
            name: 'Sarah Johnson',
            avatar: 'SJ',
            reputation: 4.8,
            projectsCompleted: 12
        },
        timeline: [
            { phase: 'Planning & Design', duration: '2 weeks', status: 'completed' },
            { phase: 'Development', duration: '6 weeks', status: 'in-progress' },
            { phase: 'Marketing Launch', duration: '2 weeks', status: 'pending' },
            { phase: 'Sales Outreach', duration: 'Ongoing', status: 'pending' }
        ]
    },
    '8': {
        id: '8',
        title: 'Global Artisan Collective (Etsy Partnership)',
        description: 'I have a collection of high-quality handcrafted designs and physical items (jewelry and home decor) that have high demand but I cannot sell them on Etsy as it is not supported in my region. I am looking for a responsible partner in the USA to open a shop, manage regional logistics, and handle customer communication. I will handle all design, production, and international shipping to your hub.',
        budget: 0,
        isRevenueBased: true,
        status: 'open',
        type: 'Startup',
        roles: [
            {
                title: 'Product Designer & Maker',
                split: 70,
                filled: true,
                description: 'Original creator of designs and manufacturer of physical goods. Based in a non-Etsy region.',
                requirements: ['Product Design', 'Manufacturing', 'Global Logistics']
            },
            {
                title: 'US Operations & Shop Manager',
                split: 30,
                filled: false,
                description: 'Primary shop owner for US-based Etsy storefront. Handles local taxes, customer support, and final mile delivery.',
                requirements: ['US Residency', 'Etsy Shop Management', 'Customer Service', 'Basic Accounting']
            }
        ],
        deadline: '2026-04-30',
        applicants: 3,
        category: 'E-Commerce',
        location: 'Remote / USA',
        createdBy: {
            name: 'Priya Sharma',
            avatar: 'PS',
            reputation: 4.9,
            projectsCompleted: 0
        },
        timeline: [
            { phase: 'Shop Setup & Tax Verification', duration: 'Feb 1 - Feb 7, 2026', status: 'pending' },
            { phase: 'Inventory & Digital Asset Transfer', duration: 'Feb 8 - Feb 21, 2026', status: 'pending' },
            { phase: 'Beta Launch & SEO Tuning', duration: 'Feb 22 - Feb 28, 2026', status: 'pending' },
            { phase: 'Scale Operations (Revenue Phase)', duration: 'March 2026+', status: 'pending' }
        ],
        duration: {
            type: 'fixed',
            startDate: '2026-02-01',
            endDate: '2031-02-01',
        },
        revenueSharing: {
            type: 'fixed-term',
            term: 60
        }
    },
    '2': {
        id: '2',
        title: 'HealthTech Hackathon Prep',
        description: 'Join a 48-hour sprint to build a patient monitoring dashboard. We need a fast-paced team to build a HIPAA-compliant interface for tracking essential patient metrics in real-time.',
        budget: 5000,
        status: 'open',
        type: 'Hackathon',
        roles: [
            { title: 'Full Stack Developer', split: 40, filled: false, description: 'End-to-end prototype build using React and Node.', requirements: ['React', 'Node.js', 'WebSockets'] },
            { title: 'Medical Research & Legal', split: 30, filled: false, description: 'Ensuring compliance with healthcare regulations.', requirements: ['HIPAA Knowledge', 'Medical Research'] },
            { title: 'Marketing & Pitch Specialist', split: 30, filled: false, description: 'Creating the presentation and storytelling.', requirements: ['Public Speaking', 'Pitch Deck Design'] }
        ],
        deadline: '2026-02-28',
        applicants: 24,
        category: 'Health',
        location: 'Virtual',
        createdBy: { name: 'David Kim', avatar: 'DK', reputation: 4.9, projectsCompleted: 1 },
        timeline: [
            { phase: 'Team Formation', duration: '2 days', status: 'completed' },
            { phase: 'Sprint Part 1', duration: '24 hours', status: 'pending' },
            { phase: 'Sprint Part 2', duration: '24 hours', status: 'pending' }
        ]
    },
    '3': {
        id: '3',
        title: 'Mobile Fitness App',
        description: 'A social-first fitness app focused on community-driven workouts and AI-personalized training plans.',
        budget: 20000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Mobile Developer', split: 35, filled: false, description: 'React Native expert.', requirements: ['React Native', 'Firebase'] },
            { title: 'Community Manager', split: 20, filled: false, description: 'Manage social engagement.', requirements: ['Social Media', 'Community Growth'] },
            { title: 'Content Creator', split: 25, filled: false, description: 'Video production and social content.', requirements: ['Video Editing', 'Content Strategy'] },
            { title: 'Partnerships', split: 20, filled: false, description: 'B2B outreach to gyms.', requirements: ['Sales', 'Negotiation'] }
        ],
        deadline: '2026-05-20',
        applicants: 15,
        category: 'Mobile',
        location: 'Remote',
        createdBy: { name: 'Alex Chen', avatar: 'AC', reputation: 4.7, projectsCompleted: 5 },
        timeline: [
            { phase: 'Design Phase', duration: '3 weeks', status: 'in-progress' },
            { phase: 'Alpha Release', duration: '2 months', status: 'pending' }
        ]
    },
    '4': {
        id: '4',
        title: 'Blockchain Analytics Dashboard',
        description: 'Enterprise-grade analytics for institutional blockchain transparency.',
        budget: 30000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            { title: 'Blockchain Architect', split: 30, filled: false, description: 'Smart contract development.', requirements: ['Solidity', 'Rust'] },
            { title: 'Data Analyst', split: 25, filled: false, description: 'Chain indexing and patterns.', requirements: ['SQL', 'Python'] },
            { title: 'Sales Lead', split: 25, filled: false, description: 'Corporate sales.', requirements: ['Enterprise Sales'] },
            { title: 'Legal Counsel', split: 20, filled: false, description: 'Compliance.', requirements: ['Web3 Law'] }
        ],
        deadline: '2026-06-10',
        applicants: 6,
        category: 'Web3',
        location: 'Hybrid / Berlin',
        createdBy: { name: 'Marcus Thorne', avatar: 'MT', reputation: 4.9, projectsCompleted: 0 },
        timeline: [
            { phase: 'Protocol Analysis', duration: '4 weeks', status: 'pending' }
        ]
    },
    '5': {
        id: '5',
        title: 'Eco-Commerce Marketplace',
        description: 'Building the future of sustainable shopping.',
        budget: 25000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Full Stack Engineer', split: 35, filled: false, description: 'Core build.', requirements: ['Next.js', 'Typescript'] },
            { title: 'Sustainability Expert', split: 20, filled: false, description: 'Brand vetting.', requirements: ['Environmental Science'] },
            { title: 'Growth Strategist', split: 25, filled: false, description: 'User acquisition.', requirements: ['SEO', 'Ads'] },
            { title: 'Logistics Lead', split: 20, filled: false, description: 'fulfillment.', requirements: ['Supply Chain'] }
        ],
        deadline: '2026-07-22',
        applicants: 8,
        category: 'E-Commerce',
        location: 'New York / Remote',
        createdBy: { name: 'Elena Vance', avatar: 'EV', reputation: 4.8, projectsCompleted: 2 },
        timeline: [
            { phase: 'Concept', duration: '2 weeks', status: 'completed' }
        ]
    },
    '6': {
        id: '6',
        title: 'Immersive VR Language School',
        description: 'VR-based language immersion with AI-powered conversation partners.',
        budget: 45000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            { title: 'Unity Developer', split: 30, filled: false, description: 'XR development.', requirements: ['Unity', 'C#'] },
            { title: 'AI Specialist', split: 25, filled: false, description: 'LLM integration.', requirements: ['OpenAI', 'Python'] },
            { title: 'Curriculum Designer', split: 20, filled: false, description: 'Language pedagogy.', requirements: ['Linguistics'] },
            { title: 'Sound Designer', split: 25, filled: false, description: 'Spatial audio.', requirements: ['Audio Engineering'] }
        ],
        deadline: '2026-09-05',
        applicants: 4,
        category: 'EdTech',
        location: 'Remote',
        createdBy: { name: 'Sofia Rodriguez', avatar: 'SR', reputation: 4.8, projectsCompleted: 0 },
        timeline: [
            { phase: 'Prototype', duration: '8 weeks', status: 'pending' }
        ]
    },
    '7': {
        id: '7',
        title: 'Micro-Credit DeFi Portal',
        description: 'Crypto-based peer-to-peer micro-lending for underserved markets.',
        budget: 40000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Smart Contract Lead', split: 35, filled: false, description: 'Safe protocols.', requirements: ['Solidity'] },
            { title: 'Mobile Engineer', split: 25, filled: false, description: 'Lightweight UI.', requirements: ['Flutter'] },
            { title: 'Risk Analyst', split: 20, filled: false, description: 'Credit scoring.', requirements: ['Data Science'] },
            { title: 'Market Manager', split: 20, filled: false, description: 'Local ops.', requirements: ['Partnerships'] }
        ],
        deadline: '2026-08-15',
        applicants: 19,
        category: 'DeFi',
        location: 'Lagos / Nairobi / Remote',
        createdBy: { name: 'Kofi Mensah', avatar: 'KM', reputation: 4.9, projectsCompleted: 0 },
        timeline: [
            { phase: 'MVP Development', duration: '12 weeks', status: 'pending' }
        ]
    }
};

const statusColors = {
    open: 'success',
    'in-progress': 'warning',
    completed: 'secondary',
    cancelled: 'destructive',
    'expiring-soon': 'destructive',
    'revenue-completed': 'secondary'
} as const;

export function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasApplied, setHasApplied] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const [simulatedRevenue, setSimulatedRevenue] = useState(10000);

    // Load project from mock data or localStorage
    const getProject = () => {
        if (!id) return null;
        if (mockProjectDetails[id]) return mockProjectDetails[id];

        // Check localStorage (pending or approved - for now we check pending)
        const pending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
        const found = pending.find((p: Project) => p.id === id);
        return found || null;
    };

    const project = getProject();

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Not Found</h2>
                    <p className="text-slate-600 mb-4">The project you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/projects')}>
                        Back to Projects
                    </Button>
                </div>
            </div>
        );
    }

    const handleApply = () => {
        setHasApplied(true);
    };

    const getRemainingTime = (endDate: string | undefined) => {
        if (!endDate) return null;
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const diff = end - now;
        if (diff <= 0) return 'Expired';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days > 30) {
            const months = Math.floor(days / 30);
            return `${months} month${months > 1 ? 's' : ''} left`;
        }
        return `${days} day${days > 1 ? 's' : ''} left`;
    };

    const projectRemaining = project.duration?.type === 'fixed'
        ? getRemainingTime(project.duration.endDate)
        : null;

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/projects')}
                    className="mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Button>

                {/* Header */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
                                <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider">
                                    {project.type}
                                </Badge>
                                <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
                                    {project.status.replace('-', ' ')}
                                </Badge>
                            </div>

                            <p className="text-lg text-slate-600 mb-6">{project.description}</p>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <DollarSign className="h-5 w-5 text-primary-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">{project.isRevenueBased ? 'Payment Model' : 'Total Budget'}</p>
                                        <p className="font-semibold text-slate-900">
                                            {project.isRevenueBased ? 'Revenue-Based Split' : `$${project.budget.toLocaleString()}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Calendar className="h-5 w-5 text-primary-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">Deadline</p>
                                        <p className="font-semibold text-slate-900">
                                            {new Date(project.deadline).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Users className="h-5 w-5 text-primary-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">Applicants</p>
                                        <p className="font-semibold text-slate-900">{project.applicants}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MapPin className="h-5 w-5 text-primary-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">Location</p>
                                        <p className="font-semibold text-slate-900">{project.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Creator Info */}
                        <Card className="lg:w-80">
                            <CardHeader>
                                <CardTitle className="text-base">Project Creator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
                                    onClick={() => navigate(`/profile/${project.createdBy.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                                        {project.createdBy.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{project.createdBy.name}</p>
                                        <div className="flex items-center gap-1 text-sm text-slate-600">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>{project.createdBy.reputation} rating</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-4 px-2">
                                    {project.createdBy.projectsCompleted} projects completed
                                </p>
                                <Button className="w-full">Contact Creator</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Revenue Simulator */}
                        {project.isRevenueBased && (
                            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <TrendingUp className="h-32 w-32" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary-400" />
                                        Revenue Split Simulator
                                    </CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Estimate monthly sales to see how revenue is distributed across roles.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end mb-2">
                                            <label className="text-sm font-medium text-slate-300">Estimated Monthly Revenue</label>
                                            <span className="text-2xl font-bold text-primary-400">${simulatedRevenue.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="100000"
                                            step="1000"
                                            value={simulatedRevenue}
                                            onChange={(e) => setSimulatedRevenue(Number(e.target.value))}
                                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                        />
                                        <div className="flex justify-between text-xs text-slate-400">
                                            <span>$1,000</span>
                                            <span>$50,000</span>
                                            <span>$100,000+</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                                        {project.roles.map((role: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-primary-500/50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-sm font-medium text-slate-300">{role.title}</span>
                                                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px] uppercase tracking-wider">
                                                        {role.split}%
                                                    </Badge>
                                                </div>
                                                <p className="text-xl font-bold text-white">
                                                    ${Math.round((simulatedRevenue * role.split) / 100).toLocaleString()}
                                                    <span className="text-xs text-slate-400 font-normal ml-1">/ mo</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Open Roles */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Open Roles & Revenue Split</CardTitle>
                                <CardDescription>
                                    {project.roles.filter((r: any) => !r.filled).length} positions available
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Visual Revenue Split */}
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <p className="text-sm font-medium text-slate-700 mb-3">Revenue Distribution</p>
                                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-200 mb-3">
                                        <div
                                            style={{ width: '5%' }}
                                            className="h-full bg-slate-900"
                                            title="Platform Fee: 5%"
                                        />
                                        {project.roles.map((role: any, idx: number) => (
                                            <div
                                                key={idx}
                                                style={{ width: `${role.split * 0.95}%` }}
                                                className={`h-full ${idx === 0 ? 'bg-primary-500' :
                                                    idx === 1 ? 'bg-blue-500' :
                                                        idx === 2 ? 'bg-green-500' :
                                                            'bg-yellow-500'}`}
                                                title={`${role.title}: ${role.split}% (of net)`}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-900" />
                                            <span className="text-slate-600 truncate">Platform Fee</span>
                                            <span className="text-slate-900 font-semibold italic">5%*</span>
                                        </div>
                                        {project.roles.map((role: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-primary-500' :
                                                    idx === 1 ? 'bg-blue-500' :
                                                        idx === 2 ? 'bg-green-500' :
                                                            'bg-yellow-500'}`} />
                                                <span className="text-slate-600 truncate">{role.title}</span>
                                                <span className="text-slate-900 font-semibold">{role.split}%</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 italic">*Platform fee is negotiable for high-impact projects.</p>
                                </div>

                                {project.roles.map((role: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 ${role.filled ? 'bg-slate-50 border-slate-200' : 'bg-white border-primary-200'}`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-slate-900 mb-1">{role.title}</h4>
                                                <p className="text-sm text-slate-600">{role.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={role.filled ? 'secondary' : 'default'}>
                                                    {role.filled ? 'Filled' : `${role.split}% split`}
                                                </Badge>
                                                <p className="text-sm font-semibold text-slate-900 mt-1">
                                                    {project.isRevenueBased
                                                        ? `$${Math.round((simulatedRevenue * role.split) / 100).toLocaleString()} (est/mo)`
                                                        : `$${((project.budget * role.split) / 100).toLocaleString()}`}
                                                </p>
                                            </div>
                                        </div>
                                        {role.requirements && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {role.requirements.map((req: any, idx: number) => (
                                                    <Badge key={idx} variant="outline" className="text-[10px]">{req}</Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Timeline</CardTitle>
                                <CardDescription>Estimated phases and duration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {project.timeline.map((phase: any, index: number) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="mt-1">
                                                {phase.status === 'completed' ? (
                                                    <div className="bg-green-100 p-1.5 rounded-full">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </div>
                                                ) : phase.status === 'in-progress' ? (
                                                    <div className="bg-blue-100 p-1.5 rounded-full animate-pulse">
                                                        <Clock className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="bg-slate-100 p-1.5 rounded-full">
                                                        <Lock className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-slate-900">{phase.phase}</p>
                                                    <Badge variant="outline" className="text-[10px] uppercase">
                                                        {phase.status || 'pending'}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                                    <span>{phase.duration}</span>
                                                    {phase.payout && (
                                                        <span className="text-green-600 font-medium">
                                                            ${phase.payout.toLocaleString()} Released
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Financial Oversight */}
                        <Card className="bg-slate-900 text-white overflow-hidden relative border-none shadow-xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <DollarSign className="h-24 w-24" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary-400" />
                                    Financial Oversight
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <p className="text-[10px] uppercase text-slate-400 mb-1">Escrowed / Distributed</p>
                                    <p className="text-2xl font-bold">
                                        {project.isRevenueBased
                                            ? `$${project.timeline.reduce((acc: number, p: any) => acc + (p.payout || 0), 0).toLocaleString()}`
                                            : `$${project.budget.toLocaleString()}`}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full border-white/20 text-white hover:bg-white/10 text-xs gap-2"
                                    onClick={() => navigate(`/projects/${id}/finance`)}
                                >
                                    <Activity className="h-3 w-3" />
                                    View Full Transparency Report
                                </Button>
                                <p className="text-[10px] text-slate-400 text-center italic">
                                    Funds are managed via automated platform smart-contracts.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Agreement Terms */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Agreement Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase">Project Duration</p>
                                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-sm">
                                        {project.duration?.type === 'fixed'
                                            ? `${new Date(project.duration.startDate).toLocaleDateString()} - ${new Date(project.duration.endDate).toLocaleDateString()}`
                                            : 'Ongoing'}
                                        {projectRemaining && <p className="text-primary-600 font-medium mt-1">{projectRemaining}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase">Revenue Model & Fees</p>
                                    <div className="p-3 bg-slate-50 rounded border border-slate-100 text-sm">
                                        <p className="font-medium text-slate-900">
                                            {project.revenueSharing?.type === 'fixed-term' ? `${project.revenueSharing.term} Month Term` : 'Standard Split'}
                                        </p>
                                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                                            <span className="text-xs text-slate-500">Platform Fee</span>
                                            <span className="text-xs font-bold text-primary-600">5.0% (Negotiable)</span>
                                        </div>
                                        <p className="text-slate-500 text-[10px] mt-1 italic">Automated Distribution Enabled</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Apply / Huddle */}
                        <Card className="border-2 border-primary-100">
                            <CardHeader>
                                <CardTitle className="text-base">Interested?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {!hasApplied && (
                                    <div className="flex items-start gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            id="agree"
                                            className="mt-1"
                                            checked={hasAgreed}
                                            onChange={(e) => setHasAgreed(e.target.checked)}
                                        />
                                        <label htmlFor="agree" className="text-xs text-slate-600">I agree to the terms and revenue splits.</label>
                                    </div>
                                )}
                                <Button
                                    className="w-full"
                                    onClick={handleApply}
                                    disabled={hasApplied || !hasAgreed}
                                >
                                    {hasApplied ? 'Application Sent' : 'Apply Now'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 border-primary-200 text-primary-700"
                                    onClick={() => navigate(`/projects/${id}/huddle`)}
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Enter The Huddle
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Project Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Impact Snapshot</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Applicants</span>
                                    <span className="font-bold">{project.applicants}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Category</span>
                                    <span className="font-bold">{project.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Role Status</span>
                                    <span className="font-bold text-primary-600">{project.roles.filter((r: any) => !r.filled).length} Open</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
