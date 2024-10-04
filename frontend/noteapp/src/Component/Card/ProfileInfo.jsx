import { getInitials } from "../../util/helper";
import React from "react";

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    userInfo && (
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo.username)}
        </div>

        <div className="flex flex-col">
          <p className="text-xs sm:text-sm font-medium">{userInfo.username}</p>
          <button className="text-xs sm:text-sm text-slate-700 underline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
