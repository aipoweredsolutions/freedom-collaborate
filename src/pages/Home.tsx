
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <div className="relative pt-16 pb-32 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-slate-50 to-slate-50 opacity-70"></div>

                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mb-6">
                    Build Your Dream Team. <br />
                    <span className="text-primary-600">Fairly & Transparently.</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    The first platform designed for automated revenue splitting, seamless collaboration, and guaranteed fair pay for every contributor.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-200">
                        Start Collaborating <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link to="/projects" className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow transition-all duration-200">
                        Browse Projects
                    </Link>
                </div>

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-5xl">
                    {[
                        { title: "Automated Splits", desc: "Revenue is automatically divided based on agreed terms. No manual payouts." },
                        { title: "Smart Matching", desc: "Find the perfect teammates based on skills, availability, and reputation." },
                        { title: "Verified Profiles", desc: "Work with vetted professionals. Build your reputation on the blockchain of trust." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <CheckCircle2 className="h-8 w-8 text-primary-500 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-slate-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
