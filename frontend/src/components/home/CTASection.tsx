"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
}

export function CTASection({
  title = "Ready to Start Your",
  subtitle = "Adventure?",
  description = "Join millions of travelers who trust Booktel for their accommodation needs",
  primaryButtonText = "Create Account",
  secondaryButtonText = "Sign In",
  primaryButtonHref = "/signup",
  secondaryButtonHref = "/login"
}: CTASectionProps) {
  const { user } = useAuth();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {title}
          <span className="block text-yellow-400">{subtitle}</span>
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link href="/hotels">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Browse Hotels
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href={primaryButtonHref}>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg border-0">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href={secondaryButtonHref}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                  {secondaryButtonText}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
} 