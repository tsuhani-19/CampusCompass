import React, { useState } from "react";
import axios from "axios";

export default function ResumeBuilding() {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuggestions("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume PDF.");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5001/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuggestions(response.data.suggestions);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-4">📄 Resume Analyzer</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload your Resume (PDF only):</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {suggestions && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">✅ AI Suggestions:</h2>
            <div className="whitespace-pre-wrap p-4 bg-gray-50 border rounded max-h-[500px] overflow-auto">
              {suggestions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
