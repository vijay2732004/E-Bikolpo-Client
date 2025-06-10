
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-6">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-lg text-gray-500">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="btn btn-primary mt-4">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;