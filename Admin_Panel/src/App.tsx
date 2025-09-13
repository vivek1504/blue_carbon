import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

type Project = {
    id: number;
    name: string;
    area: string;
    date_planted: string;
    location: string;
    type: string;
    fileCids: string[];
    status: "pending" | "approved" | "rejected" | "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    ngo_name: { name: string };
};

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [reset, setReset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    // Fetch pending projects on mount
    useEffect(() => {
        fetchProjects();
    }, [reset]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/nccr/pending");
            const data: Project[] = res.data;
            const pending = data.filter(p => p.status === "PENDING");
            setProjects(pending);
            console.log(data);

            // Update counts locally
            const pendingCount = data.filter(p => p.status === "pending").length;
            const approvedCount = data.filter(p => p.status === "approved").length;
            const rejectedCount = data.filter(p => p.status === "rejected").length;

            setCounts({ pending: pendingCount, approved: approvedCount, rejected: rejectedCount });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: number, action: "approved" | "rejected") => {
        try {
            if (action === "approved") {
                const res = await axios.post(`http://localhost:3000/nccr/projects/${id}/approve`);
                console.log(res.data);
                setReset(prev => prev + 1);
            } else {
                const res = await axios.post(`http://localhost:3000/nccr/projects/${id}/reject`, { reason: "Auto rejection" });
                console.log(res.data);
                setReset(prev => prev + 1);
            }

            // Update projects list and counts locally
            setProjects(prev =>
                prev.map(p => (p.id === id ? { ...p, status: action } : p))
            );

            setCounts(prev => ({
                ...prev,
                [action]: prev[action] + 1,
                pending: prev.pending - 1,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Project Approval Dashboard
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                                Review and manage environmental projects, track carbon credits, and oversee sustainable initiatives from participating organizations.
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    Real-time Updates
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                    Automated Workflows
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                                    Analytics Powered
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Pending Projects Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">Pending Review</h3>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{counts.pending}</div>
                                    <p className="text-sm text-gray-500">Awaiting approval</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full font-medium">
                                        +12% this week
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-yellow-50 rounded-lg p-3">
                                <div className="flex justify-between items-center text-xs text-yellow-700">
                                    <span>Progress</span>
                                    <span>75%</span>
                                </div>
                                <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-1">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Approved Projects Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">Approved</h3>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{counts.approved}</div>
                                    <p className="text-sm text-gray-500">Successfully verified</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                                        +8% this week
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-green-50 rounded-lg p-3">
                                <div className="flex justify-between items-center text-xs text-green-700">
                                    <span>Success Rate</span>
                                    <span>94%</span>
                                </div>
                                <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Rejected Projects Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{counts.rejected}</div>
                                    <p className="text-sm text-gray-500">Needs revision</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">
                                        -3% this week
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-red-50 rounded-lg p-3">
                                <div className="flex justify-between items-center text-xs text-red-700">
                                    <span>Review Rate</span>
                                    <span>100%</span>
                                </div>
                                <div className="w-full bg-red-200 rounded-full h-1.5 mt-1">
                                    <div className="bg-gradient-to-r from-red-400 to-rose-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
                                <p className="text-gray-600 mt-1">Review and approve environmental sustainability projects</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    Sort
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="animate-fade-in space-y-6">
                        {loading ? (
                            // Loading State
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                        <div className="flex flex-col lg:flex-row">
                                            <div className="lg:w-80 h-64 lg:h-72 bg-gray-200"></div>
                                            <div className="flex-1 p-8">
                                                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
                                                <div className="grid grid-cols-3 gap-4 mb-6">
                                                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                                                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                                                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                                                </div>
                                                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                                                    <div className="flex space-x-4">
                                                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                                    </div>
                                                    <div className="flex space-x-3">
                                                        <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                                                        <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : projects.length === 0 ? (
                            // Empty State
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    There are no projects pending approval at the moment. New projects will appear here when submitted by NGOs.
                                </p>
                                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh
                                </button>
                            </div>
                        ) : (
                            projects.map(project => (

                                <div
                                    key={project.id}
                                    className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden card-hover relative fade-in group"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Image Section */}
                                        <div className="relative lg:w-80 flex-shrink-0">
                                            <img
                                                src={`https://gateway.pinata.cloud/ipfs/${project.fileCids[0]}`}
                                                className="w-full lg:w-80 h-64 lg:h-72 object-cover"
                                                alt={project.name}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            {/* Project Type Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                                    {project.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Details Section */}
                                        <div className="flex-1 p-8">
                                            {/* Header with title and status */}
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                                                        {project.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M7 3h10" />
                                                            </svg>
                                                            <span className="text-sm font-medium">{project.ngo_name.name}</span>
                                                        </div>
                                                        <span className="text-gray-400">•</span>
                                                        <div className="flex items-center text-gray-500">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="text-sm">{new Date(project.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 ml-4">
                                                    <span
                                                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${project.status === "approved"
                                                            ? "bg-green-100 text-green-800 border border-green-200"
                                                            : project.status === "rejected"
                                                                ? "bg-red-100 text-red-800 border border-red-200"
                                                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                            }`}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full mr-2 ${project.status === "approved" ? "bg-green-500" :
                                                            project.status === "rejected" ? "bg-red-500" : "bg-yellow-500"
                                                            }`}></div>
                                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Project Details Cards */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                {/* Location & Area Card */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-900">Location</h4>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-1">{project.location}</p>
                                                    <p className="text-xs text-gray-500">{project.area} hectares</p>
                                                </div>

                                                {/* Timeline Card */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-900">Timeline</h4>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-1">Planted: {new Date(project.date_planted).toLocaleDateString()}</p>
                                                    <p className="text-xs text-gray-500">Submitted: {new Date(project.createdAt).toLocaleDateString()}</p>
                                                </div>

                                                {/* Project Type Card */}
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                            </svg>
                                                        </div>
                                                        <h4 className="font-semibold text-gray-900">Category</h4>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-1">{project.type}</p>
                                                    <p className="text-xs text-gray-500">Environmental Project</p>
                                                </div>
                                            </div>

                                            {/* Actions Section */}
                                            <div className="border-t border-gray-100 pt-6 mt-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <button className="inline-flex items-center text-gray-600 hover:text-blue-600 text-sm transition-colors">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View Details
                                                        </button>
                                                        <button className="inline-flex items-center text-gray-600 hover:text-blue-600 text-sm transition-colors">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                            </svg>
                                                            Share
                                                        </button>
                                                        <button className="inline-flex items-center text-gray-600 hover:text-blue-600 text-sm transition-colors">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            Export
                                                        </button>
                                                    </div>

                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => handleAction(project.id, "rejected")}
                                                            className="inline-flex items-center px-5 py-2.5 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            Reject
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(project.id, "approved")}
                                                            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:from-green-600 hover:to-emerald-700"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Approve Project
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <style>{`
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

            </main>
            <Footer />
        </div>
    );
}

export default App;
