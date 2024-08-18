import { tokenAtom, userInfoAtom, type userInfoType } from '@/hooks/useUser'
import { useAtom } from 'jotai'
import { Image } from "antd";
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from "../Loading/Loading";
import LoginButton from './LoginButton';


export default function ButtonIndex() {
    const [token, setToken] = useAtom(tokenAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    const [isShow, setIsShow] = useState(false)
    const hiddenLogout = () => setIsShow(false)
    // 是否正在退出
    const [isExiting, setIsExiting] = useState<boolean>(false)

    // Log out
    const handleLogout = () => {
        setIsExiting(true)
        setTimeout(() => {
            // 清空token
            setToken('')
            // 清空用户信息
            setUserInfo(null)
            setIsExiting(false)
        }, 2000)
    }

    useEffect(() => {
        document.addEventListener('click', hiddenLogout)

        return () => {
            document.addEventListener('click', hiddenLogout)
        }
    }, [])

    // is Exiting...
    if (isExiting) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    // Has logged
    if (token) {
        let avatar = ''
        if (userInfo && userInfo.pfpUrl) {
            avatar = userInfo.pfpUrl
        } else {
            avatar = ''
        }
        return (
            <div className='flex items-center cursor-pointer' onClick={(evt) => {
                evt.stopPropagation()
                setIsShow(true)
            }}>
                <Image
                    src={avatar}
                    alt="avatar"
                    width="60px"
                    height="60px"
                    preview={false}
                    className='rounded-[50%]'
                />
                <div className='ml-[9px] relative'>
                    <div className="text-[16px] text-[#0F111A] font-medium mb-[-2px]">{userInfo?.displayName}</div>
                    <div className="text-[12px] text-[#9299AA] font-medium">@{userInfo?.username}</div>
                    <div className={classNames("flex justify-center items-center absolute w-[125px] h-[40px] top-[45px] left-[0px] rounded-[10px] border-[1px] border-[#DFDFDF] bg-[#FFF] shadow z-[999] transition-opacity duration-300 hover:bg-[#f3f3f7] ", isShow ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none')} onClick={() => handleLogout()}>
                        <Image
                            src="/images/icons/logout.png"
                            alt="logout"
                            width="20px"
                            height="20px"
                            preview={false}
                        />
                        <span className="text-[16px] text-[#636779] ml-[10px]">Sign out</span>
                    </div>
                </div>

            </div>
        )
    }

    // Not logged in
    return (
        
        <>
            <LoginButton />
        </>
        
    )
}



