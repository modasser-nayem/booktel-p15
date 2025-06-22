import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: string;
  bgColor: string;
  borderColor: string;
  onClick?: () => void;
}

export function QuickActionCard({
  title,
  description,
  icon,
  href,
  color,
  bgColor,
  borderColor,
  onClick
}: QuickActionCardProps) {
  return (
    <Card className={`border ${borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
          <div className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`}>{icon}</div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={href}>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">{description}</p>
        <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" asChild>
          <Link href={href}>
            View Details
            <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
} 