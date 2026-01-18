import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Send,
    Paperclip,
    MoreVertical,
    Plus,
    CheckCircle2,
    Circle,
    Clock,
    FileText,
    Image as ImageIcon,
    FileCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Mock Data
const mockProject = {
    id: '1',
    title: 'AI-Powered Task Manager',
    members: [
        { id: '1', name: 'Sarah Johnson', avatar: 'SJ' },
        { id: '2', name: 'Alex Chen', avatar: 'AC' },
        { id: '3', name: 'Sarah Jones', avatar: 'SJ' }
    ]
};

const initialTasks = [
    { id: 't1', title: 'Design Database Schema', status: 'done', assignee: 'Alex Chen', priority: 'high' },
    { id: 't2', title: 'Setup Authentication', status: 'in-progress', assignee: 'You', priority: 'high' },
    { id: 't3', title: 'Create Landing Page', status: 'todo', assignee: 'Sarah Jones', priority: 'medium' },
    { id: 't4', title: 'API Documentation', status: 'todo', assignee: 'Alex Chen', priority: 'low' },
];

const initialMessages = [
    { id: 'm1', senderId: '2', content: 'Hey team, I just pushed the initial DB schema.', timestamp: '10:30 AM' },
    { id: 'm2', senderId: '1', content: 'Great! I will start wiring up the auth endpoints.', timestamp: '10:32 AM' },
    { id: 'm3', senderId: '3', content: 'I am working on the wireframes for the landing page.', timestamp: '10:45 AM' },
];

const initialFiles = [
    { id: 'f1', name: 'Database_Schema.pdf', type: 'pdf', size: '2.4 MB', uploader: 'Alex Chen', date: 'Today' },
    { id: 'f2', name: 'Landing_Page_Wireframe.fig', type: 'design', size: '15 MB', uploader: 'Sarah Jones', date: 'Yesterday' },
    { id: 'f3', name: 'API_Specs.md', type: 'code', size: '45 KB', uploader: 'Alex Chen', date: '2 days ago' },
];

