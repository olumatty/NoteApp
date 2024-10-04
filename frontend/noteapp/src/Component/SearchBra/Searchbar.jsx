import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full sm:w-80 flex items-center px-3 py-2 bg-slate-100 rounded-md">
    <input
      type="text"
      placeholder="Search Notes"
      className="w-full text-xs sm:text-sm bg-transparent py-[9px] outline-none"
      value={value}
      onChange={onChange}
    />
  
    {value && (
      <IoMdClose
        className="text-lg text-slate-500 cursor-pointer hover:text-black mr-2 sm:mr-3"
        onClick={onClearSearch}
      />
    )}
  
    <FaMagnifyingGlass
      className="text-slate-400 cursor-pointer hover:text-black"
      onClick={handleSearch}
    />
  </div>
  
  );
};

export default Searchbar;
