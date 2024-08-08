import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { useMemo, useState } from 'react'
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (q: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

function DebounceSelect< ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any, >({
    fetchOptions,
    debounceTimeout = 800,
    ...props
}: DebounceSelectProps<ValueType>) {
    // 是否正在发送请求
    const [fetching, setFetching] = useState(false);
    // options数据
    const [options, setOptions] = useState<ValueType[]>([])

    // 搜索发送请求
    const debounceFetcher = useMemo(() => {
       const loadOptions = async (q: string) => {
            setFetching(true);
            setOptions([]);
            if(!q.trim()) {
                setFetching(false);
                return 
            } 
            try {
                const result = await fetchOptions(q)
                setOptions(result)
                setFetching(false);
            }catch(error) {
                setFetching(false);
                console.log(error)
            }

       }

       return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout])

    return (
        <Select
            showSearch
            labelInValue
            filterOption={false}
            notFoundContent={ fetching ? <Spin size='small' /> : null}
            {...props}
            onSearch={debounceFetcher}
            options={options}
        />
    )
}

export default DebounceSelect;