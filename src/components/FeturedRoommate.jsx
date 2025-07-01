import React, { useEffect, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const FeturedRoommate = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

useEffect(() => {
  fetch("https://e-bikolpo-server.vercel.app/queries")
    .then((res) => res.json())
    .then((data) => {
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const recentSix = sorted.slice(0, 6);
      setFeaturedPosts(recentSix);
    });
}, []);


  return (
    <div>
      <section className="w-11/12 mx-auto my-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          🏠 Featured Roommates
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
        {featuredPosts.map((query) => (
          <div
            key={query._id}
            className="bg-base-100 shadow-md rounded-xl p-5 border-2 flex flex-col justify-between"
          >
            <img
              src={query.productImage}
              alt={query.productName}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold">{query.queryTitle} (Recommended Product)</h3>
            <p className="text-warning">
              <strong>Boykot Product:</strong> {query.productName} (
              {query.productBrand})
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Boykot Reason:</strong> {query.reason}
            </p>
            <p className="mt-2">
              <strong>Peoples Recommendations:</strong> {query.recommendationCount}
            </p>
            <Link to={`/QueryDetails/${query._id}`}>
              <button className="btn btn-primary mt-4 w-full">
                💡 Do Recommend/See More
              </button>
            </Link>
          </div>
        ))}
        </div>
        <div className="text-center mt-8">
          <Link to='/quires' className="btn btn-primary mt-4 text-center">
                See More
              </Link>
        </div>
      </section>
    </div>
  );
};

export default FeturedRoommate;
