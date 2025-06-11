import React, { use, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";

const AddQuery = () => {
  const { user } = use(AuthContext); // Must return { email, displayName, photoURL }
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImage: "",
    queryTitle: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const queryData = {
    //   ...formData,
    //   userEmail: user.email,
    //   userName: user.displayName,
    //   userPhoto: user.photoURL,
    //   recommendationCount: 0,
    //   createdAt: new Date().toISOString(),
    // };

//     try {
//       await addDoc(collection(db, "queries"), queryData);
//       alert("Query added successfully!");
//       navigate("/my-queries");
//     } catch (error) {
//       console.error("Error adding query:", error);
//     }
   };

  return (
    <section className="w-11/12 mx-auto my-10 p-6 bg-base-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📝 Add a New Product Query</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="productBrand"
          placeholder="Product Brand"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="productImage"
          placeholder="Product Image URL"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="queryTitle"
          placeholder="Query Title (e.g., Is there any better alternative?)"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Boycotting Reason Details"
          className="textarea textarea-bordered w-full h-32"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary mt-2 w-fit">Add Query</button>
      </form>
    </section>
  );
};

export default AddQuery;
