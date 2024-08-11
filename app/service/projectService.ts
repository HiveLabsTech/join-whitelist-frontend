import axios from 'axios'
const baseUrl = process.env.NODE_ENV === "development" ? process.env.DEV_IP : process.env.PRO_IP

type ResponseType = {
    code: number,
    message: string,
    data?: {
        // follow_id: number | string,
        // channel_id: number | string
        isChannelCondition: boolean,
        isFollowCondition: boolean
    }
}

class ProjectService { 
    static async getProjectInfoImage(projectId: number | string, fid?: number): Promise<ResponseType> {
        const result = await axios.get(`${baseUrl}/api/public/projectInfoImg/${projectId}${fid ? '/' + fid : ''}`)
        return result.data as ResponseType
    }
}


export default ProjectService