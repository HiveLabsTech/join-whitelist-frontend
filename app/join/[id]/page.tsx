import { FrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '@/app/config';
import ProjectService from '@/app/service/projectService';


export default async function Page({ params }: { params: { id: number | string } }) {
    let imgUrl: string = ""
    const joinId = params.id
    let channel_id: string = ""
    let follow_fid: number = -1
    let status:number = 0
    try {
        const result = await ProjectService.getProjectInfoImage(joinId)
        imgUrl = result.message
        const res = await ProjectService.getChannelIdandFollowIdByProjectId(joinId)
        channel_id = res.message.channel_id
        follow_fid = res.message.follow_fid
        status = res.message.status

    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <FrameMetadata
                buttons={
                    [
                        {
                            label: `${(!channel_id && follow_fid == -1) ? 'Confirm' : 'Join' }`,
                            action: 'post'
                        },
                    ]
                }
                image={`${NEXT_PUBLIC_URL}/${imgUrl}`}
                post_url={`${NEXT_PUBLIC_URL}/api/frame?pageType=1&channelId=${channel_id}&followFid=${follow_fid}&projectId=${joinId}&status=${status}`}
            ></FrameMetadata>
            <div className='w-[100vw] h-[100vh] flex'>

                <img src={imgUrl} alt="" className='w-[1200px] h-[630px] m-auto' />
            </div>
        </>
    )
}