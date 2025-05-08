import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    
    LuLogOut

}
from "react-icons/lu";


export const sidebarData = [
    { title: "Dashboard", path: "/Dashboard", icon: LuLayoutDashboard ,id: "01" },
    { title: "Incomes", path: "/Incomes", icon: LuHandCoins ,id:"02"},
    { title: "Expenses", path: "/Expenses", icon: LuWalletMinimal ,id:'03' },
    { title: "Logout", path: "/Logout", icon: LuLogOut, id:"04" },
];