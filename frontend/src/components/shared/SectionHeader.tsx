import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  subtitle,
  description,
  className = ""
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
        {badgeText}
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {title}
        {subtitle && <span className="block text-blue-600">{subtitle}</span>}
      </h2>
      {description && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
} 