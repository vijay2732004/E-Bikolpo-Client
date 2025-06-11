import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch('https://your-server-url.com/queries') // replace with actual API
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setQueries(sorted);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Product Boycott Queries</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {queries.map(query => (
          <div key={query._id} className="bg-base-100 shadow-md rounded-xl p-5">
            <img src={query.productImage} alt={query.productName} className="h-48 w-full object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold">{query.queryTitle}</h3>
            <p><strong>Product:</strong> {query.productName} ({query.productBrand})</p>
            <p className="mt-2"><strong>Recommendations:</strong> {query.recommendationCount}</p>
            <Link to={`/queries/${query._id}`}>
              <button className="btn btn-primary mt-4 w-full">💡 Recommend</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
