import { useState, useEffect, type ReactNode } from 'react';
import {
    CheckCircle,
    XCircle,
    DollarSign,
    TrendingUp,
    CreditCard,
    Activity,
    Users,
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

export function AdminDashboard() {
    const [pendingProjects, setPendingProjects] = useState<any[]>([]);
    const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);
    const [pendingPayouts, setPendingPayouts] = useState(initialPendingPayouts);
    const [pendingMilestones, setPendingMilestones] = useState(initialPendingMilestones);

    const loadProjects = () => {
        const storedPending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
        setPendingProjects([...initialPendingProjects, ...storedPending]);
    };

    useEffect(() => {
        loadProjects();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'pendingProjects') {
                loadProjects();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleApprove = (id: string, type: 'project' | 'user' | 'payout' | 'milestone') => {
        if (type === 'project') {
            const updated = pendingProjects.filter(p => p.id !== id);
            setPendingProjects(updated);

            // Also update localStorage for user-submitted projects
            const storedPending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
            const filteredStored = storedPending.filter((p: any) => p.id !== id);
            localStorage.setItem('pendingProjects', JSON.stringify(filteredStored));

            // In a real app, you would add this to an 'approvedProjects' list
        }
        if (type === 'user') setPendingUsers(pendingUsers.filter(u => u.id !== id));
        if (type === 'payout') setPendingPayouts(pendingPayouts.filter(p => p.id !== id));
        if (type === 'milestone') setPendingMilestones(pendingMilestones.filter(m => m.id !== id));
    };

    const handleReject = (id: string, type: 'project' | 'user' | 'payout' | 'milestone') => {
        if (type === 'project') {
            const updated = pendingProjects.filter(p => p.id !== id);
            setPendingProjects(updated);

            // Also update localStorage
            const storedPending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
            const filteredStored = storedPending.filter((p: any) => p.id !== id);
            localStorage.setItem('pendingProjects', JSON.stringify(filteredStored));
        }
        if (type === 'user') setPendingUsers(pendingUsers.filter(u => u.id !== id));
        if (type === 'payout') setPendingPayouts(pendingPayouts.filter(p => p.id !== id));
        if (type === 'milestone') setPendingMilestones(pendingMilestones.filter(m => m.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8 text-primary-600" />
                            Admin Control Center
                        </h1>
                        <p className="mt-2 text-slate-600 font-medium">Platform Curation & Financial Oversight</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Pending Approvals" value={(pendingProjects.length + pendingUsers.length).toString()} icon={<Clock className="h-4 w-4" />} trend="High volume" />
                    <StatCard title="Active Huddles" value="14" icon={<MessageCircle className="h-4 w-4" />} trend="9 focus on revenue-share" />
                    <StatCard title="Total Escrow" value="$142,500" icon={<ShieldCheck className="h-4 w-4" />} trend="Global safety pool" />
                    <StatCard title="Total Payouts" value="$52,400" icon={<CreditCard className="h-4 w-4" />} trend="+12% from last week" />
                </div>

                <Tabs defaultValue="projects" className="space-y-6">
                    <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex">
                        <TabsList className="bg-transparent border-none">
                            <TabsTrigger value="projects" className="gap-2">
                                <Clock className="h-4 w-4" />
                                Projects ({pendingProjects.length})
                            </TabsTrigger>
                            <TabsTrigger value="users" className="gap-2">
                                <UserCheck className="h-4 w-4" />
                                Users ({pendingUsers.length})
                            </TabsTrigger>
                            <TabsTrigger value="payouts" className="gap-2">
                                <Wallet className="h-4 w-4" />
                                Payouts ({pendingPayouts.length})
                            </TabsTrigger>
                            <TabsTrigger value="milestones" className="gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                Milestones ({pendingMilestones.length})
                            </TabsTrigger>
                            <TabsTrigger value="revenue" className="gap-2">
                                <Activity className="h-4 w-4" />
                                Revenue
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Project Approvals Tab */}
                    <TabsContent value="projects" className="space-y-6">
                        <div className="grid gap-6">
                            {pendingProjects.length === 0 ? (
                                <EmptyState title="No pending projects" />
                            ) : (
                                pendingProjects.map((project) => (
                                    <Card key={project.id} className="border-l-4 border-l-yellow-400">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle>{project.title}</CardTitle>
                                                    <CardDescription>Submitted by {project.creator} on {project.submittedDate}</CardDescription>
                                                </div>
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                    Needs Review
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-600 mb-4">{project.description}</p>

                                            {/* Duration & Revenue Details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Project Duration</p>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {project.duration?.type === 'fixed'
                                                            ? `${project.duration.startDate} to ${project.duration.endDate}`
                                                            : 'Ongoing' + (project.duration?.reviewDate ? ` (Review: ${project.duration.reviewDate})` : '')
                                                        }
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Revenue Terms</p>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {project.revenueSharing?.type === 'one-time' && 'One-time Payout'}
                                                        {project.revenueSharing?.type === 'fixed-term' && `${project.revenueSharing.term} Months Fixed Term`}
                                                        {project.revenueSharing?.type === 'ongoing' && 'Ongoing Distribution'}
                                                        {!project.revenueSharing && 'Standard'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-green-600" />
                                                    Budget: <span className="text-slate-900">
                                                        {project.isRevenueBased ? 'Revenue Split Only' : `$${project.budget.toLocaleString()}`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-primary-600" />
                                                    Required Roles: <span className="text-slate-900">{project.rolesCount}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={() => handleApprove(project.id, 'project')}
                                                    className="bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve Project
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        const reason = prompt("Enter reason for pause/rejection:");
                                                        if (reason) handleReject(project.id, 'project');
                                                    }}
                                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject / Pause
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => alert("Renewal assistant launched for " + project.title)}
                                                    className="text-primary-600"
                                                >
                                                    Modify Terms
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* User Approvals Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <div className="grid gap-6">
                            {pendingUsers.length === 0 ? (
                                <EmptyState title="No pending user verifications" />
                            ) : (
                                pendingUsers.map((user) => (
                                    <Card key={user.id} className="border-l-4 border-l-blue-400">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-900">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
                                                        <p className="text-sm font-semibold text-primary-600">{user.role}</p>
                                                        <p className="text-sm text-slate-500 mt-1 max-w-md">{user.bio}</p>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {user.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={() => handleApprove(user.id, 'user')} className="bg-green-600 hover:bg-green-700 text-white">
                                                        Verify User
                                                    </Button>
                                                    <Button variant="outline" onClick={() => handleReject(user.id, 'user')} className="text-red-500">
                                                        Decline
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Payout Approvals Tab */}
                    <TabsContent value="payouts" className="space-y-6">
                        <div className="grid gap-6">
                            {pendingPayouts.length === 0 ? (
                                <EmptyState title="No pending payouts" />
                            ) : (
                                pendingPayouts.map((py) => (
                                    <Card key={py.id} className="border-l-4 border-l-emerald-400">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                                        <DollarSign className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">${py.amount.toLocaleString()}</p>
                                                        <p className="text-sm text-slate-500 font-medium">{py.type} for <span className="text-primary-600">{py.project}</span></p>
                                                        <p className="text-xs text-slate-400">Payee: {py.user} • Requested: {py.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={() => handleApprove(py.id, 'payout')} className="bg-green-600 hover:bg-green-700 text-white">
                                                        Release Funds
                                                    </Button>
                                                    <Button variant="outline" onClick={() => handleReject(py.id, 'payout')} className="text-orange-600 border-orange-200">
                                                        Hold for Review
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Milestones Tab */}
                    <TabsContent value="milestones" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pendingMilestones.map((milestone) => (
                                <Card key={milestone.id} className="overflow-hidden border-2 border-slate-100 hover:border-primary-100 transition-all">
                                    <CardHeader className="bg-slate-50/50 pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{milestone.project}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 mt-1">
                                                    <Activity className="h-3 w-3" />
                                                    {milestone.phase}
                                                </CardDescription>
                                            </div>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                Verification Requested
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="flex justify-between items-center mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-primary-600" />
                                                <span className="text-sm font-semibold text-primary-900">Release Amount</span>
                                            </div>
                                            <span className="text-lg font-bold text-primary-700">${milestone.payout.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                            <Clock className="h-3 w-3" />
                                            Requested on {milestone.requestedDate}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button
                                                variant="outline"
                                                className="border-slate-200 text-slate-600 hover:bg-slate-50"
                                                onClick={() => handleReject(milestone.id, 'milestone')}
                                            >
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Reject
                                            </Button>
                                            <Button
                                                className="bg-primary-600 hover:bg-primary-700 text-white"
                                                onClick={() => handleApprove(milestone.id, 'milestone')}
                                            >
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Verify & Release
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {pendingMilestones.length === 0 && (
                                <div className="col-span-2 py-12 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
                                    <ShieldCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">No milestones awaiting verification</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Revenue Tab (Existing) */}
                    <TabsContent value="revenue" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard title="Total Platform Revenue" value="$45,231.89" icon={<DollarSign className="h-4 w-4" />} trend="+20.1% this month" />
                            <StatCard title="Net Platform Fees" value="$2,350.00" icon={<TrendingUp className="h-4 w-4" />} trend="+15% this month" />
                            <StatCard title="Active Revenue Splits" value="12" icon={<Activity className="h-4 w-4" />} trend="Across 4 categories" />
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Marketplace Activity</CardTitle>
                                <CardDescription>Successful payouts and platform fee collections.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTransactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <CreditCard className="h-5 w-5 text-slate-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{tx.project}</p>
                                                    <p className="text-sm text-slate-500 font-medium">{tx.type} • {tx.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-slate-900 text-lg">${tx.amount.toLocaleString()}</p>
                                                <Badge variant={tx.status === 'completed' ? 'success' : 'warning'} className="mt-1">
                                                    {tx.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend }: { title: string; value: string; icon: ReactNode; trend: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</CardTitle>
                <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {trend}
                </p>
            </CardContent>
        </Card>
    );
}

function EmptyState({ title }: { title: string }) {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4 opacity-20" />
                <p className="text-xl font-bold text-slate-900">{title}</p>
                <p className="text-slate-500 font-medium mt-1">Platform is running smoothly.</p>
            </CardContent>
        </Card>
    );
}

