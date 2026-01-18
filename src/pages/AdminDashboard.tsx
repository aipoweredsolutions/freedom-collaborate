import { useState } from 'react';
import {
    CheckCircle,
    XCircle,
    DollarSign,
    TrendingUp,
    CreditCard,
    Activity,
    AlertCircle,
    Users
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
    },
    {
        id: 'p4',
        title: 'AI Video Upscaler',
        creator: 'Visionary Labs',
        budget: 35000,
        type: 'Startup',
        rolesCount: 4,
        description: 'Using Generative AI to upscale legacy video content for streaming platforms.',
        submittedDate: '2026-01-17'
    },
    {
        id: 'p5',
        title: 'Solar Energy Grid Monitor',
        creator: 'Helios Systems',
        budget: 60000,
        type: 'Enterprise',
        rolesCount: 7,
        description: 'IoT platform for managing community solar grids and surplus distribution.',
        submittedDate: '2026-01-18'
    }
];

// Mock Data for Payments
const recentTransactions = [
    { id: 't1', project: 'AI Task Manager', amount: 1500, type: 'Milestone Release', date: '2026-01-18', status: 'completed' },
    { id: 't2', project: 'E-commerce Platform', amount: 3200, type: 'Initial Deposit', date: '2026-01-17', status: 'completed' },
    { id: 't3', project: 'Mobile Fitness App', amount: 850, type: 'Weekly Payout', date: '2026-01-17', status: 'processing' },
    { id: 't4', project: 'Blockchain Dashboard', amount: 5000, type: 'Completion Bonus', date: '2026-01-16', status: 'completed' },
];

export function AdminDashboard() {
    const [pendingProjects, setPendingProjects] = useState(initialPendingProjects);

    const handleApprove = (id: string) => {
        setPendingProjects(pendingProjects.filter(p => p.id !== id));
        // In a real app, you would make an API call here
    };

    const handleReject = (id: string) => {
        setPendingProjects(pendingProjects.filter(p => p.id !== id));
        // In a real app, you would make an API call here
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="mt-2 text-slate-600">Manage project approvals and monitor platform revenue.</p>
                </div>

                <Tabs defaultValue="approvals" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                        <TabsTrigger value="approvals">Project Approvals</TabsTrigger>
                        <TabsTrigger value="payments">Revenue & Payments</TabsTrigger>
                    </TabsList>

                    {/* Project Approvals Tab */}
                    <TabsContent value="approvals" className="space-y-6">
                        <div className="grid gap-6">
                            {pendingProjects.length === 0 ? (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center h-48">
                                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                                        <p className="text-lg font-medium text-slate-900">All caught up!</p>
                                        <p className="text-slate-500">No pending project approvals.</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                pendingProjects.map((project) => (
                                    <Card key={project.id}>
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle>{project.title}</CardTitle>
                                                    <CardDescription>Submitted by {project.creator} on {project.submittedDate}</CardDescription>
                                                </div>
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                    Pending Review
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-600 mb-4">{project.description}</p>
                                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-green-600" />
                                                    Budget: <span className="font-medium text-slate-900">${project.budget.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-blue-600" />
                                                    Roles: <span className="font-medium text-slate-900">{project.rolesCount}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={() => handleApprove(project.id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve Project
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleReject(project.id)}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments" className="space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <DollarSign className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$45,231.89</div>
                                    <p className="text-xs text-slate-500 max-w-[200px]">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$2,350.00</div>
                                    <p className="text-xs text-slate-500">+15% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Splits</CardTitle>
                                    <Activity className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-slate-500">Projects currently distributing revenue</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>Latest financial activity across the platform.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTransactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-white">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <CreditCard className="h-5 w-5 text-slate-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{tx.project}</p>
                                                    <p className="text-sm text-slate-500">{tx.type} • {tx.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-slate-900">${tx.amount.toLocaleString()}</p>
                                                <Badge variant={tx.status === 'completed' ? 'success' : 'warning'} className="mt-1">
                                                    {tx.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Revenue Split Alert */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="flex items-center gap-4 p-4">
                                <AlertCircle className="h-6 w-6 text-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-blue-900">Platform Split Active</h4>
                                    <p className="text-sm text-blue-700">The platform automatically takes a 5% fee from all processed payments to maintain operations.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
