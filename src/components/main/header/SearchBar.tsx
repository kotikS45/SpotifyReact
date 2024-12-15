import React, { useState } from 'react';
import HeaderSearch from "components/main/icon/HeaderSearch.tsx";
import {ISearch} from "interfaces/search";

interface ISearchBarProps {
  className?: string,
  handleSearch?: (props: ISearch) => void,
}

const SearchBar: React.FC<ISearchBarProps> = ({ className, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const search = () => {
      if (handleSearch && searchTerm.length > 1) {
          const props: ISearch = {
              search: searchTerm,
              artistCount: 8,
              albumsCount: 8,
              tracksCount: 8,
              playlistsCount: 6
          }

        handleSearch(props);
      }
  }

  return (
      <div className="flex items-center transition duration-150 mx-[7px] h-[37px] bg-[#3b3b3b] rounded-full">
        <button onClick={() => search()}>
          <HeaderSearch className="w-[17px] h-[17px] ml-[16px]" color="#FFFFFF"/>
        </button>
        <div className={className}>
          <input
              type="text"
              value={searchTerm}
              onChange={handleEnter}
              onKeyDown={(e) => {
                if (e.key === 'Enter') search();
              }}
              placeholder="Search..."
              className="bg-transparent border-0 font-roboto font-normal text-base text-white w-full focus:ring-0"
          />
        </div>
      </div>
  );
};

export default SearchBar;