import { FrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '@/app/config';

export default async function Page({ params}: {params: { id: number | string }}) {
    const joinId = params.id
    try {
        
    }catch(error) {
        console.log(error)
    }

    return (
        <>
            <FrameMetadata
                buttons={
                    [
                        {
                          label: `Join${joinId}`,
                          action: 'post'
                        },
                      ]
                }
                image={`${NEXT_PUBLIC_URL}/park-1.png`}
                post_url={`${NEXT_PUBLIC_URL}/api/frame`}
            ></FrameMetadata>
        </>
    )   
}