const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export function Workspace() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tasks');
    const [tasks, setTasks] = useState(initialTasks);
    const [messages, setMessages] = useState(initialMessages);
    const [fileList, _setFileList] = useState(initialFiles);
    const [newMessage, setNewMessage] = useState('');

    // New Task State
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const msg = {
            id: Date.now().toString(),
            senderId: '1', // Current user
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    const handleCreateTask = () => {
        if (!newTaskTitle) return;
        const task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            status: 'todo',
            assignee: newTaskAssignee || 'Unassigned',
            priority: 'medium'
        };
        setTasks([...tasks, task]);
        setNewTaskTitle('');
        setNewTaskAssignee('');
        setIsTaskDialogOpen(false);
    };

    const moveTask = (taskId: string, newStatus: string) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'done': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
            default: return <Circle className="h-4 w-4 text-slate-400" />;
        }
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
            case 'design': return <ImageIcon className="h-8 w-8 text-purple-500" />;
            case 'code': return <FileCode className="h-8 w-8 text-blue-500" />;
            default: return <FileText className="h-8 w-8 text-slate-500" />;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/projects/1"> {/* Linking back to dummy project 1 for now */}
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{mockProject.title}</h1>
                        <p className="text-sm text-slate-500">Workspace</p>
                    </div>
                </div>
                <div className="flex -space-x-2">
                    {mockProject.members.map(m => (
                        <div
                            key={m.id}
                            className="h-8 w-8 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-700 cursor-pointer hover:scale-110 transition-transform"
                            title={m.name}
                            onClick={() => navigate(`/profile/${getSlug(m.name)}`)}
                        >
                            {m.avatar}
                        </div>
                    ))}
                    <Button variant="outline" size="sm" className="ml-4 rounded-full h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <div className="px-6 pt-4 shrink-0">
                        <TabsList className="grid w-full grid-cols-3 max-w-sm">
                            <TabsTrigger value="tasks">Task Board</TabsTrigger>
                            <TabsTrigger value="chat">Discussion</TabsTrigger>
                            <TabsTrigger value="files">Files</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="flex-1 overflow-auto p-6 focus-visible:outline-none data-[state=inactive]:hidden">
                        <div className="flex flex-col md:flex-row gap-6 h-full overflow-x-auto pb-4">
                            {['todo', 'in-progress', 'done'].map((status) => (
                                <div key={status} className="flex-1 min-w-[300px] flex flex-col bg-slate-100 rounded-xl p-4 h-full max-h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-slate-700 capitalize">{status.replace('-', ' ')}</h3>
                                        <Badge variant="secondary" className="bg-white">
                                            {tasks.filter(t => t.status === status).length}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                                        {tasks.filter(t => t.status === status).map(task => (
                                            <Card key={task.id} className="bg-white shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium text-slate-900">{task.title}</h4>
                                                        {getStatusIcon(task.status)}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs font-normal cursor-pointer hover:bg-slate-50"
                                                            onClick={() => navigate(`/profile/${getSlug(task.assignee)}`)}
                                                        >
                                                            {task.assignee}
                                                        </Badge>
                                                        <span className={`px-2 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-green-100 text-green-700'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    </div>

                                                    {/* Simple Move Actions for MVP */}
                                                    <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50 justify-end">
                                                        {status !== 'todo' && (
                                                            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => moveTask(task.id, status === 'done' ? 'in-progress' : 'todo')}>
                                                                ←
                                                            </Button>
                                                        )}
                                                        {status !== 'done' && (
                                                            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => moveTask(task.id, status === 'todo' ? 'in-progress' : 'done')}>
                                                                →
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {status === 'todo' && (
                                        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" className="w-full mt-2 border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-200">
                                                    <Plus className="h-4 w-4 mr-2" /> Add Task
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Create New Task</DialogTitle>
                                                    <DialogDescription>Add a new task to the project board.</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label>Task Title</Label>
                                                        <Input
                                                            placeholder="e.g. Update Homepage Design"
                                                            value={newTaskTitle}
                                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Assignee</Label>
                                                        <select
                                                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={newTaskAssignee}
                                                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                                                        >
                                                            <option value="">Unassigned</option>
                                                            {mockProject.members.map(m => (
                                                                <option key={m.id} value={m.name}>{m.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleCreateTask} disabled={!newTaskTitle}>Create Task</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Chat Tab */}
                    <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col data-[state=inactive]:hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => {
                                const isMe = msg.senderId === '1';
                                const sender = mockProject.members.find(m => m.id === msg.senderId);
                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold shrink-0">
                                            {sender?.avatar}
                                        </div>
                                        <div className={`max-w-[70%] rounded-2xl p-4 ${isMe ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 rounded-tl-none'
                                            }`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-200' : 'text-slate-400'}`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="flex gap-2 max-w-4xl mx-auto">
                                <Button variant="ghost" size="icon" className="shrink-0 text-slate-500">
                                    <Paperclip className="h-5 w-5" />
                                </Button>
                                <Input
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1"
                                />
                                <Button onClick={handleSendMessage} className="shrink-0">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Files Tab */}
                    <TabsContent value="files" className="flex-1 overflow-auto p-6 data-[state=inactive]:hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Upload Placeholder */}
                            <Card className="border-dashed border-2 border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-slate-100 hover:border-primary-400 transition-colors h-48">
                                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                                    <Plus className="h-6 w-6 text-primary-500" />
                                </div>
                                <p className="text-sm font-medium text-slate-900">Upload File</p>
                                <p className="text-xs text-slate-500 mt-1">Drag & drop or click to browse</p>
                            </Card>

                            {fileList.map(file => (
                                <Card key={file.id} className="group relative hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                                            {getFileIcon(file.type)}
                                        </div>
                                        <h4 className="font-medium text-slate-900 text-sm truncate w-full" title={file.name}>
                                            {file.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1">{file.size} • {file.date}</p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-medium">
                                                {file.uploader.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-xs text-slate-400">uploaded by {file.uploader.split(' ')[0]}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
