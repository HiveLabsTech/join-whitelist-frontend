import axios from 'axios'
const baseUrl = process.env.NODE_ENV === "development" ? process.env.DEV_IP : process.env.PRO_IP

type commonType = {
    code: number,
    message: string,
}

type ResponseType = {
    
    data?: {
        follow_fid: number | string,
        followUsername: string,
        channel_id: number | string,
        channelName: string
        isChannelCondition: boolean,
        isFollowCondition: boolean
        linkUrl: string,
        isJoined: number
    }
} & commonType

class ProjectService { 
    static async getProjectInfoImage(projectId: number | string, fid?: number): Promise<ResponseType> {
        const result = await axios.get(`${baseUrl}/api/public/projectInfoImg/${projectId}${fid ? '/' + fid : ''}`)
        return result.data as ResponseType
    }

    static async joinProjectWhiteList(projectId: number | string, fid: number): Promise<commonType> {
        const result = await axios.post(`${baseUrl}/api/public/joinWhiteList`,{
            projectId,
            fid
        })
        return result.data as commonType
    }
}


export default ProjectService