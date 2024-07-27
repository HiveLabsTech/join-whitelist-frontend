import { useEffect, useState } from "react"

import classNames from "classnames"
import type { FormProps, SelectProps } from 'antd';
import { Form, Input, DatePicker, Select, Button } from 'antd';

import Layout from "../Layout/Layout"
import DrawerBox from "../Drawer/Drawer"
import PageContentHeader from "../PageContentHeader/PageContentHeader"
import WhitelistCard from "../Card/WhitelistCard"

const isLogin = true

type FieldType = {
    projectName?: string;
    linkurl?: string;
    endTime?: string;
    follow?: string;
    channel?: string;
};

export default function HomePage() {
    // Control whether to display filterBox
    const [isShow, setIsShow] = useState(false)
    // Hidden filterBox
    const handleHiddenFilterBox = () => setIsShow(false)
    // Control whether to display the drawer 
    const [open, setOpen] = useState<boolean>(false)

    // Display the drawer 
    const showDrawer = () => {
        setOpen(true)
    }

    // Close Drawer
    const closeDrawer = () => {
        setOpen(false)
    }

    // 
    const onFinish = () => { }

    // 
    const onFinishFailed = () => { }


    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    // Select follow options change
    const handleFollowChange = (value: string) => {
        console.log(value)
    }

    // Search follow options
    const onFollowSearch = (value: string) => {
        console.log(value)
    }

    // Select channel options change
    const handleChannelChange = (value: string) => {
        console.log(value)
    }

    // Search channel options
    const onChannelSearch = (value: string) => {
        console.log(value)
    }

    useEffect(() => {
        document.addEventListener('click', handleHiddenFilterBox);

        return () => {
            document.removeEventListener('click', handleHiddenFilterBox);
        }
    }, [])

    return (
        <Layout header={<PageContentHeader />}>
            {/* Create join whitelist  */}
            <div className={classNames("flex justify-between my-[35px]")}>
                <span className="text-[#0F111A] text-[24px] font-medium">Join Whitelist Trending</span>
                <button className={classNames("w-[215px] h-[31px] rounded-[10px] font-medium text-[14px] text-[#fff]", isLogin ? "bg-[#7C65C1] active:bg-purple-800 transition duration-500 ease-out" : "bg-[#C6C6C6] pointer-events-none")} onClick={() => showDrawer()}>Create Join Whitelist</button>
            </div>

            {/* Search whitelist */}
            <div className="flex justify-between mb-[50px]">
                <input type="text" className={classNames("w-[950px] h-[40px] rounded-[10px] border-[1px] border-[#DFDFDF] outline-none search-input")} placeholder="Search..." />

                <button className="w-[190px] h-[40px] box-border px-[15px] bg-[#F4F5F9] rounded-[10px] relative text-[#636779]" onClick={(evt) => {
                    evt.stopPropagation()
                    setIsShow(!isShow)
                }}>
                    <span className="mr-[10px]">Time Descending</span>
                    <i className="inverted_triangle"></i>

                    {/* time filter */}
                    <FilterBox className={isShow ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} />
                </button>
            </div>

            {/* Whitelist */}
            <WhiteList />

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
                        <Input placeholder="Please input project name..." />
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
                        rules={[{ required: true, message: 'Please input link url after user join!' }]}
                        className="from-item-linkurl mb-[24px]"
                    >
                        <Input placeholder="Please input link url after user join..." />
                    </Form.Item>

                    <div className="ml-[20px] mb-[24px] text-[14px] text-[#000000]">Join whitelist requirements:</div>
                    <Form.Item<FieldType>
                        label="Follow:"
                        name="follow"
                        className="mb-[24px] from-item-follow"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Search to select Follow"
                            onChange={handleFollowChange}
                            onSearch={onFollowSearch}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Channel:"
                        name="channel"
                        className="mb-[24px] from-item-channel"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Search to select Channel"
                            onChange={handleChannelChange}
                            onSearch={onChannelSearch}
                            options={options}
                        />
                    </Form.Item>
                </Form>
                <div className="w-[455px] h-[40px] flex justify-center absolute bottom-[17px] left-0">
                    <button className="w-[100px] h-[40px]border-0 bg-[#D9D9D9] text-[#fff] text-[16px] mr-[25px] rounded-[8px] active:bg-[#bbbbbb] transition duration-500 ease-out" onClick={() => closeDrawer()}>Cancel</button>
                    <button className="w-[100px] h-[40px]border-0 bg-[#7C65C1] rounded-[8px] text-[#fff] text-[16px] active:bg-purple-800 transition duration-500 ease-out" >Submit</button>
                </div>
            </DrawerBox>
        </Layout>
    )
}

/* 
    Pop-ups in ascending or descending order by time
*/
function FilterBox({
    className = ''
}: {
    className?: string
}) {
    const filter_list = ["Time Descending", "Time Ascending"]
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleOrderByTime = (index: number) => {
        setCurrentIndex(index)
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
function WhiteList() {
    const [whitelist, setWhitelist] = useState([
        {
            projectId: 1,
            projectName: 'Project Name1',
            creator: 'zeck',
            isPerson: false,
            state: "end", // end 已截止 active 进行中
            link: "", // 下载链接
        },
        {
            projectId: 2,
            projectName: 'Project Name2',
            creator: 'zeck',
            isPerson: false,
            state: "active", // end 已截止 active 进行中
            link: "", // 下载链接 
        },
        {
            projectId: 3,
            projectName: 'Project Name3',
            creator: 'Boostbot',
            isPerson: true,
            state: "end", // end 已截止 active 进行中
            link: "", // 下载链接 
        },
        {
            projectId: 4,
            projectName: 'Project Name4',
            creator: 'Boostbot',
            isPerson: true,
            state: "end", // end 已截止 active 进行中
            link: "", // 下载链接 
        }
    ])

    return (
        <div>
            <div className="flex justify-between font-bold text-[20px]">
                <span>4 Whitelist Items</span>
                <span>Operation</span>
            </div>
            {/* 后续数据没加载完成的时候，可以添加animate-pulse类名 有一个加载效果 */}
            {whitelist.map(item => <WhitelistCard {...item} className="mt-[30px] " key={item.projectId} />)}
        </div>
    )
}

