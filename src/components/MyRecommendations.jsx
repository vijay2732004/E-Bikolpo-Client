import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";

const MyRecommendations = () => {
  const { user } = use(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`/api/recommendations?email=${user.email}`)
      .then(res => res.json())
      .then(data => setRecommendations(data));
  }, [user.email]);

  const handleDelete = async (id, queryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This recommendation will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/recommendations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetch(`/api/queries/${queryId}/decrease-recommendation-count`, {
          method: "PATCH",
        });

        setRecommendations(prev => prev.filter(r => r._id !== id));
        Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete the recommendation.", "error");
      }
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">📝 My Recommendations</h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-lg">You haven't made any recommendations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 rounded-lg shadow-md">
            <thead>
              <tr>
                <th>#</th>
                <th>Query Title</th>
                <th>Recommended Product</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={rec._id}>
                  <td>{index + 1}</td>
                  <td>{rec.queryTitle}</td>
                  <td>{rec.recommendedProductName}</td>
                  <td>{rec.recommendationReason}</td>
                  <td>{new Date(rec.timestamp).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(rec._id, rec.queryId)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
