import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Building, Calendar, Users } from "lucide-react";

interface ActivityItemProps {
  action: string;
  description: string;
  time: string;
  type: "hotel" | "booking" | "user" | "system";
  status?: "pending" | "completed" | "failed";
}

const typeIcons = {
  hotel: Building,
  booking: Calendar,
  user: Users,
  system: Clock
};

const typeColors = {
  hotel: "text-blue-600 bg-blue-50 border-blue-200",
  booking: "text-green-600 bg-green-50 border-green-200",
  user: "text-purple-600 bg-purple-50 border-purple-200",
  system: "text-gray-600 bg-gray-50 border-gray-200"
};

const statusIcons = {
  pending: Clock,
  completed: CheckCircle,
  failed: XCircle
};

const statusColors = {
  pending: "text-yellow-600",
  completed: "text-green-600",
  failed: "text-red-600"
};

export function ActivityItem({ action, description, time, type, status }: ActivityItemProps) {
  const Icon = typeIcons[type];
  const StatusIcon = status ? statusIcons[status] : null;

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className={`w-6 h-6 sm:w-8 sm:h-8 ${typeColors[type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{action}</h4>
              {StatusIcon && status && (
                <StatusIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${statusColors[status]}`} />
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">{description}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                {type}
              </Badge>
              <span className="text-xs text-gray-400">{time}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 