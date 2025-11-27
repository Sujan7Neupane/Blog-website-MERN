import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            MyPracticeApp
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            A place where I build and test new ideas using React, Tailwind, and
            everything I learn as a developer.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">
            Email: hello@mypracticeapp.com
          </p>
          <p className="text-gray-400 text-sm">Phone: +977 9800000000</p>
          <p className="text-gray-400 text-sm">Location: Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyPracticeApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
