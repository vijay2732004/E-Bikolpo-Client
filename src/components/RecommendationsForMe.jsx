import React, { use, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";

const RecommendationsForMe = () => {
  const { user } = use(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommendations for the logged-in user's queries
    fetch(`/api/recommendations/for-user-queries?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, [user.email]);

  return (
    <div className="w-11/12 mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        💡 Recommendations For You
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-lg">
          No one has recommended any alternatives to your queries yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 rounded-lg shadow-md">
            <thead>
              <tr>
                <th>#</th>
                <th>Query Title</th>
                <th>Recommended Product</th>
                <th>Reason</th>
                <th>By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={rec._id}>
                  <td>{index + 1}</td>
                  <td>{rec.queryTitle}</td>
                  <td>{rec.recommendedProductName}</td>
                  <td>{rec.recommendationReason}</td>
                  <td className="flex items-center gap-2">
                    {rec.recommenderProfileImg ? (
                      <img
                        src={rec.recommenderProfileImg}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                    <span>{rec.recommenderName}</span>
                  </td>
                  <td>{new Date(rec.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
