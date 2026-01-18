import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Star,
    ShieldCheck,
    TrendingUp,
    Sparkles,
    Zap,
    UserPlus,
    CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';

// Mock Data for Collaborators
const mockCollaborators = [
    {
        id: 'sarah-johnson',
        name: 'Sarah Johnson',
        role: 'Senior Frontend Developer',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'GraphQL'],
        availability: 'Available for projects',
        rate: '$95/hr',
        rating: 4.8,
        projectsCompleted: 12,
        avatar: 'SJ',
        bio: 'Passionate about building intuitive user interfaces and scalable design systems. I specialize in React and TypeScript.',
        verified: true,
        matchScore: 98,
        revenueImpact: 45000,
        tags: ['High Reliability', 'Revenue Leader']
    },
    {
        id: 'david-kim',
        name: 'David Kim',
        role: 'Full Stack Engineer',
        skills: ['Node.js', 'React', 'PostgreSQL', 'Python', 'Docker'],
        availability: 'Limited Availability',
        rate: '$85/hr',
        rating: 4.9,
        projectsCompleted: 5,
        avatar: 'DK',
        bio: 'Building the future of HealthTech. I love solving complex backend problems and creating efficient data pipelines.',
        verified: true,
        matchScore: 92,
        revenueImpact: 12000,
        tags: ['Scalability Expert']
    },
    {
        id: 'marcus-thorne',
        name: 'Marcus Thorne',
        role: 'Cybersecurity Analyst',
        skills: ['Penetration Testing', 'Network Security', 'ISO 27001', 'Encryption'],
        availability: 'Available for projects',
        rate: '$110/hr',
        rating: 4.9,
        projectsCompleted: 24,
        avatar: 'MT',
        bio: 'Protecting digital assets through rigorous security audits and strategic redundancy. Expert in zero-trust architecture.',
        verified: true,
        matchScore: 88,
        revenueImpact: 0,
        tags: ['Security Shield', 'Enterprise Ready']
    },
    {
        id: 'olivia-bennett',
        name: 'Olivia Bennett',
        role: 'Growth Marketing Lead',
        skills: ['PPC', 'Product-Led Growth', 'Funnel Optimization', 'Data Analytics'],
        availability: 'Available for core roles',
        rate: '$105/hr',
        rating: 5.0,
        projectsCompleted: 9,
        avatar: 'OB',
        bio: 'Driving sustainable user acquisition through data-driven experiments and viral loops.',
        verified: true,
        matchScore: 95,
        revenueImpact: 125000,
        tags: ['Growth Catalyst', 'Revenue Driver']
    },
    {
        id: 'aiden-gallagher',
        name: 'Aiden Gallagher',
        role: 'Smart Contract Developer',
        skills: ['Solidity', 'Rust', 'Web3.js', 'Ethers.js'],
        availability: 'Part-time',
        rate: '$130/hr',
        rating: 4.6,
        projectsCompleted: 21,
        avatar: 'AG',
        bio: 'Building secure, efficient, and audited smart contracts for the next generation of finance.',
        verified: true,
        matchScore: 85,
        revenueImpact: 0,
        tags: ['Web3 Native']
    }
];

const myProjects = [
    {
        id: 'p1',
        title: 'AI Task Manager',
        openRoles: [
            { id: 'r1', title: 'Frontend Developer' },
            { id: 'r2', title: 'UI Designer' }
        ]
    },
    {
        id: 'p2',
        title: 'E-commerce Platform',
        openRoles: [
            { id: 'r3', title: 'Backend Developer' },
            { id: 'r4', title: 'DevOps Engineer' }
        ]
    }
];

