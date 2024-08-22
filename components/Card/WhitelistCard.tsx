import classNames from "classnames";
import { Image } from "antd";
import { type WhiteItemDataType } from "@/lib/schemas/whitelist";
import { formatTimestamp } from "@/utils/dateUtil";
import LoginButton from "../SigninButton/LoginButton";






const baseUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_BASEURL : process.env.NEXT_PUBLIC_PRO_BASEURL

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





    // 点击join按钮
    const handleJoin = () => {
        // 跳转到指定的join Cast 去
        window.open(`https://warpcast.com/${creator_user_name}/${hash}`)
    }

    // 点击share按钮进行分享
    const handleShare = () => {
        // 需要分享的内容
        const text = `I've just created a whitelist on @joinwhitelist , Please Join with me now`
        const url = `https://www.joinwhitelist.xyz/join/${id}`

        // 编码分享内容
        const encodedText = encodeURIComponent(text)
        const encodeUrl = encodeURIComponent(url)

        // 构建Warpcast 分享 URL
        const warpcastShareUrl = `https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${encodeUrl}`

        // 在新窗口中打开Warpcast分享页面
        window.open(warpcastShareUrl, '_blank')
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
                {((isLogin && isOwn != 1 && status != 1 && !isJoined)) && <button className={borderClassname} onClick={() => handleJoin()}>
                    <i className="not-italic">+</i> <span className="ml-[7px]">Join</span>
                </button>}

                {!isLogin && <div className="signbutton_container relative">
                    <LoginButton />
                </div>}

                {/* Share: 登录 && 自己创建 && 进行中 */}
                {!isJoined && (isLogin && isOwn == 1 && status != 1) && <button className={borderClassname} onClick={() => handleShare()}>
                    <i className="share"></i>
                    <span className="ml-[7px]">Share</span>
                </button>}

                {/* Download: 登录 && 自己创建 && 已结束 */}
                {(isLogin && isOwn == 1 && status == 1) && <a className={borderClassname} href={`${baseUrl}/api/whitelist/download_csv/${id}`} download="whitelist.csv">
                    <i className="download"></i> <span className="ml-[7px]">Download</span>
                </a>}

                {(isLogin && isJoined && isOwn != 1) && <span className="text-[#4bc95b] mr-[20px]">Joined</span>}


            </div>
        </div>
    )
}