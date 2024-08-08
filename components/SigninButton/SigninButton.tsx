
import { SignInButton, AuthKitProvider, useProfile, type StatusAPIResponse } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';
import { SIGNIN_BUTTON_CONFIG } from '@/config';
import LoginService, { type loginDataType } from '@/services/loginService'
import { tokenAtom, userInfoAtom, type userInfoType } from '@/hooks/useUser'
import { useAtom } from 'jotai'
import { Image } from "antd";
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from "../Loading/Loading";


export default function LoginButton() {
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
        <div>
            <SigninButton />
        </div>
    )
}

function SigninButton() {
    // set Token
    const [, setToken] = useAtom(tokenAtom)
    // set userInfo
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)

    //  handleSuccess形参res: StatusAPIResponse
    const handleSuccess = async (res: StatusAPIResponse) => {
        const { bio, custody, displayName, fid, message, nonce, pfpUrl, signature, state, username, verifications } = res

        const whitelist_userinfo: userInfoType = {
            displayName,
            fid,
            pfpUrl,
            state,
            username,
            bio,
            custody
        }

        // const whitelist_userinfo: userInfoType = {
        //     displayName: 'zeck',
        //     fid: 1279,
        //     pfpUrl: 'https://i.imgur.com/jWY4c0Z.jpg',
        //     state: 'completed',
        //     username: 'zeck',
        //     bio: 'cooking @basequest and running @boostbot',
        //     custody: '0x9D91d285015ce9Ac33ee5CFC7B46c888817175d5',
        // }

        const loginData: loginDataType = {
            address: custody,
            fid: fid,
            signature,
            message,
            nonce
        }

        // const loginData: loginDataType = {
        //     address: "0x9D91d285015ce9Ac33ee5CFC7B46c888817175d5",
        //     fid: 1279,
        //     signature: "0xc7249102b7ae672f5d7f7cacc0c97c09dd8bf1a6c14d6b771eb43096f09532246de27783533b63c31b91868d1d444a092e229ed7a2f6bddf463c824cf001dba41b",
        //     message: "joinwhitelist.xyz wants you to sign in with your Ethereum account:\n0x9D91d285015ce9Ac33ee5CFC7B46c888817175d5\n\nFarcaster Auth\n\nURI: https://joinwhitelist.xyz/login\nVersion: 1\nChain ID: 10\nNonce: qzsESHWQxXjSk7MFa\nIssued At: 2024-07-30T06:33:34.241Z\nResources:\n- farcaster://fid/1279",
        //     nonce: "qzsESHWQxXjSk7MFa",
        // }
        try {
            const result = await LoginService.login(loginData)

            if (result.code === 200) {
                const TOKEN = result.message ? result.message + '' : ''
                setToken("Bearer " + TOKEN)
                setUserInfo({
                    ...userInfo,
                    ...whitelist_userinfo
                })
            } else {
                setToken('')
                setUserInfo(null)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <AuthKitProvider config={SIGNIN_BUTTON_CONFIG}>
            <SignInButton
                onSuccess={(res) => handleSuccess(res)}
            />
            {/* <button onClick={() => handleSuccess()}>登录</button> */}
        </AuthKitProvider>
    )
}

