import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from 'antd';
// 骨架屏：用于数据加载的时候效果
type DynamicSkeletonType = {
    className?: string 
}

const DynamicSkeleton = ({
    className = ""
}: DynamicSkeletonType) => {
    const [rows, setRows] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateRows = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.clientHeight;
                const approximateRowHeight = 24; // 假设每行大约24px高
                const calculatedRows = Math.floor(containerHeight / approximateRowHeight);
                setRows(calculatedRows);
            }
        };
        calculateRows();
        window.addEventListener('resize', calculateRows);

        return () => window.removeEventListener('resize', calculateRows);
    }, []);

    return (
        <div className={className} ref={containerRef} style={{ width: "100%", height: 'calc(49vh - 100px)' }}> {/* 假设顶部有100px的其他内容 */}
            <Skeleton active paragraph={{ rows: rows, width: "100%" }} />
        </div>
    );
}

export default DynamicSkeleton;