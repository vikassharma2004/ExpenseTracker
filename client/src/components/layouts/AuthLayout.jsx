import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="">
      <div className=" ">
        <h2 className="text-lg font-medium text-black ">Expense Tracker</h2>

        {children}
      </div>
     
    </div>
  );
};

export default AuthLayout;
