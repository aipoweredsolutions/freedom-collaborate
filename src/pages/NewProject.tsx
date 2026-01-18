import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Role {
    id: string;
    title: string;
    split: number;
    description: string;
}

export function NewProject() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Form state
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState('');
    const [projectType, setProjectType] = useState<'Startup' | 'Hackathon' | 'Enterprise'>('Startup');
    const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

    const [roles, setRoles] = useState<Role[]>([
        { id: '1', title: '', split: 0, description: '' }
    ]);

    const totalSplit = roles.reduce((sum, role) => sum + (Number(role.split) || 0), 0);

    const addRole = () => {
        setRoles([...roles, {
            id: Date.now().toString(),
            title: '',
            split: 0,
            description: ''
        }]);
    };

    const removeRole = (id: string) => {
        if (roles.length > 1) {
            setRoles(roles.filter(role => role.id !== id));
        }
    };

    const updateRole = (id: string, field: keyof Role, value: string | number) => {
        setRoles(roles.map(role =>
            role.id === id ? { ...role, [field]: value } : role
        ));
    };

    const handleSubmit = () => {
        // Here you would typically send the data to your backend
        console.log({
            projectTitle,
            projectDescription,
            budget,
            deadline,
            category,
            projectType,
            roles
        });

        // Mock success feedback
        alert("Project successfully created! Redirecting to dashboard...");

        // Navigate back to projects dashboard
        navigate('/projects');
    };

    const canProceedStep1 = projectTitle && projectDescription && budget && deadline && category;
    const canProceedStep2 = roles.length > 0 &&
        roles.every(r => r.title && r.split > 0) &&
        totalSplit === 100;

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => step === 1 ? navigate('/projects') : setStep(step - 1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-slate-900">Create New Project</h1>
                    <p className="mt-2 text-slate-600">
                        Set up your project and define revenue splits for your team
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                1
                            </div>
                            <span className={`text-sm font-medium ${step >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                                Project Details
                            </span>
                        </div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200'}`} />
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                2
                            </div>
                            <span className={`text-sm font-medium ${step >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                                Roles & Revenue Split
                            </span>
                        </div>
                        <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary-500' : 'bg-slate-200'}`} />
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                3
                            </div>
                            <span className={`text-sm font-medium ${step >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>
                                Review
                            </span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Project Details */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Information</CardTitle>
                            <CardDescription>Tell us about your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., AI-Powered Task Manager"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your project, its goals, and what you're looking to build..."
                                    rows={5}
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Total Budget ($) *</Label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        placeholder="15000"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deadline">Deadline *</Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g., SaaS, E-Commerce, Mobile, Web3"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Project Type *</Label>
                                    <div className="flex gap-2">
                                        {['Startup', 'Hackathon', 'Enterprise'].map((t) => (
                                            <Button
                                                key={t}
                                                type="button"
                                                variant={projectType === t ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setProjectType(t as any)}
                                                className="flex-1"
                                            >
                                                {t}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={() => setStep(2)}
                                    disabled={!canProceedStep1}
                                    size="lg"
                                >
                                    Next: Define Roles
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Roles & Revenue Split */}
                {step === 2 && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Roles & Revenue Split</CardTitle>
                                <CardDescription>
                                    Define the roles needed and how revenue will be split. Total must equal 100%.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {roles.map((role, index) => (
                                    <div key={role.id} className="p-4 border border-slate-200 rounded-lg space-y-4 bg-white">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-slate-900">Role {index + 1}</h4>
                                            {roles.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeRole(role.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Role Title *</Label>
                                                <Input
                                                    placeholder="e.g., Frontend Developer"
                                                    value={role.title}
                                                    onChange={(e) => updateRole(role.id, 'title', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Revenue Split (%) *</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="25"
                                                    value={role.split || ''}
                                                    onChange={(e) => updateRole(role.id, 'split', Number(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Role Description</Label>
                                            <Textarea
                                                placeholder="Describe the responsibilities and requirements..."
                                                rows={2}
                                                value={role.description}
                                                onChange={(e) => updateRole(role.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={addRole}
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Another Role
                                </Button>

                                {/* Revenue Split Summary */}
                                <div className={`p-4 rounded-lg border-2 ${totalSplit === 100 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                                    }`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-semibold text-slate-900">Total Revenue Split</span>
                                        <Badge variant={totalSplit === 100 ? 'success' : 'warning'}>
                                            {totalSplit}%
                                        </Badge>
                                    </div>

                                    {totalSplit !== 100 && (
                                        <div className="flex items-start gap-2 text-sm text-yellow-800">
                                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <p>Total must equal 100%. Currently {totalSplit > 100 ? 'over' : 'under'} by {Math.abs(100 - totalSplit)}%</p>
                                        </div>
                                    )}

                                    {/* Visual Split Bar */}
                                    <div className="mt-3 h-3 rounded-full overflow-hidden bg-slate-200 flex">
                                        {roles.map((role, idx) => (
                                            role.split > 0 && (
                                                <div
                                                    key={role.id}
                                                    style={{ width: `${role.split}%` }}
                                                    className={`h-full ${idx === 0 ? 'bg-primary-500' :
                                                        idx === 1 ? 'bg-blue-500' :
                                                            idx === 2 ? 'bg-green-500' :
                                                                idx === 3 ? 'bg-yellow-500' :
                                                                    'bg-purple-500'
                                                        }`}
                                                    title={`${role.title || 'Untitled'}: ${role.split}%`}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" onClick={() => setStep(1)}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={() => setStep(3)}
                                        disabled={!canProceedStep2}
                                        size="lg"
                                    >
                                        Review Project
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Review Your Project</CardTitle>
                                <CardDescription>
                                    Please review all details before publishing
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Project Details */}
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-3">Project Details</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Title:</span>
                                            <span className="font-medium text-slate-900">{projectTitle}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Budget:</span>
                                            <span className="font-medium text-slate-900">${Number(budget).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Deadline:</span>
                                            <span className="font-medium text-slate-900">
                                                {new Date(deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Category:</span>
                                            <span className="font-medium text-slate-900">{category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Type:</span>
                                            <Badge variant="outline">{projectType}</Badge>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-sm text-slate-600 mb-1">Description:</p>
                                        <p className="text-sm text-slate-900">{projectDescription}</p>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-6">
                                    <h3 className="font-semibold text-slate-900 mb-3">Team Roles ({roles.length})</h3>
                                    <div className="space-y-3">
                                        {roles.map((role, _index) => (
                                            <div key={role.id} className="p-3 bg-slate-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-slate-900">{role.title}</span>
                                                    <Badge variant="primary">{role.split}% split</Badge>
                                                </div>
                                                {role.description && (
                                                    <p className="text-sm text-slate-600">{role.description}</p>
                                                )}
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Revenue: ${((Number(budget) * role.split) / 100).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="publish-agreement"
                                        checked={hasAgreedToTerms}
                                        onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                    />
                                    <label htmlFor="publish-agreement" className="text-sm text-slate-700 cursor-pointer">
                                        I confirm that the project roles and revenue splits are accurate, and I agree to manage this project in good faith.
                                    </label>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" onClick={() => setStep(2)}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!hasAgreedToTerms}
                                        size="lg"
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Publish Project
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
