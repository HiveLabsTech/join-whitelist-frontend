import { FrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '@/app/config';
import ProjectService from '@/app/service/projectService';


export default async function Page({ params }: { params: { id: number | string } }) {
    let imgUrl: string = ""
    const joinId = params.id
    let channel_id: string = ""
    let follow_fid: number = -1
    try {
        const result = await ProjectService.getProjectInfoImage(joinId)
        imgUrl = result.message
        channel_id = result.data.channel_id as string
        follow_fid = result.data.follow_fid as number

    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <FrameMetadata
                buttons={
                    [
                        {
                            label: `Join`,
                            action: 'post'
                        },
                    ]
                }
                image={`${NEXT_PUBLIC_URL}/${imgUrl}`}
                post_url={`${NEXT_PUBLIC_URL}/api/frame?pageType=1&channelId=${channel_id}&followFid=${follow_fid}&projectId=${joinId}`}
            ></FrameMetadata>
            <div className='w-[100vw] h-[100vh] flex'>

                <img src={imgUrl} alt="" className='w-[1200px] h-[630px] m-auto' />
            </div>
        </>
    )
}