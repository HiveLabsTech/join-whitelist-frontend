
import { SignInButton, AuthKitProvider, useProfile } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';
import { SIGNIN_BUTTON_CONFIG } from '@/config';

export default function SigninButton() {
    return (
        <AuthKitProvider config={SIGNIN_BUTTON_CONFIG}>
            {/* <SignInButton
                onSuccess={(res) => {
                    localStorage.setItem("test_userInfo", JSON.stringify(res))
                    console.log(`Hello,  Your fid is .`, res)
                    }
                }
            /> */}
            {/* <Profile /> */}
            <SignInButton />
        </AuthKitProvider>
    )
}

// function Profile() {
//     const profile = useProfile();
//     console.log("profile", profile)

//     const {
//         isAuthenticated,
//         profile: { fid, displayName, custody },
//     } = profile;


//     return (
//         <>
//             {isAuthenticated ? (
//                 <div>
//                     <p>
//                         Hello, {displayName}! Your FID is {fid}.
//                     </p>
//                     <p>
//                         Your custody address is: <pre>{custody}</pre>
//                     </p>
//                 </div>
//             ) : (
//                 <p>
//                     1111
//                 </p>
//             )}
//         </>
//     );
// }