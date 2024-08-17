import axios from 'axios'
const baseUrl = process.env.NODE_ENV === "development" ? process.env.DEV_IP : process.env.PRO_IP

type commonType<T> = {
    code: number,
    message: T,
}

type ResponseType = {
    data: {
        follow_fid: number | string,
        followUsername: string,
        channel_id: number | string,
        channelName: string
        isChannelCondition: boolean,
        isFollowCondition: boolean
        linkUrl: string,
        isJoined: number,
        isExpired: boolean
    }
} & commonType<string>

class ProjectService { 
    static async getProjectInfoImage(projectId: number | string): Promise<commonType<string>> {
        const result = await axios.get(`${baseUrl}/api/public/projectInfoImg/${projectId}`)
        return result.data as commonType<string>
    }

    static async getProjectInfoImageByUser(projectId: number | string, fid: number): Promise<ResponseType> {
        const result = await axios.get(`${baseUrl}/api/public/getProjectInfoImageByUser/${projectId}/${fid}`)
        return result.data as ResponseType
    }

    static async getChannelIdandFollowIdByProjectId(projectId: number | string): Promise<commonType<{
        channel_id: string,
        follow_fid: number,
        status: number
    }>> {
        const result = await axios.get(`${baseUrl}/api/public/getChannelIdandFollowIdByProjectId/${projectId}`)
        return result.data as commonType<{
            channel_id: string,
            follow_fid: number,
            status: number
        }>
    }

    static async joinProjectWhiteList(projectId: number | string, fid: number): Promise<commonType<string>> {
        const result = await axios.post(`${baseUrl}/api/public/joinWhiteList`,{
            "project_id": projectId,
            fid,
        })
        return result.data as commonType<string>
    }
}


export default ProjectService