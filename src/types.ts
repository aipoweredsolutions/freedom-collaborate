export interface Role {
    id?: string;
    title: string;
    split: number;
    filled: boolean;
    description: string;
    requirements: string[];
}

export interface TimelinePhase {
    phase: string;
    duration: string;
    status: string;
    payout?: number;
}

export interface ProjectCreator {
    name: string;
    avatar: string;
    reputation: number;
    projectsCompleted: number;
}

export interface Project {
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
    createdBy: ProjectCreator;
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

export interface Payout {
    id: string;
    project: string;
    user: string;
    amount: number;
    type: string;
    date: string;
}

export interface Milestone {
    id: string;
    project: string;
    phase: string;
    status: string;
    requestedDate: string;
    payout: number;
}

export interface PendingUser {
    id: string;
    name: string;
    role: string;
    bio: string;
    joinedDate: string;
    skills: string[];
}
