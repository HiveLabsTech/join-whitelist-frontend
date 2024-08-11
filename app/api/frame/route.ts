import { NextRequest, NextResponse } from 'next/server'
import { NEXT_PUBLIC_URL } from '../../config'
import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { Message } from '@farcaster/core';
import ProjectService from '@/app/service/projectService';

export async function POST(req: NextRequest): Promise<Response> {
    // 查询参数对象
    const searchParams = req.nextUrl.searchParams
    const projectId = searchParams.get("projectId") as (string | number)
    const data = await req.json()
    const { trustedData, untrustedData } = data
    const buttonId = untrustedData.buttonIndex
    let path: string = "";
    let fid: number | undefined = undefined // 用户id
    if (trustedData?.messageBytes) {
        const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
        fid = message.data?.fid;
    }

    

    if (buttonId == 1) {
        const result = await ProjectService.getProjectInfoImage(projectId, fid)
        const imgUrl = result.message
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: `follow_${imgUrl}`,
                    },
                    {
                        label: `join_channel`,
                    } 
                ],
                image: `${NEXT_PUBLIC_URL}/park-1.png`,
            })
        )
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