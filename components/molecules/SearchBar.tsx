import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@components/atoms/Button';
import InputField from '@components/atoms/InputField';
import { DEFAULT_SEARCH_TERM, DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from '@lib/utils/constants';

interface SearchFormValues {
  searchTerm: string;
  sortBy: string;
  sortOrder: string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string, sortBy: string, sortOrder: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      searchTerm: DEFAULT_SEARCH_TERM,
      sortBy: DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
    },
  });

  const handleSearch: SubmitHandler<SearchFormValues> = (data) => {
    onSearch(data.searchTerm, data.sortBy, data.sortOrder);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="mb-8">
      <div className="grid grid-cols-4 gap-4 items-end">
        <InputField
          name="searchTerm"
          control={control}
          label="Search"
          placeholder="Enter name"
          aria-label="Search term input"
        />
        <InputField name="sortBy" control={control} label="Sort by" as="select" required aria-label="Sort by select">
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
          <option value="number">Phone Number</option>
          <option value="gender">Gender</option>
          <option value="created_at">Created At</option>
        </InputField>

        <InputField
          name="sortOrder"
          control={control}
          label="Order"
          as="select"
          required
          aria-label="Sort order select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </InputField>

        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Search
        </Button>
      </div>
    </form>
  );
});

export default SearchBar;
