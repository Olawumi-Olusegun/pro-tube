import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "./Button";
import { useSidebarContext } from "../context/SidebarContext";

const Header = () => {

    const {showFullWidthSearch, setShowFullWidthSearch } = useSidebarContext();

  return (
    <div className="flex items-center justify-between gap-10 lg:gap-20 pt-2 mb-6 mx-4">
        <HeaderFirstSection showFullWidthSearch={showFullWidthSearch} />
  
            <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch  ? "flex" : "hidden md:flex"} `}>
                {  showFullWidthSearch && <Button type="button" onClick={() => setShowFullWidthSearch(false)} size={"icon"} variant={"ghost"} className="flex-shrink-0"> <ArrowLeft /> </Button>
                }
                <div className="flex flex-grow max-w-[600px]">
                    <input type="search" placeholder="Search" className="border rounded-l-full border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none" />
                    <Button type="button" className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"> <Search /> </Button>
                </div>
                <Button type="button" size={"icon"} className="flex-shrink-0"> <Mic /> </Button>
            </form>

            

        <div className={`items-center flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>
            <Button type="button" onClick={() => setShowFullWidthSearch(true)} size={"icon"} variant={"ghost"} className="flex-shrink-0 md:hidden "> <Search /> </Button>
            <Button type="button" size={"icon"} variant={"ghost"} className="flex-shrink-0 md:hidden "> <Mic /> </Button>
            <Button type="button" size={"icon"} variant={"ghost"}> <Upload /> </Button>
            <Button type="button" size={"icon"} variant={"ghost"}> <Bell /> </Button>
            <Button type="button" size={"icon"} variant={"ghost"}> <User /> </Button>
        </div>
    </div>
  )
}

export default Header

export const HeaderFirstSection = ({showFullWidthSearch = false}: {showFullWidthSearch?:boolean}) => {
    const { toggle } = useSidebarContext();
    return  <div className={`items-center gap-4 flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"} `}>
    <Button onClick={toggle} variant={"ghost"} size={"icon"} >
        <Menu />
    </Button>
    <a href="/" className="font-bold text-lg">
        {"Pro"}<span className="text-red-600">Tube</span>
    </a>
</div>
}