import classNames from "classnames";
import { Image } from "antd";
import { type WhiteItemDataType } from "@/lib/schemas/whitelist";

type WhitelistCardType = {
    className?: string
} & WhiteItemDataType

export default function WhitelistCard({
    className = '',
    channel_id,
    channel_name,
    create_time,
    creator_display_name,
    creator_fid,
    creator_user_name,
    end_time,
    follow_display_name,
    follow_fid,
    follow_user_name,
    hash,
    id,
    img_url,
    link,
    project_name,
    address,
    status,
    isOwn,
}: WhitelistCardType) {
    return (
        <div className={classNames('px-[20px] py-[19px] border-[1px]  rounded-[10px] shadow flex items-center', className)}>
            {/* logo */}
            <div className="w-[56px] h-[56px] rounded-[50%] overflow-hidden mr-[20px]">
                <Image
                    src={img_url}
                    alt={project_name}
                    width="56px"
                    height="56px"
                    preview={false}
                />
            </div>

            {/* project name */}
            <span className="text-[22px] font-bold flex-1">{project_name}</span>

            {/* creator */}
            <span className="flex-[0.5] text-[16px] text-[#010101]">created by @{creator_display_name}</span>

            {/* operation button 
                按钮规则:
                join: (非自己创建 && 正在进行中) || 未登录 
                Download: 登录 && 自己创建 && 已结束
                Share: 登录 && 自己创建 && 进行中
                不显示：非自己创建 && 结束 && 已登录的时候
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