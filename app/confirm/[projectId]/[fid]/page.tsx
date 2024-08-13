import { FrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '@/app/config';
import ProjectService from '@/app/service/projectService';



export default async function Page({ params }: { params: { projectId: number | string, fid: number | string } }) {
    let imgUrl: string = ""
    const projectId = params.projectId
    const fid = params.fid
    try {
        const joinResult = await ProjectService.joinProjectWhiteList(projectId, Number(fid))
        console.log("joinResult", joinResult.message)
        const result = await ProjectService.getProjectInfoImage(projectId)
        imgUrl = result.message
    } catch (error) {
        console.log(error)
    }


    return (
        <>
            <FrameMetadata
                buttons={[
                    {
                        label: `read more`,
                        action: 'post_redirect'
                    }
                ]}
                image={imgUrl}
                post_url={`${NEXT_PUBLIC_URL}/api/frame`}
            ></FrameMetadata>
            <div className='w-[100vw] h-[100vh] flex'>
                <img src={imgUrl} alt="" className='w-[1200px] h-[630px] m-auto' />
            </div>
        </>
    );
}








