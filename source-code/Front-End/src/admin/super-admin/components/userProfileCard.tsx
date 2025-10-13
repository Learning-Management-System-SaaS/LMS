// src/components/UserProfileCard.tsx

import React from "react";

const UserProfileCard = () => {
  return (
    <div className="flex items-center space-x-3 p-2">
      <div className="avatar ">
        <div className=" w-10 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
        </div>
      </div>
      <div>
        <div className="font-semibold text-gray-800">Alex</div>
        <div className="text-sm text-gray-500">alex@example.com</div>
      </div>
    </div>
  );
};

export default UserProfileCard;
