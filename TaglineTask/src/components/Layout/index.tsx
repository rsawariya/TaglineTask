import { ReactElement, memo } from "react"

interface LayoutProps {
    children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
    return <div className="h-screen w-full p-16 bg-gray-400 flex flex-col justify-around">
        {children}
    </div>
}

export default memo(Layout);