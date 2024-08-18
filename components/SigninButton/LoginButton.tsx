
import { SignInButton, type StatusAPIResponse } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';

import LoginService, { type loginDataType } from '@/services/loginService'
import { tokenAtom, userInfoAtom, type userInfoType } from '@/hooks/useUser'
import { useAtom } from 'jotai'


export default function LoginButton() {
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

        const loginData: loginDataType = {
            address: custody,
            fid: fid,
            signature,
            message,
            nonce
        }

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
        <div>
            <SignInButton
                hideSignOut
                onSuccess={(res) => handleSuccess(res)}
            />
        </div>

    )
}

