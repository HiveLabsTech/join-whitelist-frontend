const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL
const APIKEY = process.env.NEXT_PUBLIC_API_KEY

export const SIGNIN_BUTTON_CONFIG = {
    rpcUrl: RPC_URL,
    domain: "joinwhitelist.xyz",
    siweUri: "https://joinwhitelist.xyz/login",
    relay: 'https://relay.farcaster.xyz',
}

export const API_KEY = APIKEY ? APIKEY : ''




