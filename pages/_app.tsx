import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { AllTheProviders } from '@/contexts/AllTheProviders';



const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AllTheProviders>
            <Component {...pageProps} />
        </AllTheProviders>
    )
};

export default MyApp;