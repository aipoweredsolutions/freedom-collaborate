/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import {
    CheckCircle,
    XCircle,
    DollarSign,
    TrendingUp,
    Activity,
    ShieldCheck,
    Clock,
    UserCheck,
    Wallet,
    MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock Data for Pending Projects
const initialPendingProjects = [
    {
        id: 'p1',
        title: 'Global Eco-Product Launch',
        creator: 'GreenEarth',
        budget: 50000,
        type: 'Startup',
        rolesCount: 5,
        description: 'Launching a sustainable home goods line with a focus on D2C marketing and logistics.',
        submittedDate: '2026-01-15'
    },
    {
        id: 'p2',
        title: 'Social Media for Pets',
        creator: 'Sarah Jenkins',
        budget: 12000,
        type: 'Startup',
        rolesCount: 3,
        description: 'Instagram but for cats and dogs only. Need creators and community leads.',
        submittedDate: '2026-01-16'
    },
    {
        id: 'p3',
        title: 'LegalTech Compliance Suite',
        creator: 'LexGroup',
        budget: 45000,
        type: 'Enterprise',
        rolesCount: 6,
        description: 'Automating regulatory compliance for small law firms.',
        submittedDate: '2026-01-17'
    }
];

// Mock Data for Pending Users
const initialPendingUsers = [
    { id: 'u1', name: 'James Wilson', role: 'Full Stack Dev', bio: 'Ex-Google engineer looking for high-impact social projects.', joinedDate: '2026-01-17', skills: ['React', 'Rust'] },
    { id: 'u2', name: 'Elena Vance', role: 'Product Designer', bio: 'Specializing in VR interfaces and immersive experiences.', joinedDate: '2026-01-18', skills: ['Figma', 'Unity'] },
    { id: 'u3', name: 'Marcus Thorne', role: 'Growth Lead', bio: 'Scaled 3 startups from 0 to 1M users.', joinedDate: '2026-01-18', skills: ['Marketing', 'SEO'] },
];

// Mock Data for Pending Milestones
const initialPendingMilestones = [
    { id: 'm1', project: 'Global Artisan Collective', phase: 'Launch & SEO Optimization', status: 'Verification Requested', requestedDate: '2026-01-18', payout: 2500 },
    { id: 'm2', project: 'AI Task Manager', phase: 'Development', status: 'Verification Requested', requestedDate: '2026-01-18', payout: 5000 },
];

// Mock Data for Pending Payouts
const initialPendingPayouts = [
    { id: 'py1', project: 'AI Task Manager', user: 'Sarah Johnson', amount: 2500, type: 'Milestone 2', date: '2026-01-18' },
    { id: 'py2', project: 'Fitness App', user: 'David Kim', amount: 1200, type: 'Weekly Payout', date: '2026-01-18' },
];

// Mock Data for Payments
const recentTransactions = [
    { id: 't1', project: 'AI Task Manager', amount: 1500, type: 'Milestone Release', date: '2026-01-18', status: 'completed' },
    { id: 't2', project: 'E-commerce Platform', amount: 3200, type: 'Initial Deposit', date: '2026-01-17', status: 'completed' },
    { id: 't3', project: 'Mobile Fitness App', amount: 850, type: 'Weekly Payout', date: '2026-01-17', status: 'processing' },
    { id: 't4', project: 'Blockchain Dashboard', amount: 5000, type: 'Completion Bonus', date: '2026-01-16', status: 'completed' },
];

const StatCard = ({ title, value, icon: Icon, trend, description }: { title: string, value: string, icon: any, trend?: string, description: string }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary-50 rounded-lg">
                    <Icon className="h-5 w-5 text-primary-600" />
                </div>
                {trend && (
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                        {trend}
                    </Badge>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
                <p className="text-xs text-slate-400 mt-1">{description}</p>
            </div>
        </CardContent>
    </Card>
);

export function AdminDashboard() {
    const [pendingProjects, setPendingProjects] = useState<any[]>([]);
    const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);
    const [pendingPayouts, setPendingPayouts] = useState(initialPendingPayouts);
    const [pendingMilestones, setPendingMilestones] = useState(initialPendingMilestones);

    const loadProjects = useCallback(() => {
        const storedPending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
        setPendingProjects([...initialPendingProjects, ...storedPending]);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'pendingProjects') {
                loadProjects();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadProjects]);

    const handleApprove = (id: string, type: 'project' | 'user' | 'payout' | 'milestone') => {
        if (type === 'project') {
            const updated = pendingProjects.filter(p => p.id !== id);
            setPendingProjects(updated);
        } else if (type === 'user') {
            setPendingUsers(pendingUsers.filter(u => u.id !== id));
        } else if (type === 'payout') {
            setPendingPayouts(pendingPayouts.filter(p => p.id !== id));
        } else if (type === 'milestone') {
            setPendingMilestones(pendingMilestones.filter(m => m.id !== id));
        }
    };

    const handleReject = (id: string, type: 'project' | 'user' | 'payout' | 'milestone') => {
        handleApprove(id, type); // For now, just remove from list
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
                        <p className="text-slate-600 mt-1">Monitor platform health and approve sensitive operations</p>
                    </div>
                    <Badge variant="outline" className="px-4 py-1 text-primary-600 border-primary-200 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
                        System Online
                    </Badge>
                </div>

                {/* Performance Snapshot */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Platform TVL"
                        value="$842,500"
                        icon={Wallet}
                        trend="+15%"
                        description="Total value locked in escrow"
                    />
                    <StatCard
                        title="Net Platform Fees"
                        value="$42,125"
                        icon={TrendingUp}
                        trend="+8%"
                        description="Cumulative revenue from 5% fee"
                    />
                    <StatCard
                        title="Active Huddles"
                        value="124"
                        icon={MessageCircle}
                        description="Ongoing negotiations & calls"
                    />
                    <StatCard
                        title="Identity Verified"
                        value="1,842"
                        icon={ShieldCheck}
                        trend="+242"
                        description="Trust-score verified members"
                    />
                </div>

                <Tabs defaultValue="projects" className="space-y-6">
                    <TabsList className="bg-white border border-slate-200">
                        <TabsTrigger value="projects" className="data-[state=active]:bg-primary-50">Pending Projects ({pendingProjects.length})</TabsTrigger>
                        <TabsTrigger value="users" className="data-[state=active]:bg-primary-50">Verify Identity ({pendingUsers.length})</TabsTrigger>
                        <TabsTrigger value="milestones" className="data-[state=active]:bg-primary-50">Milestones ({pendingMilestones.length})</TabsTrigger>
                        <TabsTrigger value="payouts" className="data-[state=active]:bg-primary-50">High-Value Payouts</TabsTrigger>
                        <TabsTrigger value="revenue" className="data-[state=active]:bg-primary-50 text-primary-600 font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Revenue Control
                        </TabsTrigger>
                    </TabsList>

                    {/* Pending Projects */}
                    <TabsContent value="projects">
                        <div className="grid grid-cols-1 gap-4">
                            {pendingProjects.length === 0 ? (
                                <Card className="p-12 text-center text-slate-500">
                                    All projects have been reviewed. Good work!
                                </Card>
                            ) : (
                                pendingProjects.map((project) => (
                                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                                                        <Badge variant="outline">{project.type}</Badge>
                                                        {project.isRevenueBased && (
                                                            <Badge className="bg-primary-100 text-primary-700 border-primary-200">Revenue Split Only</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 mb-4">{project.description}</p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <UserCheck className="h-4 w-4" />
                                                            <span>Creator: <span className="font-semibold text-slate-900">{project.creator || project.createdBy?.name}</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="h-4 w-4" />
                                                            <span>Budget: <span className="font-semibold text-slate-900">
                                                                {project.isRevenueBased ? 'Revenue Split' : `$${project.budget.toLocaleString()}`}
                                                            </span></span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>Submitted: {project.submittedDate || 'Just now'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant="outline"
                                                        className="border-red-200 text-red-600 hover:bg-red-50"
                                                        onClick={() => handleReject(project.id, 'project')}
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleApprove(project.id, 'project')}
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Approve Project
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Verify Identity */}
                    <TabsContent value="users">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingUsers.map((user) => (
                                <Card key={user.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{user.name}</h3>
                                                <p className="text-sm text-slate-500">{user.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{user.bio}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {user.skills.map((skill: string) => (
                                                <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button variant="outline" size="sm" onClick={() => handleReject(user.id, 'user')}>Reject</Button>
                                            <Button className="bg-primary-600" size="sm" onClick={() => handleApprove(user.id, 'user')}>Verify</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Pending Milestones */}
                    <TabsContent value="milestones">
                        <div className="grid grid-cols-1 gap-4">
                            {pendingMilestones.map((milestone) => (
                                <Card key={milestone.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-slate-900">{milestone.phase}</h3>
                                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Verification Requested</Badge>
                                                </div>
                                                <p className="font-semibold text-primary-600 mb-2">{milestone.project}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4" />
                                                        <span>Escrow Release: <span className="font-bold text-slate-900">${milestone.payout.toLocaleString()}</span></span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Requested: {milestone.requestedDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                                    onClick={() => handleReject(milestone.id, 'milestone')}
                                                >
                                                    Query Proof
                                                </Button>
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleApprove(milestone.id, 'milestone')}
                                                >
                                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                                    Release Funds
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Revenue Tab */}
                    <TabsContent value="revenue">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-slate-900 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <TrendingUp className="h-24 w-24" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-base text-primary-400">Total Platform Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold font-mono">$1,250,430</p>
                                    <p className="text-xs text-slate-400 mt-2">Historical volume processed</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Activity className="h-24 w-24" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-base text-primary-400">Net Platform Fees</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold font-mono">$62,521</p>
                                    <p className="text-xs text-slate-400 mt-2">From 5% transaction tax</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ShieldCheck className="h-24 w-24" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-base text-primary-400">Active Revenue Splits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold font-mono">142</p>
                                    <p className="text-xs text-slate-400 mt-2">Projects automatically sharing revenue</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Pending Payouts */}
                    <TabsContent value="payouts">
                        <Card>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Project</th>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">User</th>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Amount</th>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Type</th>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Date</th>
                                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {pendingPayouts.map((payout) => (
                                                <tr key={payout.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{payout.project}</td>
                                                    <td className="px-6 py-4 text-slate-600">{payout.user}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold text-slate-900">${payout.amount.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant="outline" className="text-[10px]">{payout.type}</Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500">{payout.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={() => handleReject(payout.id, 'payout')}>
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500" onClick={() => handleApprove(payout.id, 'payout')}>
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Recent Platform History */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-slate-400" />
                        Live Transaction Ledger
                    </h2>
                    <Card>
                        <CardHeader className="pb-0">
                            <CardDescription>Real-time audit of all platform-managed project transactions</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {recentTransactions.map((tx) => (
                                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                <DollarSign className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-slate-900">{tx.project}</p>
                                                    <Badge variant="outline" className="text-[10px]">{tx.type}</Badge>
                                                </div>
                                                <p className="text-xs text-slate-500">{tx.date} • Reference: {tx.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">${tx.amount.toLocaleString()}</p>
                                            <p className={`text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                                                }`}>{tx.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
