import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "../SearchBar/Searchbar";
import { useState } from "react";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate;

  const handleSearch = () =>{

  }
  const onClearSearch = () => {
    setSearchQuery("")
  }

  const onLogout = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        <Searchbar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
