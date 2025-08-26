import { useEffect } from "react";
import { usePathname } from "./use-pathname";

export const useScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}