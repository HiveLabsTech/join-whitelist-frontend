import { NextRequest, NextResponse } from 'next/server'
import { NEXT_PUBLIC_URL } from '../../config'
import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { Message } from '@farcaster/core';
import ProjectService from '@/app/service/projectService';

export async function POST(req: NextRequest): Promise<Response> {
    const searchParams = req.nextUrl.searchParams
    const pageType = searchParams.get("pageType") as (string | number)
    const projectId = searchParams.get("projectId") as (string | number)
    const data = await req.json()
    // const buttonId = data.untrustedData.buttonIndex
    const { trustedData, untrustedData } = data
    const buttonId = untrustedData.buttonIndex
    let fid: number | undefined = undefined // 用户id
    if (trustedData?.messageBytes) {
        const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
        fid = message.data?.fid;
    }

    

    let path: string = "";
    if (buttonId == 1) {
        if (pageType == 1) { // 首页点击join按钮
            const result = await ProjectService.getProjectInfoImage(projectId, fid)
            let imgUrl: string = result.message

            // 这里需要处理 一个按钮 两个按钮的情况
            if (result.data && result.data.isFollowCondition && result.data.isChannelCondition) { // 需要满足两个条件
                return new NextResponse(
                    getFrameHtmlResponse({
                        // 在这里可以添加buttons按钮组件
                        buttons: [
                            {
                                label: `follow`,
                                // action: 'post',
                            },
                            {
                                label: `join_channel`,
                                // action: 'post'
                            }
                        ],
                        image: `${imgUrl}`,
                        // 在这里可以添加post_url
                        // post_url: `{NEXT_PUBLIC_URL}/user?pageType=2&projectId=${projectId}`
                    })
                )
            } else if (result.data && result.data.isFollowCondition && !result.data.isChannelCondition) { // 需要满足follow操作
                return new NextResponse(
                    getFrameHtmlResponse({
                        // 在这里可以添加buttons按钮组件
                        buttons: [
                            {
                                label: `follow`,
                                // action: 'post',
                            }
                        ],
                        image: `${imgUrl}`,
                        // 在这里可以添加post_url
                        // post_url: `{NEXT_PUBLIC_URL}/user?pageType=2&projectId=${projectId}`
                    })
                )
            } else if (result.data && !result.data.isFollowCondition && result.data.isChannelCondition) { // 需要满足join channel操作
                return new NextResponse(
                    getFrameHtmlResponse({
                        // 在这里可以添加buttons按钮组件
                        buttons: [
                            {
                                label: `join_channel`,
                                // action: 'post'
                            }
                        ],
                        image: `${imgUrl}`,
                        // 在这里可以添加post_url
                        // post_url: `{NEXT_PUBLIC_URL}/user?pageType=2&projectId=${projectId}`
                    })
                )
            } else { // 直接加入成功
                return new NextResponse(
                    getFrameHtmlResponse({
                        // 在这里可以添加buttons按钮组件
                        buttons: [
                            {
                                label: `read more`,
                                // action: 'post'
                            }
                        ],
                        image: `${imgUrl}`,
                        // 在这里可以添加post_url
                        // post_url: `{NEXT_PUBLIC_URL}/user?pageType=2&projectId=${projectId}`
                    })
                )
            }

        } else if (pageType == 2) { // 关注 和 channel页面
            // 发送一个关注的请求post

            // 请求完毕后发送一个获取关注后的一个详情的图片请求

            return new NextResponse(
                getFrameHtmlResponse({
                    // 在这里可以添加buttons按钮组件
                    buttons: [
                        {
                            label: `follow`
                        },
                        {
                            label: `join_channel`
                        }
                    ],
                    image: `${NEXT_PUBLIC_URL}/`,
                    // 在这里可以添加post_url
                    // post_url: `{NEXT_PUBLIC_URL}/user?pageType=2&projectId=${projectId}`
                })
            )
        }

    } else if (buttonId == 2) {
        // 加入频道
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