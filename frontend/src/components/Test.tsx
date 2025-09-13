import axios from "axios";
import React, { useState } from "react";

const UploadProject: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        ngoId: "",
        name: "",
        location: "",
        area: "",
        type: "",
        date_planted: "",
    });
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Please select at least one file.");
            return;
        }

        const data = new FormData();
        files.forEach((file) => data.append("files", file));
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/project/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResponse(res.data);
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Upload Project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="ngoId"
                    placeholder="NGO ID"
                    value={formData.ngoId}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="number"
                    step="0.01"
                    name="area"
                    placeholder="Area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="date"
                    name="date_planted"
                    placeholder="Date Planted"
                    value={formData.date_planted}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input type="file" multiple onChange={handleFileChange} />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Project"}
                </button>
            </form>

            {response && (
                <div style={{ marginTop: "2rem" }}>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                    {response.gateway && response.gateway.map((url: string, idx: number) => (
                        <img key={idx} src={url} alt={`uploaded-${idx}`} style={{ width: "200px", margin: "10px" }} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadProject;
