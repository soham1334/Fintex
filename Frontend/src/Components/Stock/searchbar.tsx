import { useContext, useState } from "react";
import { CompanyNameContext, SearchClick } from "./stock";
import companyList from "./companylist";

function SearchBar() {
  const { company, setCompany } = useContext(CompanyNameContext)!;
  const { setSearchclick } = useContext(SearchClick)!;

  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompany(value);
    if (value.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const matches = companyList.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFiltered(matches.slice(0, 6)); // limit to top 6 suggestions
    setShowDropdown(true);
  };

  const handleSelect = (name: string) => {
    setCompany(name);
    setShowDropdown(false);
    setFiltered([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchclick(true);
    setShowDropdown(false);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="flex flex-col sm:w-[90%] lg:w-[75%] relative">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Search for companies..."
            value={company}
            onChange={handleChange}
            className="flex-grow w-[700px] px-9 py-3 rounded-full shadow-lg text-base text-gray-800 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-gray-800 transition"
          >
            Search
          </button>
        </form>

        {showDropdown && filtered.length > 0 && (
          <ul className="absolute top-full mt-1 left-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-md z-10">
            {filtered.map((name, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
