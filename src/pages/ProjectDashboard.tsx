import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data for projects
const mockProjects = [
    {
        id: '1',
        title: 'AI-Powered Task Manager',
        description: 'Build a modern task management app with AI-powered suggestions and automation.',
        budget: 15000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Backend Developer', split: 30, filled: false, description: 'Node.js API & Database management' },
            { title: 'Product Designer', split: 20, filled: false, description: 'User experience & interface design' },
            { title: 'Growth & GTM Lead', split: 30, filled: false, description: 'Go-to-market strategy & user acquisition' },
            { title: 'Sales Associate', split: 20, filled: true, description: 'B2B outreach & demos' }
        ],
        deadline: '2026-03-15',
        applicants: 12,
        category: 'SaaS'
    },
    {
        id: '2',
        title: 'HealthTech Hackathon Prep',
        description: 'Join a 48-hour sprint to build a patient monitoring dashboard.',
        budget: 5000,
        status: 'open',
        type: 'Hackathon',
        roles: [
            { title: 'Full Stack Developer', split: 40, filled: false, description: 'End-to-end prototype build' },
            { title: 'Medical Research & Legal', split: 30, filled: false, description: 'Healthcare compliance & data ethics' },
            { title: 'Marketing & Pitch Specialist', split: 30, filled: false, description: 'Storytelling & presentation prep' }
        ],
        deadline: '2026-02-28',
        applicants: 24,
        category: 'Health'
    },
    {
        id: '3',
        title: 'Mobile Fitness App',
        description: 'Create a cross-platform fitness tracking app with social features.',
        budget: 20000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Mobile Developer', split: 35, filled: false, description: 'React Native development' },
            { title: 'Community Manager', split: 20, filled: false, description: 'Social engagement & user base management' },
            { title: 'Content Creator / Video', split: 25, filled: false, description: 'Social media content & promotional videos' },
            { title: 'Partnerships & Sales', split: 20, filled: false, description: 'B2B fitness brand partnerships' }
        ],
        deadline: '2026-05-20',
        applicants: 15,
        category: 'Mobile'
    },
    {
        id: '4',
        title: 'Blockchain Analytics Dashboard',
        description: 'Build a real-time analytics dashboard for blockchain transactions.',
        budget: 30000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            { title: 'Blockchain Architect', split: 30, filled: false, description: 'Indexing protocols & smart contracts' },
            { title: 'Data Analyst', split: 25, filled: false, description: 'Transaction pattern discovery' },
            { title: 'Institutional Sales Lead', split: 25, filled: false, description: 'Enterprise client acquisition' },
            { title: 'Compliance & Legal Officer', split: 20, filled: false, description: 'Regulatory framework & Web3 law' }
        ],
        deadline: '2026-06-10',
        applicants: 6,
        category: 'Web3'
    },
    {
        id: '5',
        title: 'Eco-Commerce Marketplace',
        description: 'A dedicated platform for carbon-neutral products and sustainable brands.',
        budget: 25000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Full Stack Engineer', split: 35, filled: false, description: 'Development of the core marketplace' },
            { title: 'Sustainability Consultant', split: 20, filled: false, description: 'Brand vetting and LCA verification' },
            { title: 'Marketing Strategist', split: 25, filled: false, description: 'Eco-conscious brand positioning' },
            { title: 'Supply Chain Lead', split: 20, filled: false, description: 'Logistics and sustainable sourcing' }
        ],
        deadline: '2026-07-22',
        applicants: 8,
        category: 'E-Commerce'
    },
    {
        id: '6',
        title: 'Immersive VR Language School',
        description: 'Practice languages in hyper-realistic VR environments with AI tutors.',
        budget: 45000,
        status: 'open',
        type: 'Enterprise',
        roles: [
            { title: 'Unity Developer', split: 30, filled: false, description: 'VR environment and interaction development' },
            { title: 'AI Training Specialist', split: 25, filled: false, description: 'Developing conversational AI tutors' },
            { title: 'Curriculum Designer', split: 20, filled: false, description: 'Language learning pathway design' },
            { title: 'Sound Engineer', split: 25, filled: false, description: 'Spatial audio and voice synthesis' }
        ],
        deadline: '2026-09-05',
        applicants: 4,
        category: 'EdTech'
    },
    {
        id: '7',
        title: 'Micro-Credit DeFi Portal',
        description: 'Enabling peer-to-peer lending for emerging markets via stablecoins.',
        budget: 40000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Smart Contract Lead', split: 35, filled: false, description: 'Lending protocols & audit management' },
            { title: 'Mobile Engineer', split: 25, filled: false, description: 'Fintech mobile interface focus' },
            { title: 'Risk Analyst', split: 20, filled: false, description: 'Credit scoring algorithms for DeFi' },
            { title: 'Regional Operations Manager', split: 20, filled: false, description: 'Managing local market partnerships' }
        ],
        deadline: '2026-08-15',
        applicants: 19,
        category: 'DeFi'
    },
    {
        id: '8',
        title: 'Global Artisan Collective (Etsy Partnership)',
        description: 'Seek a US-based partner to launch and manage an Etsy storefront for handcrafted designs. Seeking long-term 5-year partnership.',
        budget: 12000,
        status: 'open',
        type: 'Startup',
        roles: [
            { title: 'Product Designer & Maker', split: 70, filled: true, description: 'Creating unique handcrafted items and digital designs.' },
            { title: 'US Operations & Shop Manager', split: 30, filled: false, description: 'Opening Etsy shop, handling customer service & regional logistics in USA.' }
        ],
        deadline: '2026-04-30',
        applicants: 3,
        category: 'E-Commerce'
    }
];

const statusColors = {
    open: 'success',
    'in-progress': 'warning',
    completed: 'secondary',
    cancelled: 'destructive'
} as const;

export function ProjectDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Combine mock projects with user-submitted projects from localStorage
    const [projects] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
        // In a real app, we would only show approved projects here, but for demo we show all
        return [...mockProjects, ...stored].map(p => ({
            ...p,
            status: p.status || 'open' // ensure status exists
        }));
    });

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalBudget = filteredProjects.reduce((sum: number, p: any) => sum + p.budget, 0);
    const openPositions = filteredProjects.reduce((sum: number, p: any) =>
        sum + p.roles.filter((r: any) => !r.filled).length, 0
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Project Dashboard</h1>
                            <p className="mt-2 text-slate-600">Discover projects and start collaborating</p>
                        </div>
                        <Link to="/projects/new">
                            <Button size="lg" className="shadow-lg">
                                <Plus className="mr-2 h-5 w-5" />
                                Create Project
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-primary-700 font-medium">Total Budget</p>
                                    <p className="text-2xl font-bold text-primary-900">${totalBudget.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-green-700 font-medium">Open Positions</p>
                                    <p className="text-2xl font-bold text-green-900">{openPositions}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-700 font-medium">Active Projects</p>
                                    <p className="text-2xl font-bold text-blue-900">{filteredProjects.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'open', 'in-progress', 'completed'].map((status) => (
                            <Button
                                key={status}
                                variant={filterStatus === status ? 'default' : 'outline'}
                                onClick={() => setFilterStatus(status)}
                                className="capitalize"
                            >
                                {status === 'all' ? 'All' : status.replace('-', ' ')}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">No projects found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredProjects.map((project) => (
                            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CardTitle>{project.title}</CardTitle>
                                                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">
                                                    {project.type}
                                                </Badge>
                                            </div>
                                            <CardDescription>{project.description}</CardDescription>
                                        </div>
                                        <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
                                            {project.status.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Budget & Deadline */}
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <DollarSign className="h-4 w-4" />
                                            <span className="font-semibold text-slate-900">${project.budget.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Roles */}
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-2">Open Roles:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.roles.map((role: any, idx: number) => (
                                                <Badge
                                                    key={idx}
                                                    variant={role.filled ? 'secondary' : 'primary'}
                                                    className="text-xs"
                                                >
                                                    {role.title} ({role.split}%)
                                                    {role.filled && ' ✓'}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Revenue Split Preview */}
                                    <div className="bg-slate-50 rounded-lg p-3">
                                        <p className="text-xs font-medium text-slate-600 mb-2">Revenue Split</p>
                                        <div className="flex h-2 rounded-full overflow-hidden bg-slate-200">
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
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link to={`/projects/${project.id}`} className="w-full">
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
