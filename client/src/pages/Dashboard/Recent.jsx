import React, { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";
import axios from "axios";

const Recent = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getPrediction = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/models/getPrediction/${userId}`
        );
        // sort most recent first
        const sorted = (res.data.predictions || []).sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        );
        setPredictions(sorted);
      } catch (err) {
        console.error("Error fetching Predictions", err);
        setError("Failed to load predictions");
      } finally {
        setLoading(false);
      }
    };
    getPrediction();
  }, [userId]);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  };

  if (loading) return <p className="p-6">Loading recent analysis...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (predictions.length === 0)
    return <p className="p-6 text-gray-500">No recent predictions available.</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Analysis</h3>
      </div>

      {/* Scrollable vertical list */}
      <div className="p-6 max-h-96 overflow-y-auto space-y-4">
        {predictions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.model}</p>
                <p className="text-sm text-gray-500">{formatTimeAgo(item.timeStamp)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-900">{item.prediction}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.confidence <= 80
                    ? "bg-green-100 text-green-800"
                    : item.confidence <= 90
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.confidence.toFixed(2)}%
              </span>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
