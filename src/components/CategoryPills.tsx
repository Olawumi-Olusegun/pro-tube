import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button"
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
    categories: string[];
    onSelect: (category: string) => void;
    selectedCategory: string;
}

 const TRANSLATE_AMOUNT = 200;

function CategoryPills({categories, selectedCategory, onSelect}: CategoryPillsProps) {
   
    const [isLeftVisible, setIsLeftVisible] = useState(true);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const [translate, setTranslate] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(containerRef.current == null) return;

        const observer = new ResizeObserver((entries) => {
            const container = entries[0].target;
            if(container == null) return;
            setIsLeftVisible(translate > 0);
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
        });
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [categories, translate])


  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
        <div className="flex whitespace-nowrap gap-3 transition-transform w-max" style={{ transform: `translateX(-${translate}px)` }}>
            {categories.map((category, index) => (
                <Button 
                key={index}
                onClick={() => onSelect(category)}
                variant={selectedCategory === category ? "dark" : "default" }
                className="py-1 px-3 rounded-lg whitespace-nowrap ">
                    {category}
                </Button>
            ))}
        </div>
            {
                isLeftVisible && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r w-24 h-full rounded from-white  from-50% to-transparent ">
                    <Button onClick={() => {
                        setTranslate((translate) => {
                            const newTranslate = translate - TRANSLATE_AMOUNT;
                            if(newTranslate <= 0) return 0;
                            return newTranslate
                        })
                    }} variant={"ghost"} size={"icon"} className="h-full  aspect-square w-auto p-1.5 "> <ChevronLeft /> </Button>
                    </div>
                )
            }
            {
                isRightVisible && (
                    <div className="absolute flex justify-end right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l w-24 h-full rounded from-white  from-50% to-transparent ">
                     <Button onClick={() => {
             
                         setTranslate((translate) => {
                            
                            if(containerRef.current == null) {
                                return translate;
                            }

                            const newTranslate = translate + TRANSLATE_AMOUNT;
                            const edge = containerRef.current.scrollWidth
                            const width = containerRef.current.clientWidth;
            
                            if(newTranslate + width >= edge) {
                                return edge - width;
                            }
                            return newTranslate;
                        })
                    }} variant={"ghost"} size={"icon"} className="h-full  aspect-square w-auto p-1.5 "> <ChevronRight /> </Button> 
                    </div>
                )
            }
    </div>
  )
}

export default CategoryPills