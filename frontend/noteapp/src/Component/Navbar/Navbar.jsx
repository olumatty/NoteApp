import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "../SearchBra/Searchbar";
import { useState } from "react";

const Navbar = ({userInfo, onSearchNote,handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () =>{
    if(searchQuery){
      onSearchNote(searchQuery);
    }

  }
  const onClearSearch = () => {
    setSearchQuery("")
  }

  const onLogout = () => {
    localStorage.clear()
    navigate("/");
  };
  return (
    <div>
  <div className="bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 md:py-2 drop-shadow">
    <h2 className="text-lg md:text-xl font-medium text-black py-2 md:py-0">Notes</h2>

    <div className="w-full md:w-auto mt-3 md:mt-0">
      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
    </div>

    <div className="mt-3 md:mt-0">
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  </div>
</div>

  );
};

export default Navbar;
