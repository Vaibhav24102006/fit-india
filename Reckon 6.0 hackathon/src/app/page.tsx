import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Fit India",
  description:
    "Get personalized diet plans and health recommendations through our AI-powered platform",
};

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-green-600">Fit India</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get personalized diet plans and health recommendations. Start your
            journey to a healthier life today.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/chatbot.html"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/products.html"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                {/* Icon */}
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Personalized Diet Plans
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Get customized diet recommendations based on your goals and
                preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                {/* Icon */}
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Health Products
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Shop for high-quality supplements and fitness equipment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                {/* Icon */}
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Expert Guidance
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Get professional advice and support on your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
