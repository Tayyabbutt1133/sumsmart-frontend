"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";
import { Clipboard, Check } from "lucide-react";

const Page = () => {
  const [code, setCode] = useState(`You can Paste something like this here : \n function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

    
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://sumsmart-saas-backend-production.up.railway.app/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(review);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <main className="h-screen bg-[#ECF1FA] w-full p-9 flex gap-4">
      {/* Left Section (Code Editor) */}
      <div className="h-full flex-1 relative bg-black rounded-lg p-4">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={10}
          className="bg-[#0c0c0c] text-white rounded-lg"
        />
        <button
          onClick={reviewCode}
          disabled={loading}
          className={`absolute bottom-4 right-4 px-8 py-2 font-medium cursor-pointer rounded-lg select-none shadow-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#dbdbff] text-black hover:bg-[#c0c0ff]"
          }`}
        >
          {loading ? "Loading..." : "Review your Code Quality"}
        </button>
      </div>

      {/* Right Section (Review Output) */}
      <div className="h-full flex-1 bg-[#0e162a] text-white p-4 rounded-md shadow-lg overflow-auto relative">
        {/* Copy Button */}
        {review && (
          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 p-2 bg-[#dbdbff] text-black rounded-lg hover:bg-[#c0c0ff] transition flex items-center gap-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}

        {/* AI Response / Loading Animation */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl flex justify-center items-center h-full"
          >
            🤔 Thinking...
          </motion.div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
};

export default Page;
