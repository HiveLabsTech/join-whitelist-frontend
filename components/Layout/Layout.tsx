import React from "react";
import { NextSeo } from 'next-seo'
import classNames from 'classnames'
import MainLayout from "./MainLayout";

type LayoutProps = {
    children: React.ReactNode,
    header?: React.ReactNode,
}

export default function Layout({
    children,
    header,
}: LayoutProps) {
    const metaTitle = `Join WhiteList`
    return (
        <div className={classNames("font-inter bg-backdrop app-chrome")}>
            <NextSeo title={metaTitle} />
            <MainLayout header={header}>{children}</MainLayout>
        </div>
    )
}