import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const UpdateQueires = () => {
  const [query, setQuery] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://e-bikolpo-server.vercel.app/UpdateQueries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuery({
          productName: data.productName,
          productBrand: data.productBrand,
          productImage: data.productImage,
          queryTitle: data.queryTitle,
          reason: data.reason,
        });
      });
  }, [id]);

  if (!query) {
    return <Loading />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuery = {
      ...query,
      updatedAt: new Date().toISOString(),
    };

    fetch(`https://e-bikolpo-server.vercel.app/UpdateQueries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Query updated successfully!");
          navigate("/myQueries");
          setQuery({
            productName: "",
            productBrand: "",
            productImage: "",
            queryTitle: "",
            reason: "",
          });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Update Your Boycott Query
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="productName"
          value={query.productName}
          placeholder="Product Name"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="productBrand"
          value={query.productBrand}
          placeholder="Product Brand"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="productImage"
          value={query.productImage}
          placeholder="Product Image URL"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="queryTitle"
          value={query.queryTitle}
          placeholder="Query Title"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="reason"
          value={query.reason}
          placeholder="Boycotting Reason Details"
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Update Query
        </button>
      </form>
    </div>
  );
};

export default UpdateQueires;