export function TeamMatching() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState<typeof mockCollaborators[0] | null>(null);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [inviteSent, setInviteSent] = useState(false);

    const filteredCollaborators = mockCollaborators.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleInvite = () => {
        console.log(`Inviting ${selectedCollaborator?.name} to project ${selectedProject} for role ${selectedRole}`);
        setInviteSent(true);
        setTimeout(() => {
            setInviteSent(false);
            setSelectedProject('');
            setSelectedRole('');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[30%] h-full bg-primary-600/10 blur-[100px] rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                                <Sparkles className="h-8 w-8 text-primary-400" />
                                Smart Team Matching
                            </h1>
                            <p className="mt-2 text-slate-400 text-lg">AI-powered recommendations based on your active projects and revenue goals.</p>
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                            <Button variant="ghost" className="text-white hover:bg-white/10">All Talent</Button>
                            <Button className="bg-primary-600 text-white hover:bg-primary-500">Curated Matches</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <Input
                            placeholder="Describe what you need: 'I need a frontend dev with e-commerce experience'..."
                            className="h-14 pl-12 bg-white border-slate-200 text-slate-900 shadow-sm rounded-2xl focus:ring-primary-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-14 px-6 gap-2 rounded-2xl bg-white border-slate-200 text-slate-600">
                            <Filter className="h-4 w-4" />
                            Smart Filters
                        </Button>
                        <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                            Analyze Matches
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCollaborators.map((collaborator) => (
                        <Card key={collaborator.id} className="group overflow-hidden border-2 border-slate-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 rounded-2xl">
                            <div className="p-1 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Zap className="h-3 w-3 text-primary-500" />
                                    AI Match Score
                                </div>
                                <span className="text-primary-600 font-bold text-xs">{collaborator.matchScore}%</span>
                            </div>
                            <CardHeader
                                className="flex flex-row items-center gap-4 pb-2 pt-6 cursor-pointer"
                                onClick={() => navigate(`/profile/${collaborator.id}`)}
                            >
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-900 text-2xl font-bold shadow-inner relative group-hover:scale-105 transition-transform">
                                    {collaborator.avatar}
                                    {collaborator.verified && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 shadow-lg ring-2 ring-white">
                                            <ShieldCheck className="h-3 w-3" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl text-slate-900">{collaborator.name}</h3>
                                    <p className="text-sm font-medium text-primary-600">{collaborator.role}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-2">
                                <p className="text-sm text-slate-600 leading-relaxed min-h-[40px] line-clamp-2">{collaborator.bio}</p>

                                <div className="flex flex-wrap gap-2">
                                    {collaborator.skills.slice(0, 4).map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-[10px] font-bold bg-slate-100 text-slate-600 border-none px-2 py-0.5 uppercase">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {collaborator.skills.length > 4 && (
                                        <span className="text-[10px] text-slate-400 font-bold">+{collaborator.skills.length - 4} MORE</span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Impact Rating</p>
                                        <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                            {collaborator.rating}
                                            <span className="text-slate-400 font-normal">({collaborator.projectsCompleted} ops)</span>
                                        </div>
                                    </div>
                                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Revenue Impact</p>
                                        <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            {collaborator.revenueImpact > 0 ? `$${(collaborator.revenueImpact / 1000).toFixed(0)}k+` : 'New Partner'}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full gap-2" onClick={() => setSelectedCollaborator(collaborator)}>
                                            <UserPlus className="h-4 w-4" />
                                            Invite to Project
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Invite {collaborator.name} to Collaborate</DialogTitle>
                                            <DialogDescription>
                                                Send an invitation to join one of your active projects.
                                            </DialogDescription>
                                        </DialogHeader>

                                        {inviteSent ? (
                                            <div className="py-6 text-center">
                                                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                </div>
                                                <h3 className="text-lg font-medium text-slate-900">Invitation Sent!</h3>
                                                <p className="text-slate-500 mt-1">We've notified {collaborator.name} about your interest.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Select Project</Label>
                                                    <select
                                                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        value={selectedProject}
                                                        onChange={(e) => setSelectedProject(e.target.value)}
                                                    >
                                                        <option value="">Select a project...</option>
                                                        {myProjects.map(p => (
                                                            <option key={p.id} value={p.id}>{p.title}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {selectedProject && (
                                                    <div className="space-y-2">
                                                        <Label>Select Role</Label>
                                                        <select
                                                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={selectedRole}
                                                            onChange={(e) => setSelectedRole(e.target.value)}
                                                        >
                                                            <option value="">Select a role...</option>
                                                            {myProjects.find(p => p.id === selectedProject)?.openRoles.map(r => (
                                                                <option key={r.id} value={r.id}>{r.title}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <Label>Message (Optional)</Label>
                                                    <textarea
                                                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="Hey! saw your profile and thought you'd be a great fit..."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {!inviteSent && (
                                            <DialogFooter>
                                                <Button type="submit" onClick={handleInvite} disabled={!selectedProject || !selectedRole}>
                                                    Send Invitation
                                                </Button>
                                            </DialogFooter>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
