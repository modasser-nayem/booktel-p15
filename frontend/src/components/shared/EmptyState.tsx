import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, Search, Package } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  variant?: "default" | "search" | "add" | "error";
}

const variantIcons = {
  default: Package,
  search: Search,
  add: Plus,
  error: AlertTriangle
};

const variantColors = {
  default: "text-gray-400",
  search: "text-blue-400",
  add: "text-green-400",
  error: "text-red-400"
};

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  variant = "default"
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant];
  const colorClass = variantColors[variant];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className={`w-16 h-16 ${colorClass} mb-4`}>
        <Icon className="h-16 w-16" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {(actionText && (actionHref || onAction)) && (
        <Button 
          onClick={onAction}
          {...(actionHref && { as: "a", href: actionHref })}
          className="flex items-center space-x-2"
        >
          {variant === "add" && <Plus className="h-4 w-4" />}
          {actionText}
        </Button>
      )}
    </div>
  );
} 