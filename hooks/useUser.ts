import { atomWithStorage } from 'jotai/utils';

export type userInfoType = {
    displayName: string | undefined,
    fid: number | undefined,
    pfpUrl: string | undefined,
    state: string | undefined,
    username: string | undefined,
    bio: string | undefined,
    custody: string | undefined
}

export const tokenAtom = atomWithStorage<string>("WHITELIST_TOKEN", '')

export const userInfoAtom = atomWithStorage<userInfoType | null>("WHITELIST_USER_INFO", null)