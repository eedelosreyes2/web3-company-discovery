import React from 'react';

const Icon = () => {
  return (
    <div className="flex items-center pr-4">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.25 15.25L11.5 11.5L15.25 15.25ZM0.75 7C0.75 3.54822 3.54822 0.75 7 0.75C10.4518 0.75 13.25 3.54822 13.25 7C13.25 10.4518 10.4518 13.25 7 13.25C3.54822 13.25 0.75 10.4518 0.75 7Z"
          stroke="#F1F5F9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

type Props = {
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const Search: React.FC<Props> = ({ handleSearch }) => {
  return (
    <div className="min-w-full sm:min-w-0">
      <div className="mx-auto h-14 max-w-sm sm:mx-0 flex sm:min-w-fit sm:w-96 border-b border-slate-600">
        <Icon />
        <input
          type="text"
          className="focus:placeholder:text-slate-400 placeholder:text-white bg-transparent outline-none w-full"
          placeholder="Search companies"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
