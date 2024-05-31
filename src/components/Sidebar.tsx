import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, LucideIcon, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react"
import Button, { buttonStyles } from "./Button"
import { twMerge } from "tailwind-merge"
import React, { ReactNode, useState } from "react"
import { playlists, subscriptions } from "../data/sidebar"
import { useSidebarContext } from "../context/SidebarContext"
import { HeaderFirstSection } from "./Header"


type Props = {}

function Sidebar({}: Props) {

    const {isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>

    <aside className={`sticky top-0 overflow-y-scroll scrollbar-hidden pb-4 flex flex-col ml-1 lh:hidden ${isLargeOpen ? "lg:hidden" : "lg:flex"}`} >
        <SmallSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
        <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem IconOrImgUrl={Clapperboard} title="Subscription" url="/subscription" />
        <SmallSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
    </aside>

    {isSmallOpen && <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50 " />}

    <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen " : "hidden"} `}>
     <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
        <HeaderFirstSection  />
     </div>
        
        <LargeSidebarSection >
            <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
            <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscription" url="/subscription" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5} >
            <LargeSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
            <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library" />
            <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history" />
            <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
            <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL" />
            <hr />
            {
                playlists.map((playlist) => (
                    <LargeSidebarItem key={playlist.id} IconOrImgUrl={ListVideo} title={playlist.name} url={`playlist?list=${playlist}`} />
                ))
            }
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscription" >
            {
                subscriptions.map((subscription) => (
                    <LargeSidebarItem key={subscription.id} IconOrImgUrl={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`} />
                ))
            }
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore" >
        <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
          <LargeSidebarItem IconOrImgUrl={Lightbulb} title="Learning" url="/learning" />
          <LargeSidebarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
          <LargeSidebarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSidebarSection>
    </aside>
    </>

  )
}

export default Sidebar


const SmallSidebarItem = ({IconOrImgUrl: Icon, title, url}: { IconOrImgUrl: LucideIcon  | string | string, title: string; url: string; }) => {
    return (
        <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-1 px-1.5 flex flex-col items-center rounded-lg gap-1.5")}>
            <Icon size={20} className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    title?: string;
    children: ReactNode;
    visibleItemCount?: number;
}

const LargeSidebarSection = ({children, title, visibleItemCount = Number.POSITIVE_INFINITY}: LargeSidebarSectionProps) => {
    
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, visibleItemCount);

    const showExpantionButton  = childrenArray.length > visibleItemCount;
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;


    return (
        <div className="flex flex-col gap-1">
            {title &&  <span className="ml-4 mt-2 text-lg mb-1">{title}</span> }
            {visibleChildren}
            {showExpantionButton && <Button onClick={() => setIsExpanded((prev) => !prev)} variant={"ghost"} className="w-full flex items-center rounded-lg gap-4 p-3">
                <ButtonIcon className="w-6 h-6 " />
                <div className="">{isExpanded ? "Show Less" : "Show More"}</div>
            </Button>}
        </div>
    )
}

const LargeSidebarItem = ({isActive = false, IconOrImgUrl: IconOrImgUrl, title, url}: { isActive?: boolean; IconOrImgUrl: LucideIcon  | string, title: string; url: string; }) => {
    return <>
            <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), `p-3 w-full flex items-center rounded-lg gap-4 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
            {
                typeof IconOrImgUrl === 'string'
                ?  <img src={IconOrImgUrl} alt="image-icon" className="w-6 h-5 object-cover rounded-full"  />
                : <IconOrImgUrl size={20} className="w-6 h-6" />
            }
            <div className="whitespace-nowrap overflow-hidden text-ellipsis ">{title}</div>
        </a>
    </>
}