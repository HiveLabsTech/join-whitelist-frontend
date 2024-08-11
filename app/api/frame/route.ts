import { NextRequest, NextResponse } from 'next/server'
import { NEXT_PUBLIC_URL } from '../../config'
import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { Message } from '@farcaster/core';
import ProjectService from '@/app/service/projectService';


export async function POST(req: NextRequest): Promise<Response> {
    // 查询参数对象
    const searchParams = req.nextUrl.searchParams
    const projectId = searchParams.get("projectId") as (string | number)
    const pageType = searchParams.get("pageType") as (string | number)
    const indexType: string = searchParams.get("indexType") as string

    const data = await req.json()
    const { trustedData, untrustedData } = data
    const buttonId = untrustedData.buttonIndex
    let path: string = "";
    let fid: number | undefined = undefined // 用户id
    if (trustedData?.messageBytes) {
        const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
        fid = message.data?.fid;
    }

    if (pageType == 2) {
        // 如果buttonId == 1
        if (indexType == 'follow') {
            // 关注操作
        }

        if (indexType == 'channel') {
            // 加入频道操作
        }

        if (indexType == 'readmore') {
            // read more
        }

    }

    const result = await ProjectService.getProjectInfoImage(projectId, fid)
    const imgUrl = result.message

    if (buttonId == 1) {

        if (result.data) {
            // 有两个满足条件
            const condtion1 = Number(result.data.follow_id) > -1 && result.data.channel_id
            // 只有一个条件follow
            const condition2 = Number(result.data.follow_id) > -1 && !result.data.channel_id
            // 只有一个条件joined channel
            const condition3 = !(Number(result.data.follow_id) > -1) && result.data.channel_id


            // 未关注
            const followNotFinished = !result.data.isFollowCondition
            // 未joined channel
            const channelNotFinished = !result.data.isChannelCondition

            // 需要满足follow joined_channel && 都是 unfollow unChannel
            if (condtion1 && followNotFinished && channelNotFinished) {
                return new NextResponse(
                    getFrameHtmlResponse({
                        buttons: [
                            {
                                label: `follow`,
                            },
                            {
                                label: `join_channel`,
                            }
                        ],
                        image: `${imgUrl}`,
                        post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=follow&projectId=${projectId}`
                    })
                )
            } else if (condtion1 && followNotFinished && !channelNotFinished || condition2 && followNotFinished) {
                return new NextResponse(
                    getFrameHtmlResponse({
                        buttons: [
                            {
                                label: `follow`,
                            },
                        ],
                        image: `${imgUrl}`,
                        post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=follow&projectId=${projectId}`
                    })
                )
            } else if (condtion1 && !followNotFinished && channelNotFinished || condition3 && channelNotFinished) {
                return new NextResponse(
                    getFrameHtmlResponse({
                        buttons: [
                            {
                                label: `join_channel`,
                            }
                        ],
                        image: `${imgUrl}`,
                        post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=channel&projectId=${projectId}`
                    })
                )
            } else {
                // 不需要任何条件即可加入
                return new NextResponse(
                    getFrameHtmlResponse({
                        buttons: [
                            {
                                label: `read more`,
                            }
                        ],
                        image: `${imgUrl}`,
                        post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=readmore&projectId=${projectId}`
                    })
                )
            }
        }


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