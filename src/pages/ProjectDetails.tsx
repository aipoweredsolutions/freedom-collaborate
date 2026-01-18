import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, Users, MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data - in a real app, this would come from an API
const mockProjectDetails: Record<string, any> = {
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
            { phase: 'Planning & Design', duration: '2 weeks' },
            { phase: 'Development', duration: '6 weeks' },
            { phase: 'Marketing Launch', duration: '2 weeks' },
            { phase: 'Sales Outreach', duration: 'Ongoing' }
        ]
    },
    '2': {
        id: '2',
        title: 'HealthTech Hackathon Prep',
        description: 'Join a 48-hour sprint to build a patient monitoring dashboard for remote clinics in developing regions. We need a fast, lightweight, and offline-first solution that can help healthcare workers track patient vitals effectively.',
        budget: 5000,
        status: 'open',
        type: 'Hackathon',
        roles: [
            {
                title: 'Full Stack Developer',
                split: 40,
                filled: false,
                description: 'Build the core dashboard prototype using lightweight React components and offline storage.',
                requirements: ['React', 'PWA experience', 'Data Visualization', 'Offline Storage']
            },
            {
                title: 'Medical Research & Legal',
                split: 30,
                filled: false,
                description: 'Ensure the solution follows healthcare regulations and data privacy ethics for medical info.',
                requirements: ['Medical Ethics', 'HIPAA/GDPR Knowledge', 'Critical Thinking']
            },
            {
                title: 'Marketing & Pitch Specialist',
                split: 30,
                filled: false,
                description: 'Design the presentation, craft the narrative, and lead the final project pitch.',
                requirements: ['Public Speaking', 'Pitch Deck Design', 'Storytelling']
            }
        ],
        deadline: '2026-02-28',
        applicants: 24,
        category: 'Health',
        location: 'Hybrid / Nairobi',
        createdBy: {
            name: 'David Kim',
            avatar: 'DK',
            reputation: 4.9,
            projectsCompleted: 5
        },
        timeline: [
            { phase: 'Ideation', duration: '6 hours' },
            { phase: 'Hacking', duration: '36 hours' },
            { phase: 'Pitch Prep', duration: '6 hours' }
        ]
    },
    '3': {
        id: '3',
        title: 'Mobile Fitness App',
        description: 'Creating a social fitness application that rewards users for staying active. The app will include GPS tracking, social challenges, and a marketplace for fitness gear.',
        budget: 20000,
        status: 'open',
        type: 'Startup',
        roles: [
            {
                title: 'Mobile Developer',
                split: 35,
                filled: false,
                description: 'Build the mobile app for iOS and Android with a focus on GPS and social features.',
                requirements: ['React Native', 'GPS API', 'Firebase']
            },
            {
                title: 'Community Manager',
                split: 20,
                filled: false,
                description: 'Moderate the social feed, manage user challenges, and foster a healthy fitness community.',
                requirements: ['Social Media Management', 'Community Engagement', 'Moderation']
            },
            {
                title: 'Content Creator / Video',
                split: 25,
                filled: false,
                description: 'Produce high-quality workout videos and social media promotional content.',
                requirements: ['Video Editing', 'Content Strategy', 'TikTok/Instagram Growth']
            },
            {
                title: 'Partnerships & Sales',
                split: 20,
                filled: false,
                description: 'Negotiate deals with fitness brands for the in-app marketplace.',
                requirements: ['Partnership Management', 'Sales', 'Negotiation']
            }
        ],
        deadline: '2026-05-20',
        applicants: 15,
        category: 'Mobile',
        location: 'Remote',
        createdBy: {
            name: 'Alex Rivera',
            avatar: 'AR',
            reputation: 4.7,
            projectsCompleted: 8
        },
        timeline: [
            { phase: 'MVP Development', duration: '8 weeks' },
            { phase: 'Beta Testing', duration: '4 weeks' },
            { phase: 'Community Launch', duration: '2 weeks' }
        ]
    },
    '4': {
        id: '4',
        title: 'Blockchain Analytics Dashboard',
        description: 'Enterprise-grade blockchain analytics for multi-chain monitoring. This dashboard will serve institutional investors by providing real-time data on wallet movements and protocol health.',
        budget: 30000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            {
                title: 'Blockchain Architect',
                split: 30,
                filled: false,
                description: 'Smart contract indexing and building the data pipeline for multi-chain monitoring.',
                requirements: ['Solidity', 'Indexer Logic', 'System Architecture']
            },
            {
                title: 'Data Analyst',
                split: 25,
                filled: false,
                description: 'Analyze on-chain transaction patterns and create financial health reports.',
                requirements: ['SQL', 'Data Science', 'On-chain Analytics']
            },
            {
                title: 'Institutional Sales Lead',
                split: 25,
                filled: false,
                description: 'Cold outreach to hedge funds and institutional investors to license the dashboard.',
                requirements: ['Enterprise Sales', 'Fintech Networking', 'Strategy']
            },
            {
                title: 'Compliance & Legal Officer',
                split: 20,
                filled: false,
                description: 'Ensure the platform meets all regulatory requirements and handles Web3 specific laws.',
                requirements: ['Crypto Regulation', 'Fintech Law', 'Risk Management']
            }
        ],
        deadline: '2026-06-10',
        applicants: 6,
        category: 'Web3',
        location: 'Remote / London',
        createdBy: {
            name: 'Elena Vance',
            avatar: 'EV',
            reputation: 5.0,
            projectsCompleted: 22
        },
        timeline: [
            { phase: 'Architecture Design', duration: '4 weeks' },
            { phase: 'Core Indexing', duration: '8 weeks' },
            { phase: 'Compliance Review', duration: '4 weeks' },
            { phase: 'Institutional Sales Launch', duration: 'Ongoing' }
        ]
    },
    '5': {
        id: '5',
        title: 'Eco-Commerce Marketplace',
        description: 'A dedicated platform for carbon-neutral products and sustainable brands. We aim to create a transparent ecosystem where every purchase contributes to a greener planet through tracked carbon offsets.',
        budget: 25000,
        status: 'open',
        type: 'Startup',
        roles: [
            {
                title: 'Full Stack Engineer',
                split: 35,
                filled: false,
                description: 'Build the marketplace core, integrate payment gateways and carbon offset APIs.',
                requirements: ['React', 'Node.js', 'Stripe API', 'PostgreSQL']
            },
            {
                title: 'Sustainability Consultant',
                split: 20,
                filled: false,
                description: 'Verify brand sustainability claims and manage the carbon offset portfolio.',
                requirements: ['Environmental Science', 'Audit Experience', 'Carbon Accounting']
            },
            {
                title: 'Marketing Strategist',
                split: 25,
                filled: false,
                description: 'Develop the launch strategy and manage community engagement for eco-conscious shoppers.',
                requirements: ['Growth Marketing', 'SEO', 'Community Management', 'PR']
            },
            {
                title: 'Supply Chain Lead',
                split: 20,
                filled: false,
                description: 'Onboard sustainable manufacturers and ensure ethical logistics partners.',
                requirements: ['Logistics', 'Procurement', 'Sustainability Standards']
            }
        ],
        deadline: '2026-07-22',
        applicants: 8,
        category: 'E-Commerce',
        location: 'Berlin / Remote',
        createdBy: {
            name: 'Marcus Thorne',
            avatar: 'MT',
            reputation: 4.6,
            projectsCompleted: 4
        },
        timeline: [
            { phase: 'Brand Onboarding', duration: '4 weeks' },
            { phase: 'Platform MVP', duration: '10 weeks' },
            { phase: 'Public Beta', duration: '4 weeks' }
        ]
    },
    '6': {
        id: '6',
        title: 'Immersive VR Language School',
        description: 'Practice languages in hyper-realistic VR environments with AI tutors. Students can visit virtual cafes, markets, and airports to practice conversational skills in context.',
        budget: 45000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            {
                title: 'Unity Developer',
                split: 30,
                filled: false,
                description: 'Lead developer for VR environments and core interaction mechanics.',
                requirements: ['Unity', 'C#', 'Oculus SDK', '3D Optimization']
            },
            {
                title: 'AI Training Specialist',
                split: 25,
                filled: false,
                description: 'Design and train NLP models for context-aware AI language tutors.',
                requirements: ['NLP', 'Python', 'MLOps', 'Large Language Models']
            },
            {
                title: 'Curriculum Designer',
                split: 20,
                filled: false,
                description: 'Structure language learning pathways for different proficiency levels.',
                requirements: ['Linguistics', 'Instructional Design', 'Language Teaching']
            },
            {
                title: 'Sound Engineer',
                split: 25,
                filled: false,
                description: 'Create spatial audio experiences and implement high-quality TTS voice synthesis.',
                requirements: ['Spatial Audio', 'Unity Audio', 'Wwise', 'Audio Engineering']
            }
        ],
        deadline: '2026-09-05',
        applicants: 4,
        category: 'EdTech',
        location: 'Tokyo / Remote',
        createdBy: {
            name: 'Sofia Rodriguez',
            avatar: 'SR',
            reputation: 4.9,
            projectsCompleted: 15
        },
        timeline: [
            { phase: 'Environment Prototyping', duration: '6 weeks' },
            { phase: 'AI Integration', duration: '8 weeks' },
            { phase: 'Vocal Synthesis', duration: '4 weeks' }
        ]
    },
    '7': {
        id: '7',
        title: 'Micro-Credit DeFi Portal',
        description: 'Enabling peer-to-peer lending for emerging markets via stablecoins. We use alternative data for credit scoring to provide financial access to the unbanked.',
        budget: 40000,
        status: 'open',
        type: 'Startup',
        roles: [
            {
                title: 'Smart Contract Lead',
                split: 35,
                filled: false,
                description: 'Architecting the lending pools and managing smart contract security.',
                requirements: ['Solidity', 'Protocol Design', 'Security Audits']
            },
            {
                title: 'Mobile Engineer',
                split: 25,
                filled: false,
                description: 'Develop the user-facing mobile app with a focus on ease of use and low-bandwidth environments.',
                requirements: ['React Native', 'Mobile Security', 'Offline-first Design']
            },
            {
                title: 'Risk Analyst',
                split: 20,
                filled: false,
                description: 'Develop AI-driven credit scoring models using non-traditional financial data.',
                requirements: ['Data Science', 'Risk Modeling', 'Python', 'Statistics']
            },
            {
                title: 'Regional Operations Manager',
                split: 20,
                filled: false,
                description: 'Establish local partnerships with non-profits and agents in key markets.',
                requirements: ['Business Development', 'Cross-cultural Communication', 'Operations']
            }
        ],
        deadline: '2026-08-15',
        applicants: 19,
        category: 'DeFi',
        location: 'Nairobi / Remote',
        createdBy: {
            name: 'Kofi Mensah',
            avatar: 'KM',
            reputation: 4.8,
            projectsCompleted: 7
        },
        timeline: [
            { phase: 'Credit Protocol Build', duration: '8 weeks' },
            { phase: 'Pilot in Target Market', duration: '4 weeks' },
            { phase: 'Global Expansion', duration: 'Ongoing' }
        ]
    },
    '8': {
        id: '8',
        title: 'Global Artisan Collective (Etsy Partnership)',
        description: 'I have a collection of high-quality handcrafted designs and physical items (jewelry and home decor) that have high demand but I cannot sell them on Etsy as it is not supported in my region. I am looking for a responsible partner in the USA to open a shop, manage regional logistics, and handle customer communication. I will handle all design, production, and international shipping to your hub.',
        budget: 12000,
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
            projectsCompleted: 3
        },
        timeline: [
            { phase: 'Shop Setup & Verification', duration: '1 week' },
            { phase: 'Inventory Transfer', duration: '2 weeks' },
            { phase: 'Launch & SEO Optimization', duration: '1 week' },
            { phase: 'Sales Operations', duration: 'Ongoing' }
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
    }
};

const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

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

    // Load project from mock data or localStorage
    const getProject = () => {
        if (!id) return null;
        if (mockProjectDetails[id]) return mockProjectDetails[id];

        // Check localStorage (pending or approved - for now we check pending)
        const pending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
        const found = pending.find((p: any) => p.id === id);
        return found || null;
    };

    const project = getProject();

    const handleApply = () => {
        setHasApplied(true);
        // Mock API call would go here
    };

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

    // Calculate remaining time for project and revenue sharing
    const getRemainingTime = (endDate: string | null) => {
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

    // Revenue sharing status calculation (simplified for demo)
    const revenueStatus = project.revenueSharing?.type === 'fixed-term' ? 'Active' : project.revenueSharing?.type === 'ongoing' ? 'Ongoing' : 'One-time';
    const revenueRemaining = project.revenueSharing?.type === 'fixed-term' ? `${project.revenueSharing.term} months total` : null;

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
                                        <p className="text-xs text-slate-500">Total Budget</p>
                                        <p className="font-semibold text-slate-900">${project.budget.toLocaleString()}</p>
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
                                    onClick={() => navigate(`/profile/${getSlug(project.createdBy.name)}`)}
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
                                        {project.roles.map((role: any, idx: number) => (
                                            <div
                                                key={idx}
                                                style={{ width: `${role.split}%` }}
                                                className={`h-full ${idx === 0 ? 'bg-primary-500' :
                                                    idx === 1 ? 'bg-blue-500' :
                                                        idx === 2 ? 'bg-green-500' :
                                                            'bg-yellow-500'
                                                    }`}
                                                title={`${role.title}: ${role.split}%`}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {project.roles.map((role: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-primary-500' :
                                                    idx === 1 ? 'bg-blue-500' :
                                                        idx === 2 ? 'bg-green-500' :
                                                            'bg-yellow-500'
                                                    }`} />
                                                <span className="text-slate-600 truncate">{role.title}</span>
                                                <span className="text-slate-900 font-semibold">{role.split}%</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Financial Summary Table */}
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Financial Payout Summary</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Total Project Budget:</span>
                                                <span className="font-bold text-slate-900">${project.budget.toLocaleString()}</span>
                                            </div>
                                            {project.roles.map((role: any, idx: number) => (
                                                <div key={idx} className="flex justify-between text-xs">
                                                    <span className="text-slate-500">{role.title}:</span>
                                                    <span className="text-slate-700 font-medium">${((project.budget * role.split) / 100).toLocaleString()} ({role.split}%)</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Role Cards */}
                                {project.roles.map((role: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 ${role.filled
                                            ? 'bg-slate-50 border-slate-200'
                                            : 'bg-white border-primary-200'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-slate-900 mb-1">{role.title}</h4>
                                                <p className="text-sm text-slate-600">{role.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={role.filled ? 'secondary' : 'primary'}>
                                                    {role.filled ? 'Filled' : `${role.split}% split`}
                                                </Badge>
                                                <p className="text-sm font-semibold text-slate-900 mt-1">
                                                    ${((project.budget * role.split) / 100).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {role.requirements && (
                                            <div className="mb-3">
                                                <p className="text-xs font-medium text-slate-700 mb-2">Requirements:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.requirements.map((req: string, idx: number) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {req}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!role.filled && (
                                            <Button variant="outline" className="w-full mt-2">
                                                Apply for this Role
                                            </Button>
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
                                <div className="space-y-3">
                                    {project.timeline.map((phase: any, index: number) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900">{phase.phase}</p>
                                                <p className="text-sm text-slate-600">{phase.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Workspace Link (Demo) */}
                        <Card className="bg-slate-900 text-white">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg mb-2">My Workspace</h3>
                                <p className="text-slate-300 text-sm mb-4">You are a member of this project.</p>
                                <Button
                                    onClick={() => navigate(`/projects/${project.id}/workspace`)}
                                    className="w-full bg-white text-slate-900 hover:bg-slate-100"
                                >
                                    Open Workspace
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Duration & Revenue Agreement Card */}
                        <Card className="border-l-4 border-l-primary-500 overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center justify-between">
                                    Agreement Terms
                                    <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">Locked</Badge>
                                </CardTitle>
                                <CardDescription>Time-bound collaboration terms</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tight">
                                        <span>Project Duration</span>
                                        {projectRemaining && <span className="text-primary-600 normal-case font-semibold">{projectRemaining}</span>}
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {project.duration?.type === 'fixed'
                                                ? `${new Date(project.duration.startDate).toLocaleDateString()} - ${new Date(project.duration.endDate).toLocaleDateString()}`
                                                : 'Ongoing Collaboration'
                                            }
                                        </p>
                                        {project.duration?.type === 'ongoing' && project.duration.reviewDate && (
                                            <p className="text-[10px] text-slate-500 mt-0.5 italic">Next Review: {new Date(project.duration.reviewDate).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tight">
                                        <span>Revenue Sharing</span>
                                        <span className={`text-[10px] px-1.5 rounded-full ${revenueStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{revenueStatus}</span>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {project.revenueSharing?.type === 'one-time' && 'One-time Payout'}
                                            {project.revenueSharing?.type === 'fixed-term' && `${project.revenueSharing.term} Months Fixed Term`}
                                            {project.revenueSharing?.type === 'ongoing' && 'Ongoing Distribution'}
                                            {!project.revenueSharing && 'Standard Split'}
                                        </p>
                                        {revenueRemaining && (
                                            <p className="text-[10px] text-slate-500 mt-0.5 italic">{revenueRemaining} distributed monthly after completion.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Guaranteed by Platform Agreement</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Apply Card */}
                        <Card className="border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white">
                            <CardHeader>
                                <CardTitle className="text-primary-900">Interested?</CardTitle>
                                <CardDescription>Join this project and start earning</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!hasApplied && (
                                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                                        <input
                                            type="checkbox"
                                            id="agreement"
                                            checked={hasAgreed}
                                            onChange={(e) => setHasAgreed(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                        />
                                        <label htmlFor="agreement" className="text-xs text-slate-600 leading-tight cursor-pointer">
                                            I agree to the project roles and revenue split defined above.
                                        </label>
                                    </div>
                                )}
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleApply}
                                    disabled={hasApplied || (!hasAgreed && !hasApplied)}
                                    variant={hasApplied ? "secondary" : "default"}
                                >
                                    {hasApplied ? "Application Sent" : "Apply Now"}
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Save for Later
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Project Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Open Positions</span>
                                    <span className="font-semibold text-slate-900">
                                        {project.roles.filter((r: any) => !r.filled).length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Roles</span>
                                    <span className="font-semibold text-slate-900">{project.roles.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Avg. Revenue/Role</span>
                                    <span className="font-semibold text-slate-900">
                                        ${Math.round(project.budget / project.roles.length).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Days Until Deadline</span>
                                    <span className="font-semibold text-slate-900">
                                        {Math.ceil((new Date(project.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
