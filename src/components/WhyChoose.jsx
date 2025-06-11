import React from "react";
import { Fade } from "react-awesome-reveal";

const WhyChoose = () => {
  return (
    <div>
      <section className="w-11/12 mx-auto my-12 bg-base-300 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Why Choose E-Bikolpo?
        </h2>
        <Fade>
          <ul className="grid md:grid-cols-2 gap-4 text-lg text-center">
            <li>✅ Community-Powered Product Recommendations</li>
            <li>✅ Easy to Post and Manage Your Queries</li>
            <li>✅ Discover Trusted Alternatives from Real Users</li>
            <li>✅ Transparent, Helpful, and Spam-Free Feedback</li>
          </ul>
        </Fade>
      </section>
    </div>
  );
};

export default WhyChoose;
