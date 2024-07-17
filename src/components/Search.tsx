import { useState } from "react";
import { useTaskStore } from "../../lib/store";
import { Search } from "lucide-react";

const SearchBar = () => {
  
  // Captures the Input of the search and stores it globally 
  const searchQuery = useTaskStore(state => state.searchQuery);
  const setSearchQuery = useTaskStore(state => state.setSearchQuery);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative flex justify-center items-center gap-3">
      <input
        type="search"
        className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
        placeholder="Search"
        aria-label="Search"
        id="exampleFormControlInput2"
        aria-describedby="button-addon2"
        value={searchQuery ?? ""}
        onChange={handleInputChange}
      />
      <Search className="h-5"/>
    </div>
  );
};

export default SearchBar;
