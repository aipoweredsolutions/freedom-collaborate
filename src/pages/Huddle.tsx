import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Send,
    MessageCircle,
    ShieldCheck,
    Calendar,
    DollarSign,
    Clock,
    TrendingUp,
    FileText,
    Users,
    ChevronRight,
    Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const mockMessages = [
    { id: 1, sender: 'Sarah Johnson', text: "Hey! I'm really excited about your Etsy partnership project. The artisan designs are stunning.", time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Me', text: "Thank you! I think your experience in US shop management is exactly what I need to scale this beyond just a local shop.", time: '10:32 AM', isMe: true },
    { id: 3, sender: 'Sarah Johnson', text: "I was looking at the 30% split. Given the local US shipping and tax overhead, do you think we could discuss a performance bonus if we hit $50k in sales?", time: '10:35 AM', isMe: false },
    { id: 4, sender: 'Me', text: "That sounds reasonable. I'm open to a 2% bonus on net sales above $50k. Let's update the agreement terms.", time: '10:38 AM', isMe: true },
];

export function Huddle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: messages.length + 1,
            sender: 'Me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-primary-500/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-900/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col relative z-10">
                {/* Header */}
                <header className="h-20 border-b border-white/10 backdrop-blur-md bg-slate-900/50 flex items-center px-6 justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/projects/${id}`)}
                            className="text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-primary-500/20">
                            PS
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Global Artisan Collective</h1>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Sarah Johnson is typing...
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Negotiation Status</span>
                            <span className="text-sm font-semibold text-primary-400">Final Review</span>
                        </div>
                        <Button className="bg-primary-600 hover:bg-primary-500 text-white border-none shadow-lg shadow-primary-600/20">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Seal & Accept Agreement
                        </Button>
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden">
                    {/* Chat Section */}
                    <div className="flex-1 flex flex-col relative border-r border-white/10">
                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
                        >
                            <div className="flex justify-center my-8">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">
                                    Negotiation started on June 18, 2024
                                </div>
                            </div>

                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.isMe ? 'bg-slate-700' : 'bg-primary-600'
                                        }`}>
                                        {msg.sender[0]}
                                    </div>
                                    <div className={`max-w-[70%] space-y-1 ${msg.isMe ? 'items-end' : ''}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xl ${msg.isMe
                                                ? 'bg-primary-600 text-white rounded-br-none'
                                                : 'bg-white/10 backdrop-blur-md border border-white/10 text-slate-100 rounded-bl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium px-1 uppercase tracking-wider">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-white/10">
                            <form
                                onSubmit={handleSendMessage}
                                className="relative flex items-center"
                            >
                                <Input
                                    placeholder="Propose a term or send a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-14 pl-6 pr-16 rounded-2xl focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-inner"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 bg-primary-600 hover:bg-primary-500 text-white h-10 w-10 p-0 rounded-xl"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                            <div className="mt-3 flex gap-2">
                                <button className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg text-slate-400 transition-colors uppercase font-bold tracking-wider">Propose Bonus</button>
                                <button className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg text-slate-400 transition-colors uppercase font-bold tracking-wider">Update Split</button>
                                <button className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg text-slate-400 transition-colors uppercase font-bold tracking-wider">Edit Milestones</button>
                            </div>
                        </div>
                    </div>

                    {/* Agreement Side Panel */}
                    <aside className="w-[400px] hidden lg:flex flex-col bg-slate-800/20 backdrop-blur-2xl">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="flex items-center gap-2 font-bold uppercase text-[11px] tracking-[0.2em] text-primary-400 mb-1">
                                <ShieldCheck className="h-4 w-4" />
                                Smart Agreement Summary
                            </h2>
                            <p className="text-xs text-slate-500">Live preview of current negotiated terms</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Revenue Terms */}
                            <section className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-slate-300">Revenue Split</h3>
                                    <Badge variant="outline" className="text-primary-400 border-primary-900/50 bg-primary-900/10">Sales-Based</Badge>
                                </div>
                                <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Me (Creator)</span>
                                            <span className="font-bold text-white">70%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary-500" style={{ width: '70%' }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-white/5">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Sarah Johnson (Shop Manager)</span>
                                            <span className="font-bold text-white">30%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: '30%' }} />
                                        </div>
                                    </div>
                                    <div className="pt-2 flex items-center gap-2 text-[10px] text-green-400/80 bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                                        <TrendingUp className="h-3 w-3" />
                                        Recent Update: Added 2% bonus after $50k net sales
                                    </div>
                                </div>
                            </section>

                            {/* Duration & Commitment */}
                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-300">Collaboration Duration</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Period
                                        </p>
                                        <p className="text-xs font-bold font-mono">5 Years Fixed</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Renewal
                                        </p>
                                        <p className="text-xs font-bold font-mono">Automatic</p>
                                    </div>
                                </div>
                            </section>

                            {/* Milestones Flow */}
                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-300">Phase 1: Setup & Launch</h3>
                                <div className="space-y-2">
                                    {[
                                        { title: 'Shop Verification', status: 'Ready' },
                                        { title: 'Tax Profile Creation', status: 'In Review' },
                                        { title: 'First Inventory Hub Batch', status: 'Pending' }
                                    ].map((m, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-5 w-5 rounded-md bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                                    {i + 1}
                                                </div>
                                                <span className="text-xs font-medium text-slate-200">{m.title}</span>
                                            </div>
                                            <ChevronRight className="h-3 w-3 text-slate-600" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Legal Protection */}
                            <section className="p-4 rounded-2xl bg-primary-900/20 border border-primary-500/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Lock className="h-16 w-16" />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="h-4 w-4 text-primary-400" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Huddle Protection</span>
                                </div>
                                <p className="text-[10px] text-slate-300 leading-relaxed">
                                    Every message and proposed term is end-to-end encrypted and timestamped. Once both parties accept, terms are cryptographically locked as a shared legal agreement.
                                </p>
                            </section>
                        </div>

                        <div className="p-6 bg-slate-900/80 border-t border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-slate-400" />
                                    <span className="text-xs font-medium text-slate-300 underline cursor-pointer">View Full Contract Draft</span>
                                </div>
                                <span className="text-[10px] text-slate-500">v1.2.4-A</span>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}
