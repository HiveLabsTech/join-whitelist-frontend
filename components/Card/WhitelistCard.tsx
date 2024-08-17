import classNames from "classnames";
import { Image } from "antd";
import { type WhiteItemDataType } from "@/lib/schemas/whitelist";
import { formatTimestamp } from "@/utils/dateUtil";
import WhitelistService from "@/services/whitelistService";


type WhitelistCardType = {
    className?: string
    isLogin: boolean
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
    isLogin,
    isJoined
}: WhitelistCardType) {
    const borderClassname = "px-[15px] py-[11px] border-0 rounded-[8px] bg-[#7c65c1] text-[#fff] text-[18px] font-medium flex items-center active:bg-purple-800 transition duration-500 ease-out"

    const handleJoin = () => {
        if (isLogin) { // 已登录
            window.open(`https://warpcast.com/${creator_user_name}/${hash}`)
        } else {
            // 未登录
        }
    }

    // 下载csv
    const handleDownloadCsv = async () => {
       try {
            await WhitelistService.downloadCsv(id)
       } catch(error) {}
    }


    return (
        <div className={classNames('relative px-[20px] py-[19px] border-[1px] rounded-lg shadow flex items-center', className)}>
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
            <span className="text-[22px] font-bold flex-1 truncate mr-[10px]">{project_name}</span>

            {/* Deadline */}
            <span className="flex-1">Deadline: {status == 1 ? <span className="text-[#e53e31]">Expired</span> : formatTimestamp(end_time, "YYYY-MM-DD HH:mm:ss")}</span>

            {/* creator */}
            <span className="flex-1 text-[16px] text-[#010101]">created by @{creator_display_name}</span>

            {/* operation button 
                按钮规则:
                不显示：非自己创建 && 结束 && 已登录的时候
            */}
            <div className="w-[145px] flex justify-end">
                {/* join: (非自己创建 && 正在进行中) || 未登录  */}
                {!isLogin || (isLogin && isOwn != 1 && status != 1 && !isJoined) && <button className={borderClassname} onClick={() => handleJoin()}>
                    <i className="not-italic">+</i> <span className="ml-[7px]">Join</span>
                </button>}

                {/* Share: 登录 && 自己创建 && 进行中 */}
                {!isJoined && (isLogin && isOwn == 1 && status != 1) && <button className={borderClassname}>
                    <i className="share"></i>
                    <span className="ml-[7px]">Share</span>
                </button>}

                {/* Download: 登录 && 自己创建 && 已结束 */}
                {!isJoined && (isLogin && isOwn == 1 && status == 1) && <button className={borderClassname} onClick={() => handleDownloadCsv()}>
                    <i className="download"></i> <span className="ml-[7px]">Download</span>
                </button>}

                {isJoined && <span className="text-[#4bc95b] mr-[20px]">Joined</span> }
                
                
            </div>
        </div>
    )
}