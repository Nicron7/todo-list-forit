import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

export default function SearchBar({
  searchQuery,
  handleInputChange,
  handleKeyPress,
  handleSearch,
}: SearchBarProps) {
  return (
    <div
      className="relative w-full sm:w-80 focus-within:ring-1 focus-within:ring-light-blue py-2 px-4 pr-10
           rounded-lg border border-light-gray focus-within:border-light-blue transition-all duration-300"
    >
      <input
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        type="text"
        className="focus:outline-none w-full"
        placeholder="Buscar tarea"
      />
      <div
        onClick={handleSearch}
        className="hover:text-medium-blue transition-all duration-300 flex items-center justify-center px-3 h-10.5 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-dark-gray "
      >
        <Search size={20} />
      </div>
    </div>
  );
}
