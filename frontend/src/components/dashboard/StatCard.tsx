import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  change: string;
  changeType: "increase" | "decrease";
  description: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  change,
  changeType,
  description
}: StatCardProps) {
  return (
    <Card className={`border ${borderColor} hover:shadow-lg transition-shadow duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`w-6 h-6 sm:w-8 sm:h-8 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center space-x-2 mt-2">
          <Badge 
            variant="outline" 
            className={`text-xs ${
              changeType === "increase" 
                ? "text-green-600 border-green-200 bg-green-50" 
                : "text-red-600 border-red-200 bg-red-50"
            }`}
          >
            {changeType === "increase" ? (
              <ArrowUpRight className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
            )}
            {change}
          </Badge>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
} 