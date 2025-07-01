import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://e-bikolpo-server.vercel.app/queries")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setQueries(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

const filteredQueries = queries.filter((query) => {
  const term = searchTerm.trim().toLowerCase();
  return (
    query.productName?.toLowerCase().includes(term) ||
    query.productBrand?.toLowerCase().includes(term) ||
    query.queryTitle?.toLowerCase().includes(term) ||
    query.reason?.toLowerCase().includes(term)
  );
});


  return (
    <div className="w-11/12 mx-auto py-30">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Product Boycott Queries
      </h2>

      <div className="flex items-center gap-3 mb-6 justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by boykot product name"
            className="input input-bordered mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="btn btn-secondary mb-4 hidden md:block"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Show More" : "Show Less"}
        </button>
      </div>

      <div
        className={`grid gap-6 grid-cols-1${
          toggle
            ? " lg:grid-cols-3 md:grid-cols-2"
            : " lg:grid-cols-4 md:grid-cols-3"
        }`}
      >
        {filteredQueries.map((query) => (
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
              <strong>Total Recommendations:</strong> {query.recommendationCount}
            </p>
            <Link to={`/QueryDetails/${query._id}`}>
              <button className="btn btn-primary mt-4 w-full">
                💡 Do Recommend/See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
