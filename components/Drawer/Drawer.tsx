import React from 'react'
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';

/* 
    className: 设置类
    width: 设置抽屉弹窗的宽度
    height: 设置抽屉弹窗的高度
    children: 插槽内容
    title: 抽屉弹窗标题
    placement: 抽屉显示的位置
    closable: 是否显示顶部 "x" 按钮
    onClose: 关闭抽屉弹窗时触发的函数
    open: 是否显示抽屉
    mask: 是否支持遮罩层
*/
type DrawerBox = {
    className?: string
    width?: string | number,
    height?: string | number,
    children: React.ReactNode,
    title: string,
    placement: 'top' | 'right' | 'bottom' | 'left',
    closable?: boolean,
    onClose: (e: React.MouseEvent | React.KeyboardEvent) => void,
    open: boolean,
    mask?: boolean
}

export default function DrawerBox({
    className = '',
    width = 378,
    height = 378,
    children,
    title,
    placement,
    closable = false,
    onClose,
    open,
    mask = true,
}:DrawerBox) {
    return (
        <>
            <Drawer
                className={className}
                width={width}
                height={height}
                title={title}
                placement={placement}
                closable={closable}
                onClose={onClose}
                open={open}
                key={placement}
                mask={mask}
            >
               {children}
            </Drawer>
        </>
    )
}