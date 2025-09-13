import axios from "axios";
import { useEffect, useState } from "react";
type Project = {
    id: number;
    name: string;
    area: string;
    date_planted: string;
    location: string;
    type: string;
    fileCids: string[];
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    ngo_name: { name: string };
};
const [projects, setProjects] = useState<Project[]>([]);
const [reset, setReset] = useState(0);
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
        const res = await axios.get("http://localhost:3000/nccr/pending");
        const data: Project[] = res.data;
        setProjects(data);
        console.log(data);

        // Update counts locally
        const pendingCount = data.filter(p => p.status === "pending").length;
        const approvedCount = data.filter(p => p.status === "approved").length;
        const rejectedCount = data.filter(p => p.status === "rejected").length;

        setCounts({ pending: pendingCount, approved: approvedCount, rejected: rejectedCount });
    } catch (err) {
        console.error(err);
    }
};


const handleAction = async (id: number, action: "approved" | "rejected") => {
    try {
        if (action === "approved") {
            const res = await axios.post(`http://localhost:3000/nccr/projects/${id}/approve`);
            setReset(prev => prev + 1);
        } else {
            const res = await axios.post(`http://localhost:3000/nccr/projects/${id}/reject`, { reason: "Auto rejection" });
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

const Dashboard = () => {
    return (
        <main className="flex-1 bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Project Approval Dashboard
                    </h1>
                </div>

                {/* Status Counts */}
                <div className="mx-auto mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-sm text-center">
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-2">
                                <div className="font-bold text-lg">{counts.pending}</div>
                                <div>Pending</div>
                            </div>
                            <div className="bg-green-100 text-green-800 px-3 py-2">
                                <div className="font-bold text-lg">{counts.approved}</div>
                                <div>Approved</div>
                            </div>
                            <div className="bg-red-100 text-red-800 px-3 py-2">
                                <div className="font-bold text-lg">{counts.rejected}</div>
                                <div>Rejected</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="animate-fade-in space-y-4">
                    {projects.map(project => (

                        <div
                            key={project.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover relative fade-in"
                        >
                            <div className="flex items-center">
                                {/* Image Section */}
                                <div className="ml-2 cursor-pointer hover:opacity-90 transition-opacity relative">
                                    <img
                                        src={`https://gateway.pinata.cloud/ipfs/${project.fileCids[0]}`}
                                        className="w-80 h-60 object-cover rounded-lg"
                                        alt={project.name}
                                    />
                                </div>

                                {/* Details Section */}
                                <div className="flex-1 p-6 min-w-0">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                    {project.name}
                                                </h3>
                                                <p className="text-base text-gray-600">
                                                    Uploaded by: <span className="font-medium">{project.ngo_name.name}</span>
                                                </p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span
                                                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${project.status === "approved"
                                                        ? "bg-green-100 text-green-800"
                                                        : project.status === "rejected"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 text-sm text-gray-600 mb-4">
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="font-medium">Date:</span> {project.createdAt.split("T")[0]}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Time:</span> {project.createdAt.split("T")[1].split(".")[0]}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="font-medium">Area:</span> {project.area} ha
                                                </p>
                                                <p>
                                                    <span className="font-medium">Date Planted:</span> {project.date_planted.split("T")[0]}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="font-medium">Location:</span> {project.location}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Type:</span> {project.type}
                                                </p>
                                            </div>
                                        </div>

                                        {(<div className="flex items-center justify-between mt-6">
                                            <div>
                                                <span className=" bg-green-100 text-green-800 text-sm px-3 py-1.5 rounded-full font-medium ">Type : {project.type}</span>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleAction(project.id, "approved")}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                                >
                                                    ✓ Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(project.id, "rejected")}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                                >
                                                    ✗ Reject
                                                </button>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
    )
}

export default Dashboard;