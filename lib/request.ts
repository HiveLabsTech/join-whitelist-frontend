import axios, { type AxiosRequestConfig } from "axios"
import { type z } from "zod"
import { isEmpty } from 'lodash'
import { notificationService } from "@/utils/notification";
import { API_KEY } from "@/config";

let BaseUrl: string | undefined = ""
if(process.env.NODE_ENV === "development") {
    BaseUrl = process.env.NEXT_PUBLIC_DEV_BASEURL ? process.env.NEXT_PUBLIC_DEV_BASEURL : ""
}else {
    BaseUrl = process.env.NEXT_PUBLIC_PRO_BASEURL ? process.env.NEXT_PUBLIC_PRO_BASEURL : ""
}

type HeaderType = {
    "Content-type": string,
    withCredentials: boolean,
    Authorization?: string | null,
    API_KEY: string
}

export default async function request<Request, Response extends {} | null>({
    config,
    requestSchema,
    responseSchema,
    identifier,
    thirdUrl = ""
}: {
    config: AxiosRequestConfig
    requestSchema?: z.ZodType<Request>
    responseSchema: z.ZodType<Response>
    identifier: string,
    thirdUrl?: string
}): Promise<Response> {

    if (requestSchema != null && !isEmpty(config.data)) {
        console.log(config)
        requestSchema.parse(config.data)
    }

    try {
        const headers: HeaderType =  {
            "Content-type": "application/json",
            withCredentials: true, // 允许跨域请求
            "API_KEY": API_KEY
        } 

          // 如果 thirdUrl 不存在，则添加 Authorization 头
        if (!thirdUrl) {
            headers.Authorization = localStorage.getItem("WHITELIST_TOKEN") ?  localStorage.getItem("WHITELIST_TOKEN") : null
        } 
        
        const data = await axios.request({
            headers: headers,
            baseURL:thirdUrl ? thirdUrl : BaseUrl,
            timeout: 30000,
            ...config,
        }).then((res) => res.data)
        // 校验后端返回的数据格式类型是否和前端一致
        const parseResult = responseSchema.safeParse(data)

        if (parseResult.success === true) {
            return parseResult.data
        } else {
            const exception = new Error(
                `Schema mismatch error in ${identifier}, this may result in runtime errors. Please verify that the types match what the backend is returning.`
            )

            // console.error(exception)
            if (process.env.NODE_ENV === "development") {
                console.error(parseResult.error)
            }
        }

        return data as Response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.code === "ECONNABORTED") {
                notificationService.error("bottomLeft", "Request timed out")
            }else {
                notificationService.error("bottomLeft", err.message)
            }
            
            throw err
        }
        throw err
    }
}