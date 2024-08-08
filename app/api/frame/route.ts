import { NextRequest, NextResponse } from 'next/server'
import { NEXT_PUBLIC_URL } from '../../config'
import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { Message } from '@farcaster/core';

export async function POST(req: NextRequest): Promise<Response> {
    const data = await req.json()
    // const buttonId = data.untrustedData.buttonIndex
    const { trustedData, untrustedData } = data
    const buttonId = untrustedData.buttonIndex
    let fid: number | undefined = undefined // 用户id
    if(trustedData?.messageBytes) {
        const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
        fid = message.data?.fid;
    }

    let path: string = "";
    if(buttonId == 1) {
        return new NextResponse(
            getFrameHtmlResponse({
                // 在这里可以添加buttons按钮组件
                buttons: [
                    {
                        label: `Join_fid${fid}`
                    },
                    {
                        label: `Follow_buttonId${buttonId}`
                    }
                ],
                image: `${NEXT_PUBLIC_URL}/park-1.png`,
                // 在这里可以添加post_url
            })
        )
    } else if(buttonId == 2) {

    } else {
        path = ""
    }

    const headers = new Headers()
    headers.set('Loaction', NEXT_PUBLIC_URL)
    const response = NextResponse.redirect(`${path}`, {
        headers,
        status: 302
    })
    return response
}

export const dynamic = "force-dynamic"