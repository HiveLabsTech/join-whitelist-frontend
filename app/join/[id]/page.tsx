import { FrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '@/app/config';
import ProjectService from '@/app/service/projectService';


export default async function Page({ params}: {params: { id: number | string }}) {
    let imgUrl: string = ""
    const joinId = params.id
    try {
        const result = await ProjectService.getProjectInfoImage(joinId)
        imgUrl = result.message
    }catch(error) {
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
                image={imgUrl}
                post_url={`${NEXT_PUBLIC_URL}/api/frame?pageType=1&projectId=${joinId}`}
            ></FrameMetadata>
            <div className='w-[100vw] h-[100vh] flex'>
                
                <img src={imgUrl} alt="" className='w-[1200px] h-[630px] m-auto' />
        </div>
        </>
    )   
}