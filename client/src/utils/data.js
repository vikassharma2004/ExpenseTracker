import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    
    LuLogOut

}
from "react-icons/lu";


export const sidebarData = [
    { title: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard ,id: "01" },
    { title: "Incomes", path: "/incomes", icon: LuHandCoins ,id:"02"},
    { title: "Expenses", path: "/expenses", icon: LuWalletMinimal ,id:'03' },
    { title: "Logout", path: "/logout", icon: LuLogOut, id:"04" },
];