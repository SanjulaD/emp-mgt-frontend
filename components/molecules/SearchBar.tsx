import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, sortBy: string, sortOrder: string) => void;
  onSortChange: (sortType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('first_name'); // Default sorting by first name
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Default sorting order

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, sortBy, sortOrder);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'sort_by') {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    onSortChange(value);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full"
      />
      <div className="mt-2">
        <label className="mr-2">Sort by:</label>
        <select name="sort_by" onChange={handleSortChange} value={sortBy}>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
        </select>

        <label className="mr-2 ml-4">Order:</label>
        <select name="sort_order" onChange={handleSortChange} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
