import SidebarBase from "../dashboard/SidebarBase";
import { sidebarBg } from "../dashboard/theme";
import { IoHomeOutline } from "react-icons/io5";
import { LiaStroopwafelSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const NAV = [
  {
    id:    "overview",
    label: "Overview",
    icon:  <IoHomeOutline />,
  },
  {
    id:    "kundali",
    label: "Kundali",
    icon:  <LiaStroopwafelSolid />,
  },
  {
    id:    "profile",
    label: "Profile",
    icon:  <FaRegUser />,
  },
  {
    id:        "settings",
    label:     "Settings",
    separator: true,
    icon:      <IoSettingsOutline />,
  },
];

const UserSidebar = ({
  active,
  setActive,
  sideOpen,
  setSideOpen,
  onGenerate,
  onLogout,
  user = { name:"User", initial:"U", line1:"" },
}) => (
  <SidebarBase
    navItems={NAV}
    active={active}
    setActive={setActive}
    sideOpen={sideOpen}
    setSideOpen={setSideOpen}
    accent={sidebarBg}
    cta={{
      label:    "New Chart",
      gradient: "linear-gradient(135deg,#d97706,#b45309)",
      onClick:  onGenerate,
    }}
    user={user}
    onLogout={onLogout}
    logo={{ top:"Kundali", bottom:"MARG" }}
  />
);

export default UserSidebar;