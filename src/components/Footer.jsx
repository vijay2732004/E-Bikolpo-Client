import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-300 py-8 px-4">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Contact</h3>
          <p>Email: <a href="mailto:Shakibcse333@gmail.com" className="text-info">Shakibcse333@gmail.com</a></p>
          <p>Phone: <a href="tel:" className="text-info"> +8801775584107</a></p>
          <p>Address: Mymensingh, Bangladesh</p>
        </div>

        {/* Terms */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Information</h3>
          <ul>
            <li><Link to="/termsandconditions" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Follow Us</h3>
          <div className="flex gap-4 text-xl justify-center items-center">
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="https://www.twitter.com/" target="_blank" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://www.instagram.com/" target="_blank" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" target="_blank" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>
      <p className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} E-Bikolpo. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
