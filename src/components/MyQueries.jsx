import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const MyQueries = () => {
  const { user } = use(AuthContext);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://e-bikolpo-server.vercel.app/myQueries?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        if (data.length > 0) {
          setQueries(data);
        } else {
          setQueries([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
      });
  }, [user?.email]);

  // Function to handle deletion of a query
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this listing permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://e-bikolpo-server.vercel.app/quiresDelete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your listing has been deleted.",
                "success"
              );
              setQueries((prev) => prev.filter((post) => post._id !== id));
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-11/12 mx-auto my-10">
      {/* Banner */}
      <div className="bg-base-300 p-6 rounded-xl text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">📌 My Product Queries</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/addQueries")}
        >
          ➕ Add New Query
        </button>
      </div>

      {/* Query Grid */}
      {queries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((q) => (
            <div key={q.id} className="bg-base-200 p-4 rounded-xl shadow">
              <img
                src={q.productImage}
                alt={q.productName}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-bold">{q.productName}</h3>
              <p className="text-sm mb-2">{q.queryTitle}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="btn btn-outline btn-info btn-sm"
                  onClick={() => navigate(`/QueryDetails/${q._id}`)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-outline btn-warning btn-sm"
                  onClick={() => navigate(`/UpdateQuery/${q._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline btn-error btn-sm"
                  onClick={() => handleDelete(q._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl">🚫 No queries found.</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/addQueries")}
          >
            Add Your First Query
          </button>
        </div>
      )}
    </section>
  );
};

export default MyQueries;
