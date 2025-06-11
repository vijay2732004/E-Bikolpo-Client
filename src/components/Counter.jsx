import React from 'react';
import CountUp from 'react-countup';

const Counter = () => {
  return (
    <div>
      <section className="text-center py-12 bg-base-200 rounded-xl w-11/12 mx-auto my-10">
        <h2 className="text-3xl font-bold mb-4">📈 E-Bikolpo Platform Stats</h2>
        <p className="mb-8">
          Empowering users to discover better products — here’s what our community has achieved!
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="bg-base-100 p-8 rounded-2xl w-64 text-left shadow-md">
            <img width={50} height={50} src="https://img.icons8.com/ios-filled/100/question-mark.png" alt="Queries" />
            <strong className="text-4xl my-2 block">
              <CountUp end={1500} duration={10} />+
            </strong>
            <p>Product Queries Posted</p>
          </div>

          <div className="bg-base-100 p-8 rounded-2xl w-64 text-left shadow-md">
            <img width={50} height={50} src="https://img.icons8.com/ios-filled/100/gift.png" alt="Recommendations" />
            <strong className="text-4xl my-2 block">
              <CountUp end={2200} duration={10} />+
            </strong>
            <p>Recommendations Shared</p>
          </div>

          <div className="bg-base-100 p-8 rounded-2xl w-64 text-left shadow-md">
            <img width={50} height={50} src="https://img.icons8.com/ios-filled/100/user.png" alt="Users" />
            <strong className="text-4xl my-2 block">
              <CountUp end={1000} duration={10} />+
            </strong>
            <p>Active Users</p>
          </div>

          <div className="bg-base-100 p-8 rounded-2xl w-64 text-left shadow-md">
            <img width={50} height={50} src="https://img.icons8.com/ios-filled/100/thumb-up.png" alt="Feedback" />
            <strong className="text-4xl my-2 block">
              <CountUp end={850} duration={10} />+
            </strong>
            <p>Positive Feedback</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;
