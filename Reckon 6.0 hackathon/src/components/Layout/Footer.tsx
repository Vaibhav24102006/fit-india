import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fit India</h3>
            <p className="text-gray-600 text-sm">
              Your trusted partner in health and fitness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="text-gray-600 hover:text-green-600 text-sm">
                  Diet Planner
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-green-600 text-sm">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=supplements" className="text-gray-600 hover:text-green-600 text-sm">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/shop?category=equipment" className="text-gray-600 hover:text-green-600 text-sm">
                  Fitness Equipment
                </Link>
              </li>
              <li>
                <Link href="/shop?category=nutrition" className="text-gray-600 hover:text-green-600 text-sm">
                  Nutrition
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                Email: support@fitindia.com
              </li>
              <li className="text-gray-600 text-sm">
                Phone: +91 123-456-7890
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Fit India. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-green-600 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-green-600 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 