import { NavLink } from "react-router-dom";
import File from "../icon/File";
import Friends from "../icon/Friends";
import Notifications from "../icon/Notifications";
import HeaderLink from "../link/HeaderLink";
import SearchBar from "./SearchBar";
import HeaderSearch from "../icon/HeaderSearch";

const Header = () => {
    return (
        <header className="sticky z-30 top-0 flex items-center justify-end ml-[10px] px-[10px] w-[100%] h-[78px] bg-black rounded-b-[14px] opacity-85">
          <div className="flex ml-auto mr-auto py-[20px]">
            <HeaderLink icon={<Friends className="w-[18px] h-[18px]"/>} to="/friends"/>
            <div className="flex items-center transition duration-150 mx-[7px] h-[37px] bg-[#3b3b3b] rounded-full">
              <HeaderSearch className="w-[17px] h-[17px] ml-[16px]" color="#FFFFFF"/>
              <SearchBar className="min-w-[350px] pr-[10px]"/>
            </div>
            <HeaderLink icon={<File className="w-[19px] h-[18px]"/>} to="/genres"/>
            <HeaderLink icon={<Notifications className="w-[17px] h-[18px]"/>} to="/notification"/>
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