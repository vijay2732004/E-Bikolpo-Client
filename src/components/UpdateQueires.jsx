import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const UpdateQueires = () => {
    const [query, setQuery] = useState();
    console.log(query);

    const {user} = use(AuthContext);
    const {id} = useParams();

    useEffect(() => {
  fetch(`http://localhost:3000/UpdateQueries/${id}`)
  .then((res) => res.json())
        .then((data) => setQuery(data));
}, []);
    return (
        <div>
        </div>
    );
};

export default UpdateQueires;