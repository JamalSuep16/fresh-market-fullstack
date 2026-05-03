interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
  }
  
  export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
      <div className="max-w-md w-full">
        <div className="relative group">
          <input
            type="text"
            placeholder="Cari buah segar..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }