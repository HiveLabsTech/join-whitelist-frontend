import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { AllTheProviders } from '@/contexts/AllTheProviders';
import { SIGNIN_BUTTON_CONFIG } from '@/config';
import { AuthKitProvider } from '@farcaster/auth-kit';



const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthKitProvider config={SIGNIN_BUTTON_CONFIG}>
        <AllTheProviders>
            <Component {...pageProps} />
        </AllTheProviders>
        </AuthKitProvider>
    )
};

export default MyApp;