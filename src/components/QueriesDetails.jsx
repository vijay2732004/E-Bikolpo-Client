import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const QueryDetails = () => {
  const { id } = useParams();
  id;
  const { user } = use(AuthContext);
  const [query, setQuery] = useState(null);
  query;
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch(`https://e-bikolpo-server.vercel.app/queries/${id}`)
      .then((res) => res.json())
      .then((data) => setQuery(data));

    fetch(`https://e-bikolpo-server.vercel.app/recommendationsId?queryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      title: e.target.title.value,
      recProductName: e.target.recProductName.value,
      productImage: e.target.productImage.value,
      reason: e.target.reason.value,
      queryId: id,
      queryTitle: query.queryTitle,
      productName: query.productName,
      postOwnerEmail: query.userEmail,
      userName: query.userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(
      `https://e-bikolpo-server.vercel.app/recommendations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecommendation),
      }
    );

    if (res.ok) {
      await fetch(
        `https://e-bikolpo-server.vercel.app/queries/${id}/increment`,
        {
          method: "PATCH",
        }
      );

      setRecommendations((prev) => [...prev, newRecommendation]);
      e.target.title.value = "";
      e.target.recProductName.value = "";
      e.target.productImage.value = "";
      e.target.reason.value = "";
      Swal.fire("Recommendation added successfully!");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-30">
      {query && (
  <div className="mb-10 p-6 rounded-xl shadow-md border border-gray-200 bg-base-300">
    <h1 className="text-3xl font-bold mb-2 text-center underline">Details of Post</h1>
    <h2 className="text-3xl font-bold mb-2">{query.queryTitle}</h2>

    <p className="text-l mb-1">
      <span className="font-medium">Product:</span> {query.productName} ({query.productBrand})
    </p>

    <p className="text-sm text-red-600 mb-4">
      <span className="font-semibold">Reason for Boycott:</span> {query.reason}
    </p>

    <div className="flex items-center mb-4">
      <img
        src={query.productImage}
        alt={query.productName}
        className="w-20 h-20 object-cover rounded-lg border mr-4"
      />
      <div>
        <p className="font-medium text-gray-800">{query.userName}</p>
        <p className="text-sm text-gray-500">{query.userEmail}</p>
        <p className="text-sm text-gray-400">
          {new Date(query.createdAt).toLocaleString()}
        </p>
      </div>
    </div>

    <div className="text-sm text-gray-600">
      <span className="font-semibold">Recommendations:</span> {query.recommendationCount}
    </div>
  </div>
)}

<button
          className="btn btn-primary mb-10"
          onClick={() =>{ setToggle(!toggle);} }
        >
          ➕ Add Your Recommendation
        </button>
      <form
        onSubmit={handleSubmit}
        className={`bg-base-200 p-6 rounded-lg mb-10 *:shadow-md ${toggle ? "block" : "hidden"}`}
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        <h3 className="text-xl font-semibold mb-4 underline text-center">Add Your Recommendation</h3>
        <input
          type="text"
          required
          placeholder="Recommendation Title"
          className="input input-bordered w-full mb-4"
          name="title"
        />
        <input
          type="text"
          required
          placeholder="Recommended Product Name"
          className="input input-bordered w-full mb-4"
          name="recProductName"
        />
        <input
          type="url"
          required
          placeholder="Recommended Product Image URL"
          className="input input-bordered w-full mb-4"
          name="productImage"
        />
        <textarea
          required
          placeholder="Reason for Recommendation"
          className="textarea textarea-bordered w-full mb-4"
          name="reason"
        />
        <button className="btn btn-success w-full">Add Recommendation</button>
      </form>

      <div>
        <h3 className="text-2xl font-bold mb-4 underline text-center">All Recommendations</h3>
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-base-100 p-4 rounded-xl shadow mb-4">
            <div className="flex items-center mb-2">
              <img
                src={rec.productImage}
                alt="product"
                className="w-16 h-16 rounded mr-3"
              />
              <div>
                <p className="font-semibold">{rec.title}</p>
                <p className="text-sm text-gray-500">
                  Recommended by {rec.recommenderName}
                </p>
              </div>
            </div>
            <p>Reason for use: {rec.reason}</p>
            <p className="text-sm text-right text-gray-400 mt-2">
              {new Date(rec.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryDetails;
