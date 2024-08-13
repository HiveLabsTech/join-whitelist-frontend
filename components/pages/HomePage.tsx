import React, { useEffect, useState, useMemo, ChangeEvent } from "react"

import classNames from "classnames"
import { Form, Input, DatePicker, Empty } from 'antd';

import Layout from "../Layout/Layout"
import DrawerBox from "../Drawer/Drawer"
import PageContentHeader from "../PageContentHeader/PageContentHeader"
import WhitelistCard from "../Card/WhitelistCard"
import WhitelistService from "@/services/whitelistService";
import { type WhiteItemDataType } from "@/lib/schemas/whitelist";
import { validateUrl } from '@/utils/validator';
import { tokenAtom, userInfoAtom, type userInfoType } from '@/hooks/useUser'
import { useAtomValue } from 'jotai'
import { type createJoinWhitelistDataType } from '@/types/whitelist'
import { notificationService } from "@/utils/notification";
import { LoadingOutlined } from '@ant-design/icons';
import DynamicSkeleton from '@/components/DynamicSkeleton/DynamicSkeleton'
import ChannelService from "@/services/channelService";
import { ChannelListType } from '@/lib/schemas/channel'
import { UserListType } from "@/lib/schemas/user";
import DebounceSelect from "../DebounceSelect/DebounceSelect";
import UserService from "@/services/userService";
import UploadImage from "../Upload/UploadImage";
import ProjectService from "@/app/service/projectService";




type FieldType = {
    projectName?: string;
    linkurl?: string;
    endTime?: string;
    follow?: string;
    channel?: string;
    image_file?: string;
};

interface SelectValueIft {
    label: string;
    value: string;
}

