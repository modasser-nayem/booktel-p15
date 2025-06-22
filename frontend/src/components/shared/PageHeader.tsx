import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  backHref?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  showBackButton?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  backHref,
  actionText,
  actionHref,
  onAction,
  showBackButton = false
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div className="flex items-center space-x-4">
        {showBackButton && backHref && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        )}
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {badge && (
              <Badge variant="secondary" className="text-sm">
                {badge}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      
      {(actionText && (actionHref || onAction)) && (
        <div className="mt-4 sm:mt-0">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>
                <Plus className="h-4 w-4 mr-2" />
                {actionText}
              </Link>
            </Button>
          ) : (
            <Button onClick={onAction}>
              <Plus className="h-4 w-4 mr-2" />
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 