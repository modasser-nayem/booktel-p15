import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  onSearch: (value: string) => void;
  filters?: {
    key: string;
    label: string;
    options: FilterOption[];
    value?: string;
    onValueChange: (value: string) => void;
  }[];
  onClearFilters?: () => void;
  showClearButton?: boolean;
}

export function FilterBar({
  searchPlaceholder = "Search...",
  onSearch,
  filters = [],
  onClearFilters,
  showClearButton = true,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    onSearch("");
    onClearFilters?.();
  };

  const hasActiveFilters = searchValue || filters.some(filter => filter.value);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={filter.value}
            onValueChange={filter.onValueChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* Clear Filters Button */}
        {showClearButton && hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
} 