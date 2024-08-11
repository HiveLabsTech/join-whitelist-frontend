import axios from 'axios'
const baseUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_IP : process.env.NEXT_PUBLIC_PRO_IP

type ResponseType = {
    code: number,
    message: string,
    data?: {
        isFollowCondition: boolean,
        isChannelCondition: boolean
    }
}

class ProjectService { 
    static async getProjectInfoImage(projectId: number | string, fid?: number): Promise<ResponseType> {
        const result = await axios.get(`${baseUrl}/api/public/projectInfoImg/${projectId}${fid ? '/' + fid : ''}`)
        return result.data as ResponseType
    }
}


export default ProjectService