import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

const UploadFile = () => {
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const res = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });
            console.log("Uploading file to backend /upload route:", file.name);

            const data = await res.json();
            if (res.ok) {
                setFileUrl(data.url);
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while uploading");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center mt-12">
            <div className="flex w-100 items-center justify-center">
                <Label
                    htmlFor="file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            {uploading ? "Uploading..." : (
                                <>
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </>
                            )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <FileInput
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </Label>
            </div>

            {fileUrl && (
                <div className="mt-6 text-center">
                    <p className="mb-2 text-green-600">Uploaded successfully!</p>
                    <img src={fileUrl} alt="Uploaded file" className="max-h-64 mx-auto" />
                </div>
            )}
        </div>
    );
};

export default UploadFile;
