import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, CheckCircle2, UserPlus } from 'lucide-react';
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
        id: '1',
        name: 'Alex Chen',
        role: 'Full Stack Developer',
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        availability: 'Part-time',
        rate: '$60/hr',
        rating: 4.9,
        projectsCompleted: 15,
        avatar: 'AC',
        bio: 'Passionate about building scalable web applications and solving complex problems.',
        verified: true
    },
    {
        id: '2',
        name: 'Sarah Jones',
        role: 'UI/UX Designer',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
        availability: 'Full-time',
        rate: '$85/hr',
        rating: 5.0,
        projectsCompleted: 22,
        avatar: 'SJ',
        bio: 'Creating intuitive and beautiful user experiences is my passion.',
        verified: true
    },
    {
        id: '3',
        name: 'Michael Brown',
        role: 'Backend Engineer',
        skills: ['Python', 'Django', 'AWS', 'Docker'],
        availability: 'Contract',
        rate: '$75/hr',
        rating: 4.7,
        projectsCompleted: 10,
        avatar: 'MB',
        bio: 'Specialized in cloud architecture and backend performance optimization.',
        verified: false
    },
    {
        id: '4',
        name: 'Emily Davis',
        role: 'Product Manager',
        skills: ['Agile', 'Scrum', 'Product Strategy', 'Jira'],
        availability: 'Part-time',
        rate: '$90/hr',
        rating: 4.8,
        projectsCompleted: 18,
        avatar: 'ED',
        bio: 'Experienced PM helping teams deliver high-quality products on time.',
        verified: true
    },
    {
        id: '5',
        name: 'David Lee',
        role: 'Mobile Developer',
        skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
        availability: 'Full-time',
        rate: '$70/hr',
        rating: 4.6,
        projectsCompleted: 8,
        avatar: 'DL',
        bio: 'Building seamless mobile experiences for iOS and Android.',
        verified: true
    },
    {
        id: '6',
        name: 'Lisa Wong',
        role: 'Frontend Developer',
        skills: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'HTML5'],
        availability: 'Contract',
        rate: '$55/hr',
        rating: 4.5,
        projectsCompleted: 12,
        avatar: 'LW',
        bio: 'Frontend specialist with a keen eye for design details.',
        verified: false
    },
    {
        id: '7',
        name: 'Marcus Thorne',
        role: 'Cybersecurity Analyst',
        skills: ['Penetration Testing', 'Network Security', 'ISO 27001', 'Encryption'],
        availability: 'Full-time',
        rate: '$110/hr',
        rating: 4.9,
        projectsCompleted: 24,
        avatar: 'MT',
        bio: 'Protecting digital assets through rigorous security audits and strategic redundancy.',
        verified: true
    },
    {
        id: '8',
        name: 'Sofia Rodriguez',
        role: 'Content Strategist',
        skills: ['Brand Voice', 'Content Marketing', 'SEO', 'Creative Writing'],
        availability: 'Contract',
        rate: '$65/hr',
        rating: 4.8,
        projectsCompleted: 31,
        avatar: 'SR',
        bio: 'Helping startups tell their story through high-impact content and narrative-driven growth.',
        verified: true
    },
    {
        id: '9',
        name: 'Kofi Mensah',
        role: 'Cloud Architect',
        skills: ['AWS', 'Kubernetes', 'Terraform', 'System Design'],
        availability: 'Part-time',
        rate: '$120/hr',
        rating: 4.9,
        projectsCompleted: 15,
        avatar: 'KM',
        bio: 'Specialized in building resilient and scalable cloud-native architectures for DeFi projects.',
        verified: true
    },
    {
        id: '10',
        name: 'Yuki Tanaka',
        role: 'Motion Designer',
        skills: ['After Effects', 'Cinema 4D', 'Lottie', 'UI Animation'],
        availability: 'Contract',
        rate: '$80/hr',
        rating: 4.7,
        projectsCompleted: 14,
        avatar: 'YT',
        bio: 'Bringing interfaces to life with smooth, meaningful micro-interactions and high-end motion graphics.',
        verified: false
    },
    {
        id: '11',
        name: 'Olivia Bennett',
        role: 'Growth Marketing Lead',
        skills: ['PPC', 'Product-Led Growth', 'Funnel Optimization', 'Data Analytics'],
        availability: 'Full-time',
        rate: '$95/hr',
        rating: 5.0,
        projectsCompleted: 9,
        avatar: 'OB',
        bio: 'Driving sustainable user acquisition through data-driven experiments and viral loops.',
        verified: true
    },
    {
        id: '12',
        name: 'Aiden Gallagher',
        role: 'Smart Contract Developer',
        skills: ['Solidity', 'Rust', 'Web3.js', 'Ethers.js'],
        availability: 'Part-time',
        rate: '$130/hr',
        rating: 4.6,
        projectsCompleted: 21,
        avatar: 'AG',
        bio: 'Building secure, efficient, and audited smart contracts for the next generation of finance.',
        verified: true
    }
];

// Mock Data for My Projects (for invite)
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

const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

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
        // Here you would implement the actual invite logic
        console.log(`Inviting ${selectedCollaborator?.name} to project ${selectedProject} for role ${selectedRole}`);
        setInviteSent(true);
        setTimeout(() => {
            setInviteSent(false);
            setSelectedProject('');
            setSelectedRole('');
            // Close dialog logic would be handled by Dialog open state if managed, 
            // but efficiently relying on uncotrolled or simple alert for now if complex.
            // Actually, we should close the dialog. 
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-slate-900">Find Collaborators</h1>
                    <p className="mt-2 text-slate-600">Discover talented individuals to join your projects.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Search by name, role, or skill..."
                            className="pl-10 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCollaborators.map((collaborator) => (
                        <Card key={collaborator.id} className="hover:shadow-md transition-shadow">
                            <CardHeader
                                className="flex flex-row items-center gap-4 pb-2 cursor-pointer hover:bg-slate-50 rounded-t-xl transition-colors"
                                onClick={() => navigate(`/profile/${getSlug(collaborator.name)}`)}
                            >
                                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xl font-bold">
                                    {collaborator.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{collaborator.name}</h3>
                                        {collaborator.verified && (
                                            <span title="Verified">
                                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500">{collaborator.role}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-slate-600 line-clamp-2">{collaborator.bio}</p>

                                <div className="flex flex-wrap gap-2">
                                    {collaborator.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="pt-2 flex items-center justify-between text-sm text-slate-600 border-t border-slate-100 mt-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-medium text-slate-900">{collaborator.rating}</span>
                                        <span className="text-slate-400">({collaborator.projectsCompleted})</span>
                                    </div>
                                    <div className="font-semibold text-slate-900">{collaborator.rate}</div>
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
