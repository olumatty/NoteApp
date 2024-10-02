import React from "react";
import ProfileInfo from "../Card/ProfileInfo";
const Navbar = () => {
    return ( 
        <div>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className="text-xl font-medium text-black py-2">Notes</h2>

                <ProfileInfo/>
            </div>
        </div>
     );
}
 
export default Navbar;