export default function HomePage() {
    // token
    const token = useAtomValue(tokenAtom)
    // userInfo
    const userInfo = useAtomValue(userInfoAtom)
    // Control whether to display filterBox
    const [isShow, setIsShow] = useState(false)
    // Hidden filterBox
    const handleHiddenFilterBox = () => setIsShow(false)
    // Control whether to display the drawer 
    const [open, setOpen] = useState<boolean>(false)
    // whitelist
    const [whitelist, setWhitelist] = useState<WhiteItemDataType[] | []>([])
    // joinForm
    const [joinForm] = Form.useForm()
    // is creating
    const [isCreating, setIsCreating] = useState<boolean>(false)
    // is loading
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [searchName, setSearchName] = useState<string>("")
    // 排序：0:降序 1:升序
    const [sort, setSort] = useState<number>(0)
    // 频道列表
    const [channelObj, setChannelObj] = useState<SelectValueIft | null>(null)
    // 用户列表
    const [userObj, setUserObj] = useState<SelectValueIft | null>(null)
    // 项目Logo地址
    const [projectLogoUrl, setProjectLogoUrl] = useState<string>("")

    // Display the drawer 
    const showDrawer = () => {
        setOpen(true)
    }

    // Close Drawer
    const closeDrawer = () => {
        if (isCreating) {
            return false
        }
        // 清空表单中所有的值
        joinForm.resetFields()
        setOpen(false)
    }

    const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setSearchName(evt.target.value)
    }

    const whitelist_memo = useMemo(() => {
        const newList = whitelist.filter(item => item.project_name.toLowerCase().includes(searchName.trim().toLowerCase()))
        // 升序
        if (sort === 1) {

            // 未登录 直接翻转数组
            if (!token) {
                return newList.reverse()
            }

            // 已登录
            // 登录用户自身创建的数据列表
            const ownList = newList.filter(item => userInfo?.fid === item.creator_fid).sort((a, b) => a.create_time - b.create_time)

            // 非用户自己创建的数据列表
            const otherList = newList.filter(item => userInfo?.fid !== item.creator_fid).sort((a, b) => a.create_time - b.create_time)

            return [...ownList, ...otherList]
        }

        return newList
    }, [searchName, whitelist, sort, token, userInfo])

    // validate successful!
    const onFinish = async (values: any) => {
        const project_name = values ? values.projectName : ''
        const end_time = values && values.endTime ? +new Date(values.endTime.$d) : +new Date(0)
        const link = values ? values.linkurl : ''
        let follow_fid: number = -1
        let follow_user_name:string = ""
        let follow_display_name: string = ""
        let channel_id: string = ""
        let channel_name: string = ""

        if(userObj) {
            follow_fid = Number(userObj.value.split("_")[0])
            follow_user_name = userObj.value.split("_")[2]
            follow_display_name = userObj.label
        }

        if(channelObj) {
            channel_id = channelObj.value
            channel_name = channelObj.label
        }

        // submit data
        const data: createJoinWhitelistDataType = {
            project_name: project_name,
            end_time: end_time,
            link: link,
            img_url: projectLogoUrl,
            creator_fid: userInfo?.fid,
            creator_display_name: userInfo?.displayName,
            creator_user_name: userInfo?.username,
            follow_fid,
            follow_user_name,
            follow_display_name,
            channel_id,
            channel_name,
            address: userInfo?.custody
        }

        // send request create join whitelist
        try {
            setIsCreating(true)
            const res = await WhitelistService.createJoinWhitelist(data)
            // 创建成功
            if (res.code === 200) {
                // 创建成功需要的提示...
                notificationService.success("bottomLeft", "Created successful!")
                setIsCreating(false)
                // 关闭Drawer
                closeDrawer()
                // 更新列表数据
                getAllWhitelist()

            } else { // 创建失败
                setIsCreating(false)
                // 创建失败的提示
                notificationService.error("bottomLeft", String(res.message))
            }

        } catch (error) {
            setIsCreating(false)
        }

    }

    //  submit join from
    const handleSubmit = async () => {
        try {
            await joinForm.validateFields()
            // 如果验证通过，获取表单值并提交
            const values = joinForm.getFieldsValue();
            onFinish(values);
        } catch (error) {
            console.log('Validation Failed:', error);
            // 错误提示消息box
        }
    }

    // 
    const onFinishFailed = () => { }

    // get whitelist
    async function getAllWhitelist() {
        setIsLoading(true)
        try {
            setWhitelist([])
            const result = await WhitelistService.getAllWhitelist()
            if (result.code === 200) {
                setWhitelist(result.message)
            } else {
                notificationService.error("bottomLeft", String(result.message))
            }
        } catch (error) { }
        setIsLoading(false)
    }

    // 根据频道名字获取频道列表
    async function getChannelListByName(q: string): Promise<SelectValueIft[]> {
        try {
            const res = await ChannelService.getChannelsByName({ q })
            const channels = HandleChannelOrFollowData(res.channels, null)
            return channels
        } catch (error) {
            console.log(error)
            return []
        }
    }

    // 根据用户名获取用户列表
    async function getUserListByName(q: string): Promise<SelectValueIft[]> {
        // let allUsers: UserListType = [];
        // let hasMore = true;
        // let cursor = '';
        // let newUserlist: SelectValueIft[] = []
        try {
            const res = await UserService.getUsersByName({ q })
            const users = HandleChannelOrFollowData(null, res.result.users)
            return users
            // 后面需要优化 目前接口只支持返回10条数据 后面的话可以滚动到底部触发下一页数据
           // while (hasMore) {
            //     const res = await UserService.getUsersByName({ q, cursor })
            //     allUsers = allUsers.concat(res.result.users)
            //     cursor = res.result.next.cursor
            //     if(!res.result.next || !res.result.next.cursor) {
            //         hasMore=false
            //     }
            // }
            
        } catch (error) {
            console.log(error)
            return []
        }
    }


    useEffect(() => {
        document.addEventListener('click', handleHiddenFilterBox);

        return () => {
            document.removeEventListener('click', handleHiddenFilterBox);
        }
    }, [])

    useEffect(() => {
        getAllWhitelist()
    }, [token])

    return (
        <Layout header={<PageContentHeader />}>
            {/* Create join whitelist  */}
            <div className={classNames("flex justify-between my-[35px]")}>
                <span className="text-[#0F111A] text-[24px] font-medium">Join Whitelist Trending</span>
                <button className={classNames("w-[215px] h-[31px] rounded-[10px] font-medium text-[14px] text-[#fff]", token ? "bg-[#7C65C1] active:bg-purple-800 transition duration-500 ease-out" : "bg-[#C6C6C6] pointer-events-none")} onClick={() => showDrawer()}>Create Join Whitelist</button>
            </div>

            {/* Search whitelist */}
            <div className="flex justify-between mb-[50px]">
                <input type="text" className={classNames("w-[950px] h-[40px] rounded-[10px] border-[1px] border-[#DFDFDF] outline-none search-input")} placeholder="Search..." value={searchName} onChange={(evt) => handleSearchChange(evt)} />
                
                <button className="w-[190px] h-[40px] box-border px-[15px] bg-[#F4F5F9] rounded-[10px] relative text-[#636779]" onClick={(evt) => {
                    evt.stopPropagation()
                    setIsShow(!isShow)
                }}>
                    <span className="mr-[10px]">{sort === 1 ? "Time Ascending" : "Time Descending"}</span>
                    <i className="inverted_triangle"></i>

                    {/* time filter */}
                    <FilterBox onSort={(type: number) => {
                        setSort(type)
                    }} className={isShow ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} />
                </button>
            </div>

            {/* Whitelist */}
            <div className="flex justify-between font-bold text-[20px]">
                <span>{whitelist_memo.length} Whitelist Items</span>
                <span>Operation</span>
            </div>
            <div className="py-[30px]">
                {isLoading ? <DynamicSkeleton /> :
                    whitelist_memo.length > 0 ? <WhiteList whitelist={whitelist_memo} /> : <Empty />}
            </div>


            {/* Create Join Whitelist Drawer */}
            <DrawerBox
                width={455}
                title="Create Join Whitelist"
                placement='right'
                onClose={() => closeDrawer()}
                open={open}
                className="relative"
            >
                <Form
                    form={joinForm}
                    name="whitelist"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    style={{ maxWidth: 455 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item<FieldType>
                        label="Project Name:"
                        name="projectName"
                        className="mb-[24px]"
                        rules={[{ required: true, message: 'Please input project name!' }]}
                    >
                        <Input placeholder="Please input project name..." maxLength={50} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="End Time:"
                        name="endTime"
                        className="mb-[20px]"
                        rules={[{ type: 'object' as const, required: true, message: 'Please select end time!' }]}
                    >
                        <DatePicker placeholder="Please select end time..." showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Link url after user join:"
                        name="linkurl"
                        rules={[{ validator: validateUrl, required: true }]}
                        className="from-item-linkurl mb-[24px]"
                    >
                        <Input placeholder="Please input link url after user join..." />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="image_file"
                        label="Logo"
                        rules={[ 
                            { required: true,  validator: ()=>{
                                if(projectLogoUrl) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Please upload your logo'));
                            } },
                        ]}
                        className="ml-[-72px]" 
                    >
                        <UploadImage onChange={(imgUrl: string) => {
                            setProjectLogoUrl(imgUrl)
                        }} />
                    </Form.Item>

                    <div className="ml-[20px] mb-[24px] text-[14px] text-[#000000]">Join whitelist requirements:</div>
                    <Form.Item<FieldType>
                        label="Follow:"
                        name="follow"
                        className="mb-[24px] from-item-follow"
                    >
                        <DebounceSelect
                            value={userObj}
                            placeholder="Search to select Follow"
                            fetchOptions={getUserListByName}
                            onChange={(newValue) => {
                                setUserObj(newValue as SelectValueIft)
                            }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Channel:"
                        name="channel"
                        className="mb-[24px] from-item-channel"
                    >
                        <DebounceSelect
                            value={channelObj}
                            placeholder="Search to select Channel"
                            fetchOptions={getChannelListByName}
                            onChange={(newValue) => {
                                setChannelObj(newValue as SelectValueIft)
                            }}
                            style={{ width: '100%' }}
                        />

                    </Form.Item>

                    
                </Form>
                <div className="w-[455px] h-[40px] flex justify-center absolute bottom-[17px] left-0">
                    <button className={classNames("w-[100px] h-[40px]border-0 bg-[#D9D9D9] text-[#fff] text-[16px] mr-[25px] rounded-[8px] active:bg-[#bbbbbb] transition duration-500 ease-out", isCreating ? "pointer-events-none" : "")} onClick={() => closeDrawer()}>Cancel</button>
                    <button className={classNames("w-[100px] h-[40px]border-0 bg-[#7C65C1] rounded-[8px] text-[#fff] text-[16px] active:bg-purple-800 transition duration-500 ease-out", isCreating ? "pointer-events-none" : "")} onClick={() => handleSubmit()}>
                        {isCreating && <LoadingOutlined className="mr-[4px]" />}
                        {isCreating ? "Creating..." : "Submit"}
                    </button>
                </div>
            </DrawerBox>
        </Layout>
    )
}

/* 
    handle channel data
*/
function HandleChannelOrFollowData(channellist: ChannelListType | null, userlist: UserListType | null): SelectValueIft[] {
    const newList: {
        value: string,
        label: string
    }[] = []

    if (channellist) { // handle channel data 
        channellist.forEach(item => {
            newList.push({
                label: item.name,
                value: item.id
            })
        })
    }

    if (userlist) {
        userlist.forEach(item => {
            newList.push({
                label: item.display_name,
                value: item.fid + "_joinwhitelist_" + item.username
            })
        })
    }

    return newList
}

/* 
    Pop-ups in ascending or descending order by time
*/
function FilterBox({
    className = '',
    onSort
}: {
    className?: string,
    onSort: (type: number) => void
}) {
    const filter_list = ["Time Descending", "Time Ascending"]
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleOrderByTime = (index: number) => {
        setCurrentIndex(index)
        onSort(index)
    }

    return (
        <div className={classNames("w-[190px] overflow-hidden box-border absolute left-[0] top-[45px] rounded-[10px] border-[1px] border-[#DFDFDF] bg-[#FFF] shadow transition-opacity duration-300", className)}>
            <div className="text-[14px] text-[#020817] px-[14px] py-[9px] font-medium border-b-[1px] border-[#BCBFCD] text-left">
                Sort By
            </div>
            <ul>
                {filter_list.map((item, index) => (
                    <li key={index} className="w-full h-[40px] flex justify-center items-center text-left hover:bg-[#f3f3f7]" onClick={() => handleOrderByTime(index)}>
                        {index === currentIndex ? <i className="check_mark"></i> : <i className="w-[16px] h-[16px] inline-block"></i>}
                        <span className="ml-[9px]">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/* 
    Whitelist Component
*/
function WhiteList({
    whitelist
}: {
    whitelist: WhiteItemDataType[]
}) {

    // WhitelistService
    return (
        <div>
            {/* 后续数据没加载完成的时候，可以添加animate-pulse类名 有一个加载效果 */}
            {whitelist.map(item => <WhitelistCard {...item} className="mt-[30px] " key={item.id} />)}
        </div>
    )
}

