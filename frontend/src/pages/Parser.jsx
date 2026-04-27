import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseJobData, jobSelector } from "../redux/jobReducer";
import { ArrowLeft, Sparkles, ClipboardPaste, Loader2, CheckCircle } from "lucide-react";

const Parser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(jobSelector);
  const [rawText, setRawText] = useState("");
  const [parsedResult, setParsedResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    const result = await dispatch(parseJobData({ data: rawText }));
    if (result.meta.requestStatus === "fulfilled") {
      setParsedResult(result.payload);
      setRawText("");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch {
      alert("Clipboard access denied. Please paste manually.");
    }
  };

  const handleViewJob = () => {
    if (parsedResult?._id) {
      navigate("/edit-job/" + parsedResult._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/applications")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Applications
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="text-yellow-400" size={28} />
            <div>
              <h1 className="text-3xl font-bold">AI Job Parser</h1>
              <p className="text-gray-400">
                Paste a job description and let AI extract the details
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300 mb-6">
            {error}
          </div>
        )}

        {parsedResult ? (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <CheckCircle size={20} />
              <span className="font-medium">Job parsed successfully!</span>
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-sm text-gray-400">Title</span>
                <p className="text-white font-medium">{parsedResult.title}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Company</span>
                <p className="text-white font-medium">
                  {parsedResult.company?.name}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Location</span>
                <p className="text-white font-medium">
                  {parsedResult.location || "Not specified"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Employment Type</span>
                <p className="text-white font-medium">
                  {parsedResult.employment_type || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleViewJob}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition font-medium"
              >
                Edit & Save Job
              </button>
              <button
                onClick={() => setParsedResult(null)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-2.5 rounded-lg transition font-medium"
              >
                Parse Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Paste Job Description
                </label>
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  <ClipboardPaste size={14} />
                  Paste from Clipboard
                </button>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={12}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="Paste the full job description here. AI will extract: title, company, location, employment type, skills, requirements, and more..."
              />
              <p className="text-xs text-gray-500 mt-2">
                {rawText.length} characters
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !rawText.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Parsing with AI...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} />
                    Parse Job
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/applications")}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-2.5 rounded-lg transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Parser;
