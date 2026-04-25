import SidebarBase from "../dashboard/SidebarBase";
import { sidebarBg } from "../dashboard/theme";
import { IoHomeOutline } from "react-icons/io5";
import { LiaStroopwafelSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { TbUserStar } from "react-icons/tb";

const NAV = [
  {
    id:    "overview",
    label: "Overview",
    icon:  <IoHomeOutline />,
  },
  {
    id:    "kundalis",
    label: "Kundalis",
    icon:  <LiaStroopwafelSolid />,
  },
  {
    id:    "users",
    label: "Users",
    icon:  <FaRegUser />,
  },
  // {
  //   id:    "astrologers",
  //   label: "Astrologers",
  //   icon:  <TbUserStar />,
  // },
];

const AdminSidebar = ({
  active,
  setActive,
  sideOpen,
  setSideOpen,
  onLogout,
  user = { name: "Admin", initial: "A", line1: "" },
}) => (
  <SidebarBase
    navItems={NAV}
    active={active}
    setActive={setActive}
    sideOpen={sideOpen}
    setSideOpen={setSideOpen}
    accent={sidebarBg}
    user={user}
    onLogout={onLogout}
    logo={{ top: "Kundali", bottom: "MARG" }}
  />
);

export default AdminSidebar;