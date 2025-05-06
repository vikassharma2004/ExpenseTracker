import React from "react";
import { sidebarData } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { useUserAuthStore } from "../../store/UserAuthStore";

const SideBar = ({ activemenu }) => {
 
const {user,  logout}=useUserAuthStore(  )
  const navigate = useNavigate();

  console.log(user)

  const handleClick = (route) => {
    if (route === "Logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = async() => {
    await logout( )
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-40 blackdrop-blur-[12px] ">
      <div className="flex-col flex items-center justify-center gap-3 mt-3 mb-7 ">
        {user?.profileimgurl ? (
          <img
            src={user?.profileimgurl}
            alt="Profile"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        ) : (
          <></>
        )}
        <h5 className="text-gray-500 text-xl font-medium">{user?.name}</h5>
      </div>
      {sidebarData.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.route || item.title)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
            activemenu === item.title
              ? "bg-blue-800 text-white font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.icon && <span className="text-xl">{<item.icon />}</span>}
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
};

export default SideBar;
