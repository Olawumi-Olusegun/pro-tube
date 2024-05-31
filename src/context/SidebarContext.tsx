import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type SidebarProviderTypes = {
    children: ReactNode;
}

type SidebarContexttype = {
    isLargeOpen: boolean;
    isSmallOpen: boolean;
    toggle: () => void;
    close: () => void;
    showFullWidthSearch: boolean;
    setShowFullWidthSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContexttype | null>(null);


export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if(context === undefined || context === null) {
        throw Error("Cannot use outside of SidebarProvider")
    }
    return context;
}


export const SidebarProvider = ({children}:SidebarProviderTypes) => {
    const [isLargeOpen, setIsLargeOpen] = useState(false);
    const [isSmallOpen, setIsSmallOpen] = useState(false);
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

    const isScreenSmall = () => {
        return window.innerWidth < 1024;
    }

    const toggle = () => {
        if(isScreenSmall()) {
            setIsSmallOpen((prev) => !prev)
        }else {
            setIsLargeOpen((prev) => !prev)
        }
    }

    const close = () => {
        if(isScreenSmall()) {
            setIsSmallOpen(false);
        }else {
            setIsLargeOpen(false);
        }
    }

    useEffect(() => {
        const handler = () => {
            if(!isScreenSmall()) {
                setIsSmallOpen(false)
                setShowFullWidthSearch(false)
            }
        }

        window.addEventListener('resize', handler);

        return () => window.removeEventListener("resize", handler);
    }, [])

    return <SidebarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
        showFullWidthSearch,
        setShowFullWidthSearch,
    }}>
        {children}
    </SidebarContext.Provider>
}