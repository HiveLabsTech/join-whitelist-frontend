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
    const channelId: string = searchParams.get("channelId") as string
    const followFid: string = searchParams.get("followFid") as string

    const data = await req.json()
    const { trustedData, untrustedData } = data
    const buttonId = untrustedData.buttonIndex
    let fid: number | undefined = undefined // 用户id
    if (trustedData?.messageBytes) {
        const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
        fid = message.data?.fid;
    }


    // 不需要任何条件直接点击join按钮---直接加入
    // 满足条件了-点击confrim to join --- 加入
    if(pageType == 2 && buttonId == 1 && indexType == "confirm"){
        // 加入 项目 白名单
       await ProjectService.joinProjectWhiteList(projectId, fid as number)
    }   

    const result = await ProjectService.getProjectInfoImageByUser(projectId, fid as number)
    const imgUrl = result.message
    

    let redirectUrl: string = ""
    if (pageType == 2) {
        if (buttonId == 2) {
            if (indexType == 'follow') {
                // 关注操作
                const userName = result.data.followUsername
                redirectUrl = `https://warpcast.com/${userName}`
            } else if(indexType == 'channel') {
                // 加入频道操作
                redirectUrl = `https://warpcast.com/~/channel/${channelId}`
            }
        } 

        if(buttonId == 3) {
            // 加入频道操作
            redirectUrl = `https://warpcast.com/~/channel/${channelId}`
        }

        if(buttonId == 1 && indexType == "readmore") {
            // 阅读更多操作
            redirectUrl = `${result.data.linkUrl}`
        }

        // 非刷新按钮
        if(!(buttonId == 1 && indexType != "readmore")) {
            const headers = new Headers()
            headers.set('Loaction', redirectUrl)
            const response = NextResponse.redirect(`${redirectUrl}`, {
                headers,
                status: 302
            })
            return response
        }

       
    }

    if(pageType == 1 && Number(result.data.follow_fid) <= -1 &&  !(result.data.channel_id)) {
        await ProjectService.joinProjectWhiteList(projectId, fid as number)
    }


  
    // 需要满足的条件：关注 + 加入频道
    const condtion1 = (Number(result.data.follow_fid) > -1) && (result.data.channel_id)
    // 只需要满足follow条件即可加入
    const condition2 = (Number(result.data.follow_fid) > -1) && !(result.data.channel_id)
    // 只需要满足joined channel即可加入
    const condition3 = !(Number(result.data.follow_fid) > -1) && (result.data.channel_id)

    // 用户本身是否满足的条件
    const isFollowed = result.data.isFollowCondition // true：已关注 false 未关注
    const isJoinedChannel = result.data.isChannelCondition // false：是否已加入频道
    
    // 满足 关注 + 加入频道 && 未关注 && 未加入
    if(condtion1 && !isFollowed && !isJoinedChannel) {
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: 'Refresh',
                        action: 'post'
                    },
                    {
                        label: `follow`, 
                        action: 'post_redirect'
                    },
                    {
                        label: `join_channel`,
                        action: 'post_redirect'
                    },
                ],
                image: `${imgUrl}`,
                post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=follow&channelId=${result.data.channel_id}&projectId=${projectId}`
            })
        )
    } else if(condtion1 && !isFollowed && isJoinedChannel || condition2 && !isFollowed) { // 需满足两个条件且未关注且已加入频道 或者 只需满足关注条件且为关注的状态
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: 'Refresh',
                        action: 'post'
                    },
                    {
                        label: `follow`, 
                        action: 'post_redirect'
                    }
                ],
                image: `${imgUrl}`,
                post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=follow&projectId=${projectId}`
            })
        )
    } else if(condtion1 && isFollowed && !isJoinedChannel || condition3 && !isJoinedChannel) {
        // 需满足两个条件且已关注且未加入频道 或者 只需满足加入频道且为未加入频道
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: 'Refresh',
                        action: 'post'
                    },
                    {
                        label: `join_channel`, 
                        action: 'post_redirect'
                    }
                ],
                image: `${imgUrl}`,
                post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=channel&channelId=${result.data.channel_id}&projectId=${projectId}`
            })
        )
    }

    // 还未加入
    if(result.data.isJoined === 0 && pageType != 1) {
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: 'Confirm to join',
                        action: 'post'
                    }
                ],
                image: `${imgUrl}`,
                post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=confirm&projectId=${projectId}`
            })
        )
    }
    
   

    // 加入成功
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: `read more`,
                    action: 'post_redirect'
                }
            ],
            image: `${imgUrl}`,
            post_url: `${NEXT_PUBLIC_URL}/api/frame?pageType=2&indexType=readmore&projectId=${projectId}`
        })
    )

    

   
}


export const dynamic = "force-dynamic"