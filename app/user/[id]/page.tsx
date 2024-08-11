// import { FrameMetadata } from '@coinbase/onchainkit';
// import { NEXT_PUBLIC_URL } from '@/app/config';
// import ProjectService from '@/app/service/projectService';


// export default async function Page({ params}: {params: { id: number | string }}) {
//     let imgUrl: string = ""
//     const targetId = String(params.id)
//     const fid = Number(targetId.split("_")[0])
//     const projectId = targetId.split("_")[1]
//     try {
//         const result = await ProjectService.getProjectInfoImage(projectId, fid)
//         imgUrl = result.message
//         console.log("imgUrl", imgUrl)
//     }catch(error) {
//         console.log(error)
//     }

//     return (
//         <>
//             <FrameMetadata
//                 buttons={
//                     [
//                         {
//                           label: `Join${joinId}`,
//                           action: 'post'
//                         },
//                       ]
//                 }
//                 image={imgUrl}
//                 post_url={`${NEXT_PUBLIC_URL}/api/frame?pageType=1`}
//             ></FrameMetadata>
//             <div className='w-[100vw] h-[100vh] flex'>
                
//                 <img src={imgUrl} alt="" className='w-[1200px] h-[630px] m-auto' />
//         </div>
//         </>
//     )   
// }