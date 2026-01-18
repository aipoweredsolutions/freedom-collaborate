import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Zap, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

type OnboardingStep = 'skills' | 'rates' | 'availability' | 'complete';

interface OnboardingData {
    skills: string[];
    hourlyRate: string;
    availability: string;
    bio: string;
}

export function Onboarding() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('skills');
    const [skillInput, setSkillInput] = useState('');
    const [data, setData] = useState<OnboardingData>({
        skills: [],
        hourlyRate: '',
        availability: 'full-time',
        bio: '',
    });

    const addSkill = () => {
        if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
            setData({ ...data, skills: [...data.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setData({ ...data, skills: data.skills.filter(s => s !== skill) });
    };

    const handleNext = () => {
        if (currentStep === 'skills') setCurrentStep('rates');
        else if (currentStep === 'rates') setCurrentStep('availability');
        else if (currentStep === 'availability') setCurrentStep('complete');
    };

    const handleBack = () => {
        if (currentStep === 'rates') setCurrentStep('skills');
        else if (currentStep === 'availability') setCurrentStep('rates');
        else if (currentStep === 'complete') setCurrentStep('availability');
    };

    const handleComplete = () => {
        // In a real app, we would save this data to the backend
        console.log('Onboarding data:', data);
        navigate('/projects');
    };

    const canProceed = () => {
        if (currentStep === 'skills') return data.skills.length > 0;
        if (currentStep === 'rates') return data.hourlyRate !== '';
        if (currentStep === 'availability') return data.availability !== '';
        return true;
    };

    const progressPercentage = {
        skills: 25,
        rates: 50,
        availability: 75,
        complete: 100,
    }[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Zap className="h-8 w-8 text-primary-600" />
                        <span className="font-bold text-2xl text-slate-900">Freedom Collaborate</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Complete Your Profile</h1>
                    <p className="text-slate-600">Help us match you with the perfect projects and teams</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-600 transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Skills</span>
                        <span>Rates</span>
                        <span>Availability</span>
                        <span>Complete</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                    {/* Step 1: Skills */}
                    {currentStep === 'skills' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What are your skills?</h2>
                                <p className="text-slate-600">Add the skills you bring to collaborative projects</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g., React, UI Design, Marketing..."
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                    />
                                    <Button onClick={addSkill} type="button">Add</Button>
                                </div>

                                {data.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                                <button
                                                    onClick={() => removeSkill(skill)}
                                                    className="hover:text-primary-900 ml-1"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                <p className="text-sm text-slate-600">
                                    💡 <strong>Tip:</strong> Add at least 3-5 skills to increase your chances of being matched with relevant projects.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Rates */}
                    {currentStep === 'rates' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What's your hourly rate?</h2>
                                <p className="text-slate-600">Set your preferred compensation rate</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="hourly-rate" className="block text-sm font-medium text-slate-700 mb-2">
                                        Hourly Rate (USD)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <Input
                                            id="hourly-rate"
                                            type="number"
                                            placeholder="50"
                                            value={data.hourlyRate}
                                            onChange={(e) => setData({ ...data, hourlyRate: e.target.value })}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                                        Short Bio (Optional)
                                    </label>
                                    <textarea
                                        id="bio"
                                        rows={4}
                                        placeholder="Tell potential collaborators about yourself..."
                                        value={data.bio}
                                        onChange={(e) => setData({ ...data, bio: e.target.value })}
                                        className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                                <p className="text-sm text-primary-800">
                                    💰 <strong>Fair Pay Guarantee:</strong> Your rate is protected by our automated revenue split system. You'll always receive your agreed percentage.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Availability */}
                    {currentStep === 'availability' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What's your availability?</h2>
                                <p className="text-slate-600">Let teams know when you can contribute</p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { value: 'full-time', label: 'Full-time', desc: '40+ hours per week' },
                                    { value: 'part-time', label: 'Part-time', desc: '20-40 hours per week' },
                                    { value: 'flexible', label: 'Flexible', desc: '10-20 hours per week' },
                                    { value: 'weekends', label: 'Weekends Only', desc: 'Available on weekends' },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${data.availability === option.value
                                            ? 'border-primary-600 bg-primary-50'
                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="availability"
                                            value={option.value}
                                            checked={data.availability === option.value}
                                            onChange={(e) => setData({ ...data, availability: e.target.value })}
                                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900">{option.label}</div>
                                            <div className="text-sm text-slate-600">{option.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Complete */}
                    {currentStep === 'complete' && (
                        <div className="space-y-6 text-center">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-green-100 p-4">
                                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">You're all set!</h2>
                                <p className="text-slate-600">Your profile is complete and ready to collaborate</p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-6 text-left space-y-3">
                                <h3 className="font-semibold text-slate-900 mb-3">Profile Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-slate-600">Skills:</span>{' '}
                                        <span className="font-medium text-slate-900">{data.skills.join(', ')}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">Hourly Rate:</span>{' '}
                                        <span className="font-medium text-slate-900">${data.hourlyRate}/hr</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">Availability:</span>{' '}
                                        <span className="font-medium text-slate-900 capitalize">{data.availability.replace('-', ' ')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 'skills'}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>

                        {currentStep !== 'complete' ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button onClick={handleComplete}>
                                Start Collaborating
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
