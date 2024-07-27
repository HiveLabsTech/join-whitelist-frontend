import classNames from "classnames";
import { Image } from "antd";


type WhitelistCardProps = {
    className?: string,
    projectId: number | string,
    projectName: string,
    creator: string,
    isPerson: boolean,
    state: string,
    link: string,
}

export default function WhitelistCard({
    className = '',
    projectId,
    projectName,
    creator,
    isPerson,
    state,
    link,
}: WhitelistCardProps) {
    return (
        <div className={classNames('px-[20px] py-[19px] border-[1px]  rounded-[10px] shadow flex items-center', className)}>
            {/* logo */}
            <div className="w-[56px] h-[56px] rounded-[50%] overflow-hidden mr-[20px]">
                <Image
                    src="/images/icons/logo.png"
                    alt={projectName}
                    width="56px"
                    height="56px"
                    preview={false}
                />
            </div>

            {/* project name */}
            <span className="text-[22px] font-bold flex-1">{projectName}</span>

            {/* creator */}
            <span className="flex-[0.5] text-[16px] text-[#010101]">creator: {creator}</span>

            {/* operation button 
                按钮规则:
                join: (非自己创建 && 正在进行中) || 未登录 
                Download: 登录 && 自己创建 && 已结束
                Share: 登录 && 自己创建 && 进行中
            */}
            <button className="px-[15px] py-[11px] border-0 rounded-[8px] bg-[#7c65c1] text-[#fff] text-[18px] font-medium flex items-center active:bg-purple-800 transition duration-500 ease-out">
                <i className="not-italic">+</i> <span className="ml-[7px]">Join</span>

                {/* <i className="share"></i>
               <span className="ml-[7px]">Share</span> */}

                {/* <i className="download"></i> <span className="ml-[7px]">Download</span> */}
            </button>
        </div>
    )
}