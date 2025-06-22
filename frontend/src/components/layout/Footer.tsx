import Link from "next/link";
import { Building, Heart, TrendingUp, UserCheck, Phone, Mail, Clock, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Building className="h-10 w-10 text-blue-400" />
              <span className="text-2xl font-bold">Booktel</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for hotel bookings worldwide. Experience luxury, comfort, and adventure with our curated selection.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Heart className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/hotels" className="text-gray-400 hover:text-white transition-colors">Browse Hotels</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Travel Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3" />
                support@booktel.com
              </li>
              <li className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-3" />
                24/7 Support
              </li>
              <li className="flex items-center text-gray-400">
                <Globe className="h-4 w-4 mr-3" />
                Live Chat Available
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Booktel. All rights reserved. Made with ❤️ for travelers worldwide.</p>
        </div>
      </div>
    </footer>
  );
} 