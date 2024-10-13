import { NavLink } from "react-router-dom";
import File from "./icon/File";
import Friends from "./icon/Friends";
import Notifications from "./icon/Notifications";
import HeaderLink from "./link/HeaderLink";


const Header = () => {
    return (
        <header className="sticky top-0 flex items-center justify-end ml-[10px] px-[10px] w-[100%] h-[78px] bg-black rounded-b-[14px] opacity-85">
          <div className="flex ml-auto mr-auto">
            <HeaderLink icon={<Friends/>} to="/friends"/>
            <HeaderLink icon={<File/>} to="/file"/>
            <HeaderLink icon={<Notifications/>} to="/notification"/>
          </div>
          <div className="flex items-center">
            <NavLink className="bg-gradient-to-r from-[#A30028] to-[#FB2645] text-white mr-[18px] py-[6px] px-[34px] rounded-full text-[12px] font-roboto"
              to="/premium">
              Premium
            </NavLink>
            <NavLink to="" className="text-white mr-[24px] font-roboto text-[16px]">ENG | UA</NavLink>
            <NavLink to="/profile">
              <img src="assets/Logo.png" alt="profile" className="w-[50px] h-[50px] mr-[20px] object-cover rounded-full"/>
            </NavLink>
          </div>
        </header>
    );
};

export default Header;