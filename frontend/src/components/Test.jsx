import axios from "axios";
import { useState } from "react";

const Test = () => {
    const [formData, setFormData] = useState({
        ngoId: "",
        name: "",
        location: "",
        area: "",
        species: "",
        date_planted: "",
        file: null,
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, file: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            alert("Please select a file!");
            return;
        }

        const data = new FormData();
        data.append("file", formData.file);
        data.append("ngoId", formData.ngoId);
        data.append("name", formData.name);
        data.append("location", formData.location);
        data.append("area", formData.area);
        data.append("species", formData.species);
        data.append("date_planted", formData.date_planted);

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/project/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResponse(res.data);
        } catch (err) {
            setResponse(err.response?.data || { status: "error", error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Upload Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    name="ngoId"
                    placeholder="NGO ID"
                    value={formData.ngoId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="area"
                    placeholder="Area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="species"
                    placeholder="Species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="date"
                    name="date_planted"
                    value={formData.date_planted}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="w-full"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Test;
