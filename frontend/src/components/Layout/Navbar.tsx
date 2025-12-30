import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="nav-logo text-2xl font-bold">
            Fit India
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/chatbot" className="nav-link">Diet Planner</Link>
            <Link href="/shop" className="nav-link">Shop</Link>
            <Link href="/cart" className="nav-link relative">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 