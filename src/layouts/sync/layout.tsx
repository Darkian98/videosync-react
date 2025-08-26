import { FC, ReactNode } from "react"

import { useCheckoutStore } from "src/store/useCheckoutStore/useSyncStore"

interface ILayoutSection {
    children: ReactNode
}

const LayoutSection: FC<ILayoutSection> = ({ children }) => {
    return (
        <div className="h-dvh">
            <div>
                header
            </div>
            <div className="bg-[#3277bd]">
                {children}
            </div>
            <div>
                footer
            </div>
        </div>
    )
}

export default LayoutSection;