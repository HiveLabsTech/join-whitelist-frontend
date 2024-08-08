import { type ReactNode, type PropsWithChildren } from 'react'

type MainLayoutProps = PropsWithChildren & {
    header?: ReactNode
}

export default function MainLayout({
    header,
    children
}: MainLayoutProps) {
    return (
        <div>
            {header}
            <div className="w-[1200px] h-[100vh] overflow-y-auto my-0 mx-auto pt-[90px] pb-[30px] hide-scrollbar">{children}</div>
        </div>
    )